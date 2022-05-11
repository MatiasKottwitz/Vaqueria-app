import React from 'react'
import CrudApi from "../../services/CrudApi";



export const Clientes = () => {
    return (
    <CrudApi url="http://localhost:3001/clientes/"/>
  )
}
