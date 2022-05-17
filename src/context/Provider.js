import React from 'react'
import { ElementoContext } from './Context'
import Datatable from '../views/Datatable'
const Provider = () => {
  return (
    <ElementoContext.Provider value={[]}>
      <Datatable/>
    </ElementoContext.Provider>
  )
}

export default Provider