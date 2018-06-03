import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import {ActividadCivicaService} from '../shared/services/actividad-civica.service';
import {ReunionService} from '../shared/services/reunion.service';
import {LoginService} from '../shared/auth';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LoginModalComponent} from './login-modal/login-modal.component';
import {DocenteFilter} from '../shared/models/docente';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

  public sliders: Array<any> = [];

  viewLogin = false;

  password: string;
  username: string;


  reuniones: any = [];
  actividadesCivicas: any = [];

  constructor(public router: Router,
              private actividadCivicaService: ActividadCivicaService,
              private reunionService: ReunionService,
              private loginService: LoginService,
              private modalService: NgbModal) {
    this.sliders.push(
      {
        imagePath: 'assets/images/colegio1.jpg',
        label: 'Acto Civico Dia Del Maestro',
        text:
          'Palabras del Docente de Lenguaje.'
      },
      {
        imagePath: 'assets/images/colegio2.jpg',
        label: 'Colegio Simon Bolivar A',
        text: 'Nueva Construccion'
      },
      {
        imagePath: 'assets/images/colegio3.jpg',
        label: 'Baile por Alumnos del nivel basico',
        text:
          'Dia de la madre'
      }
    );
  }

  ngOnInit() {

    this.actividadCivicaService.getAllDocentes(new DocenteFilter()).subscribe(
      res => {
        console.log(res);
        this.actividadesCivicas = res.body;
      }
    );

    this.reunionService.getAllDocentes(new DocenteFilter()).subscribe(
      res => {
        console.log(res);
        this.reuniones = res.body;
      }
    );

  }

  onLoggedin() {
    localStorage.setItem('isLoggedin', 'true');
  }


  login (form) {
    console.log(form);
    this.loginService.login ({
      username: form.value.username,
      password: form.value.password,
      rememberMe: false
    }).then (() => {
      this.router.navigate (['/dashboard']);
    }).catch ((e) => console.log(e));
  }

  openModal() {
    this.modalService.open(LoginModalComponent, );
  }

}
