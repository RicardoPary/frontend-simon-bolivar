import {Component, OnInit} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {EstudianteFilter} from '../../shared/models/estudiante';
import {PersonaService} from '../../shared/services/persona.service';
import {EstudianteService} from '../../shared/services/estudiante.service';
import {DocenteService} from '../../shared/services/docente.service.';
import {DocenteFilter} from '../../shared/models/docente';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.component.html',
  styleUrls: ['./docente.component.scss']
})
export class DocenteComponent implements OnInit {

  estudiantes: any = [];
  filtersColumns: any;
  totalEstudiantes: number;
  pageSize: number;
  page: number;


  modal: NgbModalRef;

  headersColumns: any = [
    {
      name: 'ci',
      displayName: 'CI',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'nombre',
      displayName: 'Nombre',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'paterno',
      displayName: 'Paterno',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'materno',
      displayName: 'Materno',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'genero',
      displayName: 'Genero',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'fechaNacimiento',
      displayName: 'Fecha de Nacimiento',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'nacionalidad',
      displayName: 'Nacionalidad',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'direccion',
      displayName: 'Direccion',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: '',
      displayName: 'Acciones',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'actions'
    }
  ];

  constructor(private modalService: NgbModal,
              private docenteService: DocenteService,
              private personaService: PersonaService) {

    this.docenteService.currentDocenteFilter().subscribe(
      dates => {
        this.pageSize = dates.size;
        this.page = dates.page;
        this.callService(dates);
      }
    );

  }

  ngOnInit() {
  }

  callService(docenteFilter: DocenteFilter) {
    this.docenteService.getAllDocentes(docenteFilter).subscribe(res => {
      console.log(res.body);
      this.totalEstudiantes = parseFloat(res.headers.get('X-Total-Count'));
      this.estudiantes = res.body;
    });
  }

  openModal(content) {
    this.modal = this.modalService.open(content, {backdrop: 'static', size: 'lg'});
  }

  submitEstudiante(form) {
    console.log(form);

    this.personaService.createPersona({
      'ci': form.value.ci,
      'nombre': form.value.nombre,
      'paterno': form.value.paterno,
      'materno': form.value.materno,
      'genero': form.value.genero,
      'fechaNacimiento': form.value.fechaNacimiento,
      'nacionalidad': form.value.nacionalidad,
      'direccion': form.value.direccion,
      'telefono': parseFloat(form.value.telefono)
    }).subscribe(
      res => {
        console.log(res);

        this.docenteService.createDocente({
          'grado': 'asdasdasd',
          'idTrabajador': 0,
          'idPersona': res.body.id
        }).subscribe(
          res2 => {
            this.modal.close();
            console.log(res2);
          }
        );


      }
    );


  }

  closeModal() {
    this.modal.close();
  }

}
