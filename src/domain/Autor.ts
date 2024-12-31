export type AutorJSON = {
  id: number
  nombre: string
  apellido: string
  lenguaNativa: string
}

export class Autor {
  constructor(
    public id: number = -1,
    public nombre: string = "",
    public apellido: string = "",
    public lenguaNativa: string = "",
  ) {}


  static fromJson(autorJSON: AutorJSON): Autor {
    return Object.assign(
      new Autor(), autorJSON, {}
    )
  }
}