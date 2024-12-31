import { describe, test, expect, vi } from "vitest"
import axios from "axios"
import autoresService from "./autoresService"

vi.mock("axios")

describe("AutoresService", () => {
  test("obtenerAutores trae correctamente los autores", async () => {
    const mockResponse = [
      { id: 1, nombre: "Gabriel", apellido: "García Márquez", lenguaNativa: "Español" }
    ]
    vi.spyOn(axios, "get").mockResolvedValue({ data: mockResponse })

    const autores = await autoresService.obtenerAutores("Gabriel")
    expect(axios.get).toHaveBeenCalledWith("http://localhost:9000/autores/busqueda", {
      params: { busqueda: "Gabriel" }
    })
    expect(autores[0].nombre).toBe("Gabriel")
  })

  test("getAutorById trae correctamente el autor con el id que se le pasa", async () => {
    const mockResponse = { id: 1, nombre: "Gabriel", apellido: "García Márquez", lenguaNativa: "Español" }
    vi.spyOn(axios, "get").mockResolvedValue({ data: mockResponse })

    const autor = await autoresService.getAutorById(1)
    expect(axios.get).toHaveBeenCalledWith("http://localhost:9000/autores/1")
    expect(autor.nombre).toBe("Gabriel")
  })

  test("eliminarAutorService elimina correctamente un autor", async () => {
    const mockAutores = [
      { id: 1, nombre: "Gabriel", apellido: "García Márquez", lenguaNativa: "Español" },
      { id: 2, nombre: "Isabel", apellido: "Allende", lenguaNativa: "Español" }
    ]

    vi.spyOn(axios, "delete").mockImplementation(() => {
      mockAutores.splice(0, 1)
      return Promise.resolve({})
    })

    await autoresService.eliminarAutorService(1)

    expect(axios.delete).toHaveBeenCalledWith("http://localhost:9000/autores/eliminar-autor/1")

    expect(mockAutores).toEqual([
      { id: 2, nombre: "Isabel", apellido: "Allende", lenguaNativa: "Español" }
    ])
  })

})
