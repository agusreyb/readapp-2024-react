import { Autor, AutorJSON } from './Autor.ts'


export type LibroJSON = {
  id: number
  titulo_libro: string
  autor : AutorJSON
  imagen_libro_url: string
  cant_pags_libro: number
  cant_palabras_libro: number
  cant_ediciones: number
  idiomas_libro: string[]
  ventas_semanales: number
  esBestSeller: boolean
  esDesafiante: boolean
  esLargo: boolean
  paginasLargo: number
}

export class Libro {
  constructor(
    public id: number = 0,
    public titulo_libro: string = "",
    public autor : Autor = new Autor(),
    public imagen_libro_url: string = "",
    public cant_pags_libro: number = 0,
    public cant_palabras_libro: number = 0,
    public cant_ediciones: number = 0,
    public idiomas_libro: string[] = [],
    public ventas_semanales: number = 0,
    public esBestSeller: boolean = false,
    public esDesafiante: boolean = false,
    public esLargo: boolean = false,
    public paginasLargo: number = 0
  ) {}

  static fromJson(libroJSON: LibroJSON): Libro {
    return Object.assign(
      new Libro(), libroJSON, {
        autor: libroJSON.autor
          ? Autor.fromJson(libroJSON.autor)
          : undefined
      }
    )
  }

}