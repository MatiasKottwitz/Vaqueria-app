import React from 'react'
import { BrowserRouter,Routes , Route } from 'react-router-dom';
import App from '../App';
import { NavBar } from '../views/NavBar';
import { Clientes } from '../components/pages/Clientes';
import { NuevoCliente } from '../components/pages/NuevoCliente';

export const Router = () => {
  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
          <Route path='/' element={App}/>
          <Route path='/Clientes' element={<Clientes/>}/>
          <Route path='/NuevoCliente' element={<NuevoCliente/>}/>
      </Routes>
    </BrowserRouter>
  )
}
export default Router;