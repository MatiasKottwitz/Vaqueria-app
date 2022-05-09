import React from 'react'
import Datatable from '../components/Datatable';
import CrudApi from '../services/CrudApi';



export const Clientes = () => {
    return (
    <CrudApi url="http://localhost:3001/clientes/"/>
  )
}
