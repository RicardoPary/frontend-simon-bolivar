export class Bimestre {
  name: String;
}

export class BimestreFilter {
  size = 10;
  page = 0;
  sort = ['id,desc'];
  bimestre: Bimestre = new Bimestre();
}
