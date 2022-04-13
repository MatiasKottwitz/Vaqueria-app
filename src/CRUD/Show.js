import React,{useState,useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"



import { Container, Form, Modal, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';

/*
import Swal from "sweetalert2"
import winthReactContent from "sweetalert2-react-content"
const MySwal = winthReactContent(Swal)*/


const Show =()=>{

 //1 - configuramos los hooks

 const [data, setData] = useState([])
 const [usuario, setUsuario] = useState([])
 const [busqueda, setBusqueda]= useState("");

 const [updateList, setUpdateList] = useState(false);
 const [showModal, setShowModal] = useState(false);
 const [dataModal, setDataModal] = useState({})

 const handleCloseModal = () => {setShowModal(false)}
 const handleOpenModal = () => {setShowModal(true)}


const [clienteSeleccionado, setClienteSeleccionado]=useState({
    razon_social:"",
    documento:"",
    domicilio:"",
    telefono:"",
    categoria_iva:""
    
})


 //2 - referenciamos a la Api

 const url = "http://localhost:3001/clientes/"

 //3 - funcion para mostrar todos los datos

 const getData = async()=>{
    await axios.get(url)
    .then((response)=>{
        const data = response.data
        setData(data);
        setUsuario(data);
        console.log(data);
         
    })
}

 //4 - funcion para eliminar los datos



 const handleChange=e=>{
    setBusqueda(e.target.value);
    filtrar(e.target.value);
    console.log("Busqueda: "+e.target.value)
  }
  
  const filtrar=(terminoBusqueda)=>{
    var resultadosBusqueda=data.filter((elemento)=>{
      if(elemento.razon_social.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
      
      ){
        return elemento;
      }
    });
    setUsuario(resultadosBusqueda);
  }
  










 //5 - funcion de confirmacion para Sweet Alert 2

 //6 - usamos useEffect
 useEffect(()=>{
    getData()
},[]);








 //7 - funcion para activa la ventana modal de editar

 const handleEdit = () => {
    handleOpenModal();
    setDataModal(data)
}
 const handleChangeModal = ({target}) => {
    setDataModal({
        ...dataModal,
        [target.name]: target.value
    })
}

 const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.put(`${URL}/${dataModal.data}`, dataModal)
    if (response.status === 200) {
        Swal.fire(
            'Guardado!',
            `El registro ${response.data.razon_social} ha sido actualizado exitosamente!`,
            'success'
        )
        handleCloseModal();
        setUpdateList(!updateList)
    }else {
        Swal.fire(
            'Error!',
            'Hubo un problema al actualizar el registro!',
            'error'
        )
    }
}

//modulo para borrar un registro
const handleDelete = async () => {

    Swal.fire({
        title: `Estás seguro de eliminar ${usuario.cliente} ?`,
        text: "Esta acción no se puede deshacer!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Sí, Eliminarlo!'
      }).then((result) => {
        if (result.isConfirmed) {
            
            axios.delete(`${URL}/${data.cliente}`).then((response) => {
                if (response.status === 200) {
                    Swal.fire(
                        'Eliminado!',
                        `Se eliminó con éxito el registro ${data.cliente}!`,
                        'success'
                    )
                    setUpdateList(!updateList)
                }else {
                    Swal.fire(
                        'Error!',
                        'Hubo un problema al elminar el registro!',
                        'error'
                    )
                }
            })
        }
      })
}

    return(
   <>
    
      
<div className="container">

<div className="containerInput">
        <input
          className="form-control inputBuscar"
          value={busqueda}
          placeholder="Búsqueda por Nombre o Empresa"
          onChange={handleChange}
        />
        <button className="btn btn-success"><i class="fa-thin fa-magnifying-glass-plus"></i>
        </button>
      </div>



       
       <div className="row">
           <div className="col">
               <div className="d-grid gap-2">
                   <Link to="/create" className="btn btn-secondary mt-2 mb-2">Agregar cliente</Link>
               </div>

               <table className="table table-hover">
                   <thead>
                       <tr>
                           <th>Razon Social</th>
                           <th>Documento</th>
                           <th>Domicilio</th>
                           <th>Telefono</th>
                           <th>Categoria IVA</th>
                           <th>Acciones</th>
                       </tr>
                   </thead>

                   <tbody>
                       {usuario.map((cliente)=>(
                           <tr key={cliente.id}>
                               <td>{cliente.razon_social}</td>
                               <td>{cliente.documento}</td>
                               <td>{cliente.domicilio}</td>
                               <td>{cliente.telefono}</td>
                               <td>{cliente.categoria_iva}</td>
                               <td>
                                   {/*<Link to={`/edit/${cliente.id}`} className="btn btn-success"><i className="fa-solid fa-user-pen"> Editar</i></Link>*/}

                                   <button onClick={handleEdit} className="btn btn-success"><i className="fa-solid fa-user-pen"> Editar</i></button>
                                   &nbsp;&nbsp;
                                   <button  onClick={handleDelete} className="btn btn-danger"><i className="fa-solid fa-user-xmark"> Borrar</i></button>
                               </td>

                           </tr>
                       ))}
                   </tbody>
                   




               </table>
           </div>

        </div>
   </div>



   
   <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header>
                    <Modal.Title>Actualizar Datos</Modal.Title>
                </Modal.Header>
                <Form
                    onSubmit = {handleSubmit}
                >
                    <Modal.Body>
                    <Form.Group className="mb-3">
                    <Form.Control 
                        type="text"
                        name="razon_social"
                        placeholder="Razon Social"
                        value={dataModal.razon_social}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control 
                        type="text"
                        name="documento"
                        placeholder="Documento"
                        value={dataModal.documento}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control 
                        type="text"
                        name="domicilio"
                        placeholder="Domicilio"
                        value={dataModal.domicilio}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control 
                        type="text"
                        name="telefono"
                        placeholder="Telefono"
                        value={dataModal.telefono}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control 
                        type="text"
                        name="categoria_iva"
                        placeholder="Categoria IVA"
                        value={dataModal.categoria_iva}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                       
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-secondary" type="reset" onClick={handleCloseModal}>
                            Cancelar
                        </button>
                        <button className="btn btn-success" type="submit">
                            Guardar
                        </button>
                    </Modal.Footer>
                </Form>
            </Modal>

   
   
   </>



    )
}
export default Show;