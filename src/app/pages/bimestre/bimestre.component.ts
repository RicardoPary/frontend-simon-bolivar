import {Component, OnInit} from '@angular/core';
import {Bimiestre} from './bimestre';

@Component({
  selector: 'app-bimestre',
  templateUrl: './bimestre.component.html',
  styleUrls: ['./bimestre.component.scss']
})
export class BimestreComponent implements OnInit {

  bimestres: Bimiestre [] = [];

  constructor() {
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

}
