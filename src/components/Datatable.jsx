import React,{useState,useEffect }from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

//import {Modal, ModalBody, ModalHeader,ModalFooter, Form} from "reactstrap";
import { Modal, Button,Form,FormControl } from "react-bootstrap";
//import { Modal } from "bootstrap/dist/js/bootstrap.bundle.js";


//seccion para las Columnas..


//Funcion para las opciones de paginacion..
const paginacionOpciones={
    rowsPerPageText: 'Filas por Pagina',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsText:'Todos'
}

function Datatable() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    
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
          cell: (data) => < button className="btn btn-primary" onClick={()=>handleButtonClick(data)} >Editar Cliente</button>,
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
//--------------------------------------------------
    const handleShow = () => {
        setShow(true)

    }

        const action = <><button type="button" class="btn btn-success"onClick={handleShow}>
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
        <Button variant="danger" >
            Eliminar
          </Button>
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
          data={data}
          actions={action}
          defaultSortField="razon_social"
          defaultSortAsc={false}
          pagination
          paginationComponentOptions={paginacionOpciones}
          fixedHeader
          fixedHeaderScrollHeight="420px"
          highlightOnHover
        />
      </div>
      </>
     
  );
}
export default Datatable;