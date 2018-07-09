export class Bimestre {
  name = '';
  bimestre = null;
  gestion = 2018;
  idDocente = null;
  idEstudiante = null;
  idMateria = null;
}

export class BimestreFilter {
  size = 40;
  page = 0;
  sort = ['id,desc'];
  bimestre: Bimestre = new Bimestre();
}
