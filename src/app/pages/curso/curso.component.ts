import {Component, OnInit} from '@angular/core';
import {ActividadCivicaService} from '../../shared/services/actividad-civica.service';
import {DocenteFilter} from '../../shared/models/docente';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {CursoService} from '../../shared/services/curso.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.scss']
})
export class CursoComponent implements OnInit {

  estudiantes: any = [];
  filtersColumns: any;
  totalEstudiantes: number;
  pageSize: number;
  page: number;


  modal: NgbModalRef;

  headersColumns: any = [
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
      name: 'tipo',
      displayName: 'Tipo',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'descripcion',
      displayName: 'Descripcion',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: '',
      displayName: 'Acciones',
      canSort: false,
      canFilter: false,
      pattern: '',
      messageError: '',
      type: 'actionsView'
    }
  ];

  constructor(private modalService: NgbModal,
              private actividadCivicaService: ActividadCivicaService,
              private cursoService: CursoService,
              private router: Router) {

    this.actividadCivicaService.currentDocenteFilter().subscribe(
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
    this.cursoService.getAllCursos().subscribe(res => {
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

    this.actividadCivicaService.postAct5ividadCivica({
      'cronograma': form.value.cronograma,
      'descripcion': form.value.descripcion,
      'fecha': form.value.fecha,
      'nombre': form.value.nombre
    }).subscribe(
      res => {
        console.log(res);
        this.actividadCivicaService.sendDocenteFilter(new DocenteFilter());
        this.actividadCivicaService.sendDocenteFilter(new DocenteFilter());
        this.modal.close();

      }
    );


  }

  closeModal() {
    this.modal.close();
  }

  clickButtonRow(event) {
    console.log(event);

    if (event.description === 'view') {
      console.log('vvv');
      this.router.navigate(['/bimestre', event.item.id, 2]);
    }

  }

}
