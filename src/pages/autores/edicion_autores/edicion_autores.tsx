import { useOnInit } from '../../../customHooks/useOnInit.ts'
import './edicion_autores.css';
import React, { useEffect, useState } from 'react'
import { Autor } from '../../../domain/Autor.ts'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import AutoresService from '../../../services/autoresService.ts'
import { accionConfirmada } from '../../../components/confirmar-accion/confirmarAccion.ts'
import { ErrorResponse, mostrarMensajeError } from '../../../utils/error-handling.tsx'
import LibrosService from '../../../services/librosService.ts'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { CustomTextField } from '../../../components/mui-custom/text-field-custom.tsx'
import { sessionStorageService } from '../../../services/sessionStorage/sessionStorageService.ts';


type ContextType = { setTitulo: React.Dispatch<React.SetStateAction<string>> };

export const EdicionAutores = () => {
  const [autor, setAutor] = useState<Autor>(new Autor())
  const navigate = useNavigate()
  const { id } = useParams()
  const [idiomasDisponibles, setIdiomasDisponibles] = useState<string[]>([])
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const { setTitulo } = useOutletContext<ContextType>()

  useEffect(() => {
    const userId = sessionStorageService.getItem('userId')
    if (!userId) {
      navigate('/login')
    }
  }, [navigate])

  useOnInit(async () => {
    if(+id! == 0 ){
      setTitulo("Nuevo Autor")
    }
    else {
      setTitulo("Edición Autor")
      const nuevoAutor = await AutoresService.getAutorById(+id!)
      setAutor(nuevoAutor)
    }
    await buscarIdiomasDisponibles()
  })

  const validarFormulario = () => {
    const nuevosErrores: { [key: string]: string } = {}
    if (autor.nombre.trim() === "") nuevosErrores.autor_nombre = "El nombre es obligatorio"
    if (autor.apellido.trim() === "") nuevosErrores.autor_apellido = "El apellido es obligatorio"
    if (!autor.lenguaNativa) nuevosErrores.autor_lenguaNativa = "Debe seleccionar un lenguaje"

    setErrors(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0
  }

  const buscarIdiomasDisponibles = async () => {
    const idiomasDisponiblesEncontrados = await LibrosService.obtenerIdiomasDisponibles()
    setIdiomasDisponibles(idiomasDisponiblesEncontrados)
  }

  const nuevoAutor = async (autor : Autor) => {
    try{
      await AutoresService.nuevoAutorService(autor)
      accionConfirmada("¡Nuevo autor creado con exito!")
      irAAutores()
    } catch (error) {
      const errorResponse = error as ErrorResponse
      await mostrarMensajeError(errorResponse)
    }
  }

  const actualizarAutor = async (autor : Autor) => {
    try{
      await AutoresService.modificarAutorService(autor)
      accionConfirmada("¡Autor actualizado con exito!")
      irAAutores()
    } catch (error) {
      const errorResponse = error as ErrorResponse
      await mostrarMensajeError(errorResponse)
    }
  }

  const guardar = async () => {
    if (!validarFormulario()) return
    if (+id! == 0){
      await nuevoAutor(autor)
    }else{
      await actualizarAutor(autor)
    }
  }

  const cancelar = () => {
    irAAutores()
  }

  const irAAutores = () => {
    navigate(`/autores`)
  }

  const actualizar = (referencia: keyof typeof autor, valor: unknown) => {
    setAutor({
      ...autor,
      [referencia]:  valor
    })
  }

  return (
    <div className="edicion">
      <h2 className="h2">Autor</h2>
      <section className="edicion_container">
        <CustomTextField
          label="Nombre"
          value={autor.nombre}
          onChange={(event) => actualizar('nombre', event.target.value)}
          type='string'
          required
          error={!!errors.autor_nombre}
          helperText={errors.autor_nombre}
          data-testid="nombre_autor"
        />

        <CustomTextField
          label="Apellido"
          value={autor.apellido}
          onChange={(event) => actualizar('apellido', event.target.value)}
          type='string'
          required
          error={!!errors.autor_apellido}
          helperText={errors.autor_apellido}
          data-testid="apellido_autor"
        />

        <FormControl fullWidth>
          <InputLabel id="labelIdioma" sx={{
            fontFamily: "'Baloo Da 2', sans-serif",
            fontWeight: "bold",
            fontSize: "1.35rem"
          }}>Idioma</InputLabel>
          <Select
            id="selectorIdioma"
            labelId="labelIdioma"
            value={autor.lenguaNativa}
            label="Idiomas"
            // error={!!errors.autor_lenguaNativa}
            // helperText={errors.autor_lenguaNativa}
            onChange={(event) => {
              const idiomaSeleccionado = idiomasDisponibles.find(idioma => idioma === event.target.value);
              actualizar('lenguaNativa', idiomaSeleccionado)
            }}
            sx={{ fontFamily: "'Baloo Da 2', sans-serif", fontWeight: "bold", fontSize: "1.5rem" }}>
            {idiomasDisponibles.map((idioma) => (
              <MenuItem key={idioma} value={idioma}
                        sx={{ fontFamily: "'Baloo Da 2', sans-serif", fontWeight: "bold", fontSize: "1.4rem" }}>
                {idioma}
              </MenuItem>
            ))}
          </Select>
          {errors.autor_lenguaNativa}
        </FormControl>

      </section>
      <section className="boton_container">
        <button className="boton_cancelar" onClick={cancelar}>
          Cancelar
        </button>
        <button className="boton_guardar" data-testid="boton-guardar" onClick={guardar}>
          Guardar
        </button>
      </section>
    </div>
  )
};