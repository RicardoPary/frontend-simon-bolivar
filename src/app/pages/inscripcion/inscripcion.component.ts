import {Component, OnInit} from '@angular/core';
import {DocenteFilter} from '../../shared/models/docente';
import {EstudianteService} from '../../shared/services/estudiante.service';
import {EstudianteFilter} from '../../shared/models/estudiante';
import {PersonaService} from '../../shared/services/persona.service';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {InscripcionService} from '../../shared/services/inscripcion.service';
import {InscripcionFilter} from '../../shared/models/inscripcion';
import {CursoService} from '../../shared/services/curso.service';
import {CursoFilter} from '../../shared/models/curso';
import {BimestreService} from '../../shared/services/bimestre.service';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.scss']
})
export class InscripcionComponent implements OnInit {

  inscripciones: any = [];
  filtersColumns: any;
  totalInscripciones: number;
  pageSize: number;
  page: number;


  estudiantes: any = [];
  cursos: any = [];


  modal: NgbModalRef;

  headersColumns: any = [
    {
      name: 'idEstudiante',
      displayName: 'Estudiante',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'idCurso',
      displayName: 'Curso',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'createdBy',
      displayName: 'Creado por Usuario',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'text'
    },
    {
      name: 'createdDate',
      displayName: 'Fecha de Inscripcion',
      canSort: true,
      canFilter: true,
      pattern: '',
      messageError: '',
      type: 'dateTime'
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
              private personaService: PersonaService,
              private inscripcionService: InscripcionService,
              private estudianteService: EstudianteService,
              private cursoService: CursoService,
              private bimestreService: BimestreService) {

    this.inscripcionService.currentInscripcionFilter().subscribe(
      dates => {
        this.pageSize = dates.size;
        this.page = dates.page;
        this.callService(dates);
      }
    );

  }

  ngOnInit() {

    const estudianteFilter = new EstudianteFilter();
    estudianteFilter.size = 100;
    this.estudianteService.getAllEstudiantes(estudianteFilter).subscribe(
      res => this.estudiantes = res.body
    );

    this.cursoService.getAllCursos(new CursoFilter()).subscribe(
      res => this.cursos = res.body
    );

  }

  callService(inscripcionFilter: InscripcionFilter) {
    this.inscripcionService.getAllInscripciones(inscripcionFilter).subscribe(res => {
      this.totalInscripciones = parseFloat(res.headers.get('X-Total-Count'));
      this.inscripciones = res.body;
    });
  }

  openModal(content) {
    this.modal = this.modalService.open(content, {backdrop: 'static', size: 'lg'});
  }

  submitEstudiante(form) {
    this.inscripcionService.createInscripcion({
      'idCurso': parseFloat(form.value.curso),
      'idEstudiante': parseFloat(form.value.estudiante)
    }).subscribe(
      res => {
        console.log(res);




        for (let i = 0; i < 4; i++) {
          this.bimestreService.createBimestre({
            'autoevaluacionDecir': 0,
            'autoevaluacionSer': 0,
            'bimestre': i,
            'decirPromedio': 0,
            'estudiante': this.findEstudent(parseFloat(form.value.estudiante)),
            'gestion': (new Date()).getFullYear(),
            'hacerPromedio': 0,
            'idCurso': parseFloat(form.value.curso),
            'idDocente': 0,
            'idMateria': 0,
            'indicadorCualitativo': 'ninguno',
            'notaBimestralFinal': 0,
            'notaDecir1': 0,
            'notaDecir2': 0,
            'notaDecir3': 0,
            'notaDecir4': 0,
            'notaDecir5': 0,
            'notaDecir6': 0,
            'notaHacer1': 0,
            'notaHacer2': 0,
            'notaHacer3': 0,
            'notaHacer4': 0,
            'notaHacer5': 0,
            'notaHacer6': 0,
            'notaSaber1': 0,
            'notaSaber2': 0,
            'notaSaber3': 0,
            'notaSaber4': 0,
            'notaSaber5': 0,
            'notaSaber6': 0,
            'notaSer1': 0,
            'notaSer2': 0,
            'notaSer3': 0,
            'notaSer4': 0,
            'notaSer5': 0,
            'notaSer6': 0,
            'observacion': 'ninguno',
            'paralelo': 'ninguno',
            'promedioAutoevaluacion': 0,
            'saberPromedio': 0,
            'serPromedio': 0
          }).subscribe(
            ress => console.log(ress)
          );
        }

        this.closeModal();
      }
    );


  }

  findEstudent(id) {
    let estudiante = null;
    this.estudiantes.map(
      item => {
        if (item.id === id) {
          estudiante = item;
        }
      }
    );
    return estudiante;
  }

  closeModal() {
    this.modal.close();
  }


  clickPagination(event: any) {
    const filter = this.estudianteService.getEstudianteFilter();
    filter.page = (event.newPage) - 1;
    this.estudianteService.sendEstudianteFilter(filter);
  }

  clickSort(event: any) {
    const state = event.isDesc ? 'desc' : 'asc';
    const filter = this.estudianteService.getEstudianteFilter();
    filter.sort = [event.column + ',' + state];
    this.estudianteService.sendEstudianteFilter(filter);
  }

}
