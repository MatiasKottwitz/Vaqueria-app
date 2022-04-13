import React from 'react'
import { BrowserRouter,Routes , Route } from 'react-router-dom';
import App from '../App';
import { NavBar } from '../components/NavBar';
import { Clientes } from '../components/Clientes';

export const Router = () => {
  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
          <Route path='/' element={App}/>
          <Route path='/Clientes' element={<Clientes></Clientes>}/>
      </Routes>
    </BrowserRouter>
  )
}
export default Router;