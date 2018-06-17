export class Bimestre {
  name = '';
  bimestre = '1';
  gestion = 2018;
  idDocente = null;
  idEstudiante = null;
  idMateria = null;
}

export class BimestreFilter {
  size = 10;
  page = 0;
  sort = ['id,desc'];
  bimestre: Bimestre = new Bimestre();
}
