import { useState } from 'react'
import './libros.css'
import { useOnInit } from '../../customHooks/useOnInit.ts'
import { Libro } from '../../domain/Libro.ts'
import { Autor } from '../../domain/Autor.ts'
import AutoresService from '../../services/autoresService.ts'
import { CustomTextField } from '../mui-custom/text-field-custom.tsx'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import { CheckboxCustom, CheckboxCustomDisabledChecked } from '../mui-custom/checkbox-custom.tsx'
import LibrosService from '../../services/librosService.ts'
import { accionConfirmada } from '../confirmar-accion/confirmarAccion.ts'
import { AccionError, ErrorResponse, mostrarMensajeError } from '../../utils/error-handling.tsx'
import { useNavigate } from 'react-router-dom'



export const PlantillaLibros = ({ libro }: { libro: Libro })=> {
  const navigate = useNavigate()
  // const [enabled, setEnabled] = useState(true)
  const [libroState, setLibroState] = useState<Libro>(libro)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [autores, setAutores] = useState<Autor[]>([])
  const [idiomasDisponibles, setIdiomasDisponibles] = useState<string[]>([])

  useOnInit( () => {
    setLibroState(libro)
    buscarAutores('')
    buscarIdiomasDisponibles()
  })

  const validarFormulario = () => {
    const nuevosErrores: { [key: string]: string } = {}
    if (!libroState.titulo_libro.trim()) nuevosErrores.titulo_libro = "El título es obligatorio."
    if (!libroState.autor || !libroState.autor.id) nuevosErrores.autor = "Debes seleccionar un autor.";
    if (!libroState.cant_ediciones || libroState.cant_ediciones <= 0) nuevosErrores.cant_ediciones = "Debe ser mayor a 0."
    if (!libroState.cant_pags_libro || libroState.cant_pags_libro <= 0) nuevosErrores.cant_pags_libro = "Debe ser mayor a 0."
    if (!libroState.cant_palabras_libro || libroState.cant_palabras_libro <= 0) nuevosErrores.cant_palabras_libro = "Debe ser mayor a 0."
    if (!libroState.ventas_semanales || libroState.ventas_semanales < 0) nuevosErrores.ventas_semanales = "Debe ser mayor o igual a 0."

    setErrors(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0
  }

  const buscarAutores = async (textoBusquedaNuevo: string) => {
    const autoresEncontrados = await AutoresService.obtenerAutores(textoBusquedaNuevo)
    setAutores(autoresEncontrados)
  }

  const buscarIdiomasDisponibles = async () => {
    const idiomasDisponiblesEncontrados = await LibrosService.obtenerIdiomasDisponibles()
    setIdiomasDisponibles(idiomasDisponiblesEncontrados)
  }


  const guardar = async () => {
    if (!validarFormulario()) return

    if (libro.id == 0){
      nuevoLibro(libroState)
    }else{
      actualizarLibro(libroState)
    }
   
  };

  const nuevoLibro = async (libroState : Libro) => {
    try{
     
      await LibrosService.nuevoLibroService(libroState)
      accionConfirmada("¡Nuevo libro creado con exito!")
      irALibros()
      
    } catch (error) {
      const errorResponse = error as ErrorResponse
      AccionError((error as Error).message)
      await mostrarMensajeError(errorResponse)
     
    }
  }
  
  const actualizarLibro = async (libroState : Libro) => {
    
    try{
      await LibrosService.actualizarLibroService(libroState)
      accionConfirmada("¡Libro actualizado con exito!")
      irALibros()
    } catch (error) {
      const errorResponse = error as ErrorResponse
      AccionError((error as Error).message)
      await mostrarMensajeError(errorResponse)
    }
  }


  const cancelar = () => {
    irALibros()
  };

  const actualizar = (referencia: keyof typeof libroState, valor: unknown) => {
    setLibroState({
      ...libroState,
      [referencia]:  valor
    })
  }

  const irALibros = () => {
    navigate(`/libros`)
  }

  return (
    <form key="formularioLibros" className="librosContainer" onSubmit={(event) => {
      event.preventDefault()
    }}>
      <div className='seccionIconos'>
            <h2>Libro</h2>
            <div>
            {libroState.esBestSeller && (
             <img src="src/assets/images/certificate.svg" className="iconosPlantilla" alt="Certificado"/>
            )}
            {libroState.esDesafiante && (
              <img src="src/assets/images/fire.svg" className="iconosPlantilla" alt="Hot trendy"/>
            )}
            </div>
      </div>

      <div className="formatoContenidoPlantilla">

        <CustomTextField
          label="Titulo"
          value={libroState.titulo_libro}
          onChange={(event) => actualizar('titulo_libro', event.target.value)}
          type='string'
          required
          error={!!errors.titulo_libro}
          helperText={errors.titulo_libro}
        />

        <FormControl fullWidth data-testid="formularioLibroSelect">
          <InputLabel id="labelAutor" sx={{
            fontFamily: "'Baloo Da 2', sans-serif",
            fontWeight: "bold",
            fontSize: "1.35rem"
          }}>Autor</InputLabel>
          <Select
            id="selectorAutor"
            labelId="labelAutor"
            value={autores.find(a => a.id === libroState.autor?.id) ? libroState.autor.id : ""}
            label="Autor"
            onChange={(event) => {
              const autorSeleccionado = autores.find(autor => autor.id === event.target.value)
              actualizar('autor', autorSeleccionado)
            }}
            sx={{ fontFamily: "'Baloo Da 2', sans-serif", fontWeight: "bold", fontSize: "1.5rem" }}
          >
            {autores.map((autor) => (
              <MenuItem key={autor.id} value={autor.id} sx={{ fontFamily: "'Baloo Da 2', sans-serif", fontWeight: "bold", fontSize: "1.4rem" }}>
                {autor.nombre} {autor.apellido}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <CustomTextField
          label="Ediciones"
          value={libroState.cant_ediciones}
          onChange={(event) => actualizar('cant_ediciones', event.target.value)}
          type='number'
          data-testid="EdicionesCtmTextField"
          error={!!errors.cant_ediciones}
          helperText={errors.cant_ediciones}
          required
        />
        <div className="tiporow">
          <CustomTextField
            label="Cantidad de paginas"
            value={libroState.cant_pags_libro}
            onChange={(event) =>
              actualizar('cant_pags_libro', event.target.value)
            }
            type='number'
            required
            error={!!errors.cant_pags_libro}
            helperText={errors.cant_pags_libro}
          />
          <CustomTextField
            label="Cantidad de palabras"
            value={libroState.cant_palabras_libro}
            onChange={(event) =>
              actualizar('cant_palabras_libro', event.target.value)
            }
            type='number'
            error={!!errors.cant_palabras_libro}
            helperText={errors.cant_palabras_libro}
            required
          />
        </div>
        <CustomTextField
          label="Ventas semanales"
          value={libroState.ventas_semanales}
          onChange={(event) =>
            actualizar('ventas_semanales', event.target.value)
          }
          type='number'
          error={!!errors.ventas_semanales}
          helperText={errors.ventas_semanales}
          required
        />
        <CheckboxCustom
          data-testid="checkbox-lecturacompleja"
          checkedBoolean={libroState.esDesafiante}
          onChange={(event) => actualizar('esDesafiante', event.target.checked)}
          labelName={"Lectura compleja"}>
        </CheckboxCustom>
        <hr className="separador" />
        <h2>Lenguaje Original: {libroState.autor.lenguaNativa}</h2>
        <h2> Otros idiomas</h2>
        <div className="checkboxgrid">
          <CheckboxCustomDisabledChecked
            data-testid="checkbox-idiomaautor"
            checkedBoolean={true}
            onChange={(event) => { actualizar('autor', event.target.checked)}}
            labelName={libroState.autor.lenguaNativa}
          />
          {idiomasDisponibles.filter(idioma => idioma !== libroState.autor.lenguaNativa).length > 0 ? (
            idiomasDisponibles.filter(idioma => idioma !== libroState.autor.lenguaNativa).map((idioma) => (
              <CheckboxCustom
                data-testid="checkbox-idiomas"
                key={idioma}
                checkedBoolean={libroState.idiomas_libro.includes(idioma)}
                onChange={(event) => {
                  if (event.target.checked) {
                    actualizar('idiomas_libro', [...libroState.idiomas_libro, idioma])
                  } else {
                    actualizar(
                      'idiomas_libro',
                      libroState.idiomas_libro.filter((id) => id !== idioma)
                    )
                  }
                }}
                labelName={idioma}
              />
            ))
          ) : (
            <p className="mensajeError">No se encontraron idiomas.</p>
          )}
        </div>
        <div className="idiomasGrid"></div>
      </div>
      <section className="boton_container">
        <button className="boton_cancelar" onClick={cancelar}>
          Cancelar
        </button>
        <button className="boton_guardar" onClick={guardar}>
          Guardar
        </button>
      </section>
    </form>
  )
}

