import React,{useEffect , useState} from 'react'
import axios from 'axios';
import Tabla from './Tabla';
import Show from '../CRUD/Show';

const URL="http://localhost:3001/clientes";

export const Clientes = () => {
    /*
    const [data,setData]=useState();
    
    const peticionGet=async()=>{
       await axios.get(URL).then(response=>{
            console.log(response.data);
        })
    }
    useEffect(async()=>{
        await peticionGet();
    }[]);*/
    return (
    <Tabla/>
  )
}
