import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import Indicadores from './components/indicadores/indicadores.tsx'
import {Libros} from './components/libros/libros.tsx'
import { BusquedaAutores } from './pages/autores/busqueda_autores/busqueda_autores.tsx'
import { Login }from './components/login/login.tsx'
import { EdicionAutores } from './pages/autores/edicion_autores/edicion_autores.tsx'
import { EdicionLibros } from './pages/edicionLibro/edicionLibro.tsx'
import Logout from './components/logout/logout.tsx'
import Layout from './pages/header-footerComp/padreOutlet.tsx'


export const ReadappRoutes = () =>
 
  <Routes>

    <Route path="/login" element={<Login />} />
    <Route path="/logout" element={<Logout />} />

    <Route element={<Layout  />}>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Indicadores  />} />
      <Route path="/libros" element={<Libros />} />
      <Route path="/autores" element={<BusquedaAutores />} />
      <Route path="/autores/edicion/:id" element={<EdicionAutores  />} />
      <Route path="/libro/edicion/:id" element={<EdicionLibros  />} />
    </Route>

  
  </Routes>


