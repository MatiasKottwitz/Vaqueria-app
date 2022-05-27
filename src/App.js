import React,{useState} from 'react'
import { Router } from './Routes/Router';
import { UserContext } from './context/Context';
export const App = () => {
  const [data, setData] = useState([]);
  return (
   
    <>
    <UserContext.Provider  value={{
      data,
      setData,
    }}>
      
      <Router/>
    </UserContext.Provider>
    </>
    
  )
}


export default App;
