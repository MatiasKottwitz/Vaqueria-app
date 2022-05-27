import React,{useState,useEffect,useContext }from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Datatable from "../views/Datatable";
import { UserContext } from "../context/Context";
const CrudApi = ({url}) => {
  const {data , setData} = useContext(UserContext);

  //////--------------------------------------------Peticion Get
    
    const getData = async()=>{
     await axios.get(url)
     .then((response)=>{
         const data = response.data
         setData(data);
         //console.log(data);
        })
    }
    useEffect(()=>{
      getData()
  },[]);
/* 
        /////-------------------------------------------------Peticion Post
const peticionPost=async()=>{  
  await axios.post(url,clienteSeleccionado)
    .then(response=>{
        setData(data.concat(response.data));
        handleClose();
    })
}

const cargarCliente =()=>{
  Swal.fire({
    title: '¿Esta seguro de guardar los datos?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Guardar',
    denyButtonText: `No Guardar`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below 
    if (result.isConfirmed) {
      peticionPost();
      Swal.fire('Guardado!', '', 'success')
    } else if (result.isDenied) {
      Swal.fire('Cambios No Guardados...', '', 'info')
    }
  })
}
//---------------------------------------------------Peticion Put.
const peticionPut = async(e)=>{
  e.preventDefault();
  await axios.put(url+"/"+clienteSeleccionado.id,clienteSeleccionado)
  .then(()=>{
    var dataNueva = data;
    dataNueva.map(celda=>{
      if(celda.id===clienteSeleccionado.id ){
        console.log(celda.id);
        setData(dataNueva);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Cliente Actualizado Correctamente!',
            showConfirmButton: false,
            timer: 1500
          })
          handleClose();
      }
    })
  })
}
//-------------------------------------------------peticion Delete.
const peticionDelete=async()=>{
  await axios.delete(url+'/'+clienteSeleccionado.id)
  .then(()=>{
    setData(data.filter(celda=>celda.id!==clienteSeleccionado.id))
  })
}
const eliminarCliente =()=>{
  Swal.fire({
    title: 'Atencion!',
    text: `Estás seguro de eliminar ${clienteSeleccionado.razon_social}?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText:'Cancelar',
    confirmButtonText: 'Aceptar'
  }).then((result) => {
    if (result.isConfirmed) {
      peticionDelete();
      Swal.fire(
        'Cliente Borrado!!',
        'Cliente Borrado Con exito!',
        'success'
      )
    }
  })
  handleClose();
}
*/
return(
  <Datatable/>
) 
}
export default CrudApi;