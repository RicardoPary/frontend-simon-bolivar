import {Component, OnInit} from '@angular/core';
import {Bimiestre} from './bimestre';
import {BimestreService} from '../../shared/services/bimestre.service';

@Component({
  selector: 'app-bimestre',
  templateUrl: './bimestre.component.html',
  styleUrls: ['./bimestre.component.scss']
})
export class BimestreComponent implements OnInit {

  bimestres: Bimiestre [] = [];

  constructor(private bimestreService: BimestreService) {
  }

  ngOnInit() {
    this.bimestres.push(new Bimiestre());
    this.bimestres.push(new Bimiestre());
    this.bimestres.push(new Bimiestre());
    this.bimestres.push(new Bimiestre());
    this.bimestres.push(new Bimiestre());
    this.bimestres.push(new Bimiestre());
    this.bimestres.push(new Bimiestre());
    this.bimestres.push(new Bimiestre());
    this.bimestres.push(new Bimiestre());
    this.bimestres.push(new Bimiestre());
    this.bimestres.push(new Bimiestre());
    this.bimestres.push(new Bimiestre());
  }

  saveBimestre() {

    this.bimestres.map(
      item => {
        this.bimestreService.createBimestre(
          {
            'autoevaluacionDecir': item.autoevaluacionDecir,
            'autoevaluacionSer': item.autoevaluacionSer,
            'bimestre': item.bimestre,
            'decirPromedio': item.decirPromedio,
            'hacerPromedio': item.hacerPromedio,
            'idDocente': item.idDocente,
            'idEstudiante': item.idEstudiante,
            'idMateria': item.idMateria,
            'indicadorCualitativo': item.indicadorCualitativo,
            'notaBimestralFinal': item.notaBimestralFinal,
            'notaDecir1': item.notaDecir1,
            'notaDecir2': item.notaDecir2,
            'notaDecir3': item.notaDecir3,
            'notaDecir4': item.notaDecir4,
            'notaDecir5': item.notaDecir5,
            'notaDecir6': item.notaDecir6,
            'notaHacer1': item.notaHacer1,
            'notaHacer2': item.notaHacer2,
            'notaHacer3': item.notaHacer3,
            'notaHacer4': item.notaHacer4,
            'notaHacer5': item.notaHacer5,
            'notaHacer6': item.notaHacer6,
            'notaSaber1': item.notaSaber1,
            'notaSaber2': item.notaSaber2,
            'notaSaber3': item.notaSaber3,
            'notaSaber4': item.notaSaber4,
            'notaSaber5': item.notaSaber5,
            'notaSaber6': item.notaSaber6,
            'notaSer1': item.notaSer1,
            'notaSer2': item.notaSer2,
            'notaSer3': item.notaSer3,
            'notaSer4': item.notaSer4,
            'notaSer5': item.notaSer5,
            'notaSer6': item.notaSer6,
            'observacion': item.observacion,
            'promedioAutoevaluacion': item.promedioAutoevaluacion,
            'saberPromedio': item.saberPromedio,
            'serPromedio': item.serPromedio
          }
        ).subscribe(
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
