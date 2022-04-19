import React,{useState,useEffect }from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";

//import {Modal, ModalBody, ModalHeader,ModalFooter, Form} from "reactstrap";
import { Modal, Button,Form} from "react-bootstrap";
//import { Modal } from "bootstrap/dist/js/bootstrap.bundle.js";


//seccion para las Columnas..


//Funcion para las opciones de paginacion..
const paginacionOpciones={
    rowsPerPageText: 'Filas por Pagina',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsText:'Todos'
}
 //Funcion para Buscaar Items
const SearchIt = ({ onChange, value }) => (
  <input
    placeholder="Buscar"
    onChange={(e) => onChange(e)}
    value={value.toLowerCase()}
  />
);
function Datatable() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false) & setShowNuevo(false);
    const [showNuevo,setShowNuevo] = useState(false);
    const [clienteSeleccionado, setClienteSeleccionado]=useState({
        razon_social:"",
        documento:"",
        domicilio:"",
        telefono:"",
        categoria_iva:"",
        cuit:""
        
    })
    const [celda, setCelda] = useState();
    const seleccionarCliente=(celda)=>{
        console.log(celda);
        setClienteSeleccionado(celda);
        handleShow();

    }
    const handleChange=e=>{
        const {name, value}=e.target;
        setClienteSeleccionado(prevState=>({
            ...prevState,
            [name]:value
        }));
        console.log(clienteSeleccionado);
    }
    const handleButtonClick = (row) => {
        seleccionarCliente(row)
		console.log('clicked');
	};


    const columns = [
        {
          name: "Razon Social",
          selector: (row) => row.razon_social,
          sortable: true
        },
        {
          name: "Documento",
          selector: (row) => row.documento,
          sortable: true
        },
        {
          name: "Domicilio",
          selector: (row) => row.domicilio,
          sortable: true
        },
        {
          name: "Localidad",
          selector: (row) => row.localidad,
          sortable: true
        },
        {
          name: "Telefono",
          selector: (row) => row.telefono,
          sortable: true
        },
        {
          name: "Categoria IVA",
          selector: (row) => row.categoria_iva,
          sortable: true
        },
        {
          name: "Cuit",
          selector: (row) => row.cuit,
          sortable: true
        },
        {
          name: "Acciones",
          cell: (row) => < button className="btn btn-primary" onClick={()=>handleButtonClick(row)} >Editar Cliente</button>,
          allowOverFlow:true,

        }
      ];
//////--------------------------------------------Peticion Get
    const [data, setData] = useState([]);
    const url = "http://localhost:3001/clientes/"
    useEffect(()=>{
        getData()
    },[]);
    const getData = async()=>{
     await axios.get(url)
     .then((response)=>{
         const data = response.data
         setData(data);
         console.log(data);
        })
    }
/////-------------------------------------------------Peticion Post
const peticionPost=async()=>{
    await axios.post(url,clienteSeleccionado)
    .then(response=>{
        setData(data.concat(response.data));
        handleClose();
    })
}
//---------------------------------------------------Peticion Put.
const peticionPut = async()=>{
  await axios.put(url+"/"+clienteSeleccionado.id,clienteSeleccionado)
  .then(response=>{
    var dataNueva = data;
    dataNueva.map(celda=>{
      if(celda.id===clienteSeleccionado.id ){
        console.log(celda.id);
          celda.razon_social=clienteSeleccionado.razon_social;
          celda.documento=clienteSeleccionado.documento;
          celda.domicilio=clienteSeleccionado.domicilio;
          celda.telefono=clienteSeleccionado.telefono;
          celda.categoria_iva=clienteSeleccionado.categoria_iva;
          celda.cuit=clienteSeleccionado.cuit;
          setData(dataNueva);
          handleClose();
      }
    })
  })
}
//-------------------------------------------------peticion Delete.
const peticionDelete=async()=>{
  await axios.delete(url+'/'+clienteSeleccionado.id)
  .then(response=>{
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
//-------------------------------------------------- Funcion buscar.
const [filtro, setFiltro] = useState('');
  const filteredData = data.filter(item =>
    item.razon_social.toLowerCase().includes(filtro)
  );
//----------------------------------------------
//-------
    const handleShow = () => {
        setShow(true)
}
const handleShowNuevo = () => {
   setShowNuevo(true)
}
  const action = <><button type="button" class="btn btn-success"onClick={handleShowNuevo}>
            Nuevo Cliente
  </button></>;

    return (
      <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Datos del Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group className="mb-3">
                    <Form.Control 
                        type="text"
                        name="razon_social"
                        placeholder="Razon Social"
                        value={clienteSeleccionado.razon_social}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control 
                        type="text"
                        name="documento"
                        placeholder="Documento"
                        value={clienteSeleccionado.documento}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control 
                        type="text"
                        name="domicilio"
                        placeholder="Domicilio"
                        value={clienteSeleccionado.domicilio}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control 
                        type="text"
                        name="telefono"
                        placeholder="Telefono"
                        value={clienteSeleccionado.telefono}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control 
                        type="text"
                        name="categoria_iva"
                        placeholder="Categoria IVA"
                        value={clienteSeleccionado.categoria_iva}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control 
                        type="text"
                        name="cuit"
                        placeholder="Cuit"
                        value={clienteSeleccionado.cuit}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

        </Modal.Body>
        <Modal.Footer>
        <Button variant="danger" onClick={()=>eliminarCliente()}>
            Eliminar
          </Button>
          <Button variant="success" onClick={()=>peticionPut()} >
            Guardar
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showNuevo} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Nuevo Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group className="mb-3">
                    <Form.Control 
                        type="text"
                        name="razon_social"
                        placeholder="Razon Social"
                        value={clienteSeleccionado.razon_social}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control 
                        type="text"
                        name="documento"
                        placeholder="Documento"
                        value={clienteSeleccionado.documento}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control 
                        type="text"
                        name="domicilio"
                        placeholder="Domicilio"
                        value={clienteSeleccionado.domicilio}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control 
                        type="text"
                        name="telefono"
                        placeholder="Telefono"
                        value={clienteSeleccionado.telefono}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control 
                        type="text"
                        name="categoria_iva"
                        placeholder="Categoria IVA"
                        value={clienteSeleccionado.categoria_iva}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control 
                        type="text"
                        name="cuit"
                        placeholder="Cuit"
                        value={clienteSeleccionado.cuit}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={()=>peticionPost()} >
            Guardar
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="table-responsive">
         <DataTable
          title="Lista de los Clientes Registrados"
          columns={columns}
          data={filteredData}
          actions={action}
          defaultSortField="razon_social"
          defaultSortAsc={false}
          pagination
          paginationComponentOptions={paginacionOpciones}
          fixedHeader
          fixedHeaderScrollHeight="420px"
          highlightOnHover
          subHeader
          subHeaderComponent={
            <SearchIt
              onChange={e => setFiltro(e.target.value)}
              value={filtro}
            />
          }
        />
      </div>
      </>
     
  );
}
export default Datatable;