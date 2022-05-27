import React,{useState} from 'react'
import { Router } from './Routes/Router';
import { DataContext, DatoContext } from './context/Context';
export const App = () => {
  //states utilizados para almacenar la informacion de la API.
  const [data, setData] = useState([]);
  const [dato,setDato] = useState([]);
  return (
    <>
    {/* Context provider usado por todos los componentes*/}
    <DataContext.Provider  value={{data,setData,}}>
      <DatoContext.Provider value={{dato,setDato}}>
        <Router/>
      </DatoContext.Provider>  
    </DataContext.Provider>
    </>
    
  )
}


export default App;
