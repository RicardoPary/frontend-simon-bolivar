import {Component, OnInit} from '@angular/core';
import {BimestreService} from '../../shared/services/bimestre.service';
import {MateriaService} from '../../shared/services/materia.service';
import {CursoService} from '../../shared/services/curso.service';
import {ActivatedRoute} from '@angular/router';
import {Bimestre} from './bimestre';
import {BimestreFilter} from '../../shared/models/bimestre';
import {Subscription} from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-bimestre',
  templateUrl: './bimestre.component.html',
  styleUrls: ['./bimestre.component.scss']
})
export class BimestreComponent implements OnInit {

  subscriptionBimestreService: Subscription = new Subscription();

  materias: any = [];

  bimestres: any = [];
  filtersColumns: any;
  totalBimestres: number;
  pageSize: number;
  page: number;

  bimestreValue: any;
  materiaValue: any;
  gestionValue: any;

  constructor(private bimestreService: BimestreService,
              private cursoService: CursoService,
              private route: ActivatedRoute,
              private materiaService: MateriaService) {

    this.bimestreService.currentBimestreFilter().subscribe(
      dates => {
        this.pageSize = dates.size;
        this.page = dates.page;
        this.bimestreValue = dates.bimestre.bimestre;
        this.materiaValue = dates.bimestre.idMateria;
        this.gestionValue = dates.bimestre.gestion;
        this.callService(dates);
      }
    );

  }

  ngOnInit() {

    this.materiaService.getAllMateriasByIdCurso(this.route.snapshot.params['idCurso']).subscribe(
      res => this.materias = res.body
    );

  }

  callService(bimestreFilter: BimestreFilter) {
    this.subscriptionBimestreService = this.bimestreService.getAllBimestresByFilter(bimestreFilter).subscribe(res => {
      console.log(res);
      this.totalBimestres = parseFloat(res.headers.get('X-Total-Count'));
      this.bimestres = res.body;
    });
  }

  submitBimestre(value) {
    console.log(value);
    const filter = this.bimestreService.getBimestreFilter();
    filter.bimestre.bimestre = value;
    filter.page = 0;
    this.bimestreService.sendBimestreFilter(filter);
    this.page = 0;
  }

  submitMateria(value) {
    console.log(value);
    const filter = this.bimestreService.getBimestreFilter();
    filter.bimestre.idMateria = value;
    filter.page = 0;
    this.bimestreService.sendBimestreFilter(filter);
    this.page = 0;
  }

  submitGestion(value) {
    console.log(value);
    const filter = this.bimestreService.getBimestreFilter();
    filter.bimestre.gestion = value;
    filter.page = 0;
    this.bimestreService.sendBimestreFilter(filter);
    this.page = 0;
  }

  saveBimestre() {
    this.bimestres.map(
      item => {
        this.bimestreService.modifyBimestre(item).subscribe(
          res => {
            console.log(res);
          }
        );
      }
    );
  }

  getPromedio(nota1, nota2, nota3, nota4, nota5, nota6) {
    return (parseFloat(nota1) + parseFloat(nota2) + parseFloat(nota3) + parseFloat(nota4) + parseFloat(nota5) + parseFloat(nota6)) / 6;
  }
}
