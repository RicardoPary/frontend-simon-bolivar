import {Component, OnInit} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {DocenteFilter} from '../../shared/models/docente';
import {ReunionService} from '../../shared/services/reunion.service';
import {ReunionFilter} from '../../shared/models/reunion';

@Component({
  selector: 'app-reunion',
  templateUrl: './reunion.component.html',
  styleUrls: ['./reunion.component.scss']
})
export class ReunionComponent implements OnInit {

  estudiantes: any = [];
  filtersColumns: any;
  totalEstudiantes: number;
  pageSize: number;
  page: number;


  modal: NgbModalRef;

  headersColumns: any = [
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
      name: 'detalle',
      displayName: 'Detalle',
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
      name: 'hora',
      displayName: 'Hora',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'lugar',
      displayName: 'Lugar',
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
      name: 'ordenDia',
      displayName: 'Orden del Dia',
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
              private reunionService: ReunionService) {

    this.reunionService.currentReunionFilter().subscribe(
      dates => {
        this.pageSize = dates.size;
        this.page = dates.page;
        this.callService(dates);
      }
    );
  }

  ngOnInit() {
  }

  callService(reunionFilter: ReunionFilter) {
    this.reunionService.getAllReuniones(reunionFilter).subscribe(res => {
      this.totalEstudiantes = parseFloat(res.headers.get('X-Total-Count'));
      this.estudiantes = res.body;
    });
  }

  openModal(content) {
    this.modal = this.modalService.open(content, {backdrop: 'static', size: 'lg'});
  }

  submitEstudiante(form) {
    this.reunionService.postReunion({
      'descripcion': form.value.descripcion,
      'detalle': form.value.detalle,
      'fecha': form.value.fecha,
      'hora': form.value.hora,
      'lugar': form.value.lugar,
      'nombre': form.value.nombre,
      'ordenDia': form.value.ordenDia
    }).subscribe(
      res => {
        this.reunionService.sendReunionFilter(new DocenteFilter());
        this.reunionService.sendReunionFilter(new DocenteFilter());
        this.modal.close();
      }
    );
  }

  closeModal() {
    this.modal.close();
  }

  clickPagination(event: any) {
    const filter = this.reunionService.getReunionFilter();
    filter.page = (event.newPage) - 1;
    this.reunionService.sendReunionFilter(filter);
  }

  clickSort(event: any) {
    const state = event.isDesc ? 'desc' : 'asc';
    const filter = this.reunionService.getReunionFilter();
    filter.sort = [event.column + ',' + state];
    this.reunionService.sendReunionFilter(filter);
  }
}
