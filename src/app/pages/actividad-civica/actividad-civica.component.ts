import {Component, OnInit} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {PersonaService} from '../../shared/services/persona.service';
import {DocenteService} from '../../shared/services/docente.service.';
import {DocenteFilter} from '../../shared/models/docente';
import {ActividadCivicaService} from '../../shared/services/actividad-civica.service';

@Component({
  selector: 'app-actividad-civica',
  templateUrl: './actividad-civica.component.html',
  styleUrls: ['./actividad-civica.component.scss']
})
export class ActividadCivicaComponent implements OnInit {

  estudiantes: any = [];
  filtersColumns: any;
  totalEstudiantes: number;
  pageSize: number;
  page: number;


  modal: NgbModalRef;

  headersColumns: any = [
    {
      name: 'cronograma',
      displayName: 'Cronograma',
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
      name: 'fecha',
      displayName: 'Fecha',
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
    }
  ];

  constructor(private modalService: NgbModal,
              private actividadCivicaService: ActividadCivicaService) {

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
    this.actividadCivicaService.getAllDocentes(docenteFilter).subscribe(res => {
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
        this.modal.close();

      }
    );


  }

  closeModal() {
    this.modal.close();
  }

}
