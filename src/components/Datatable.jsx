import React,{useState,useEffect }from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import { Modal, Button, Form, Col, Row,} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, Navigate, NavLink } from "react-router-dom";
import NuevoCliente from './NuevoCliente'
//-------------------------------------------------- Funcion buscar.
const SearchIt = ({ onChange, value }) => (
  <>
    <div className="input-group input-group-xl w-50">
    <span className="input-group-text">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
      </svg>
    </span>
    <input className="form-control"
    placeholder="Buscar Clientes Por Razon Social"
    onChange={(e) => onChange(e)}
    value={value.toLowerCase()}
  />
    </div>
  </>
  
  
);
function Datatable() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false) & setShowNuevo(false);
    const [showNuevo,setShowNuevo] = useState(false);
    const [filtro, setFiltro] = useState('');
    const [clienteSeleccionado, setClienteSeleccionado]=useState({});
    
    const paginacionOpciones={
      rowsPerPageText: 'Filas por Pagina',
      rangeSeparatorText: 'de',
      selectAllRowsItem: true,
      selectAllRowsText:'Todos'
    };
    
    
    const seleccionarCliente=(celda)=>{
      console.log(celda);
      setClienteSeleccionado(celda);
      handleShow();
    
    }
    //Funcion Utilizada para capurar datos de los input.
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
    const handleShow = () => {
      setShow(true)
    };
    const handleShowNuevo = () => {
      setClienteSeleccionado({}); 
      setShowNuevo(true)
    };
    
    const columns = [
        {
          name: "Razon Social",
          selector: (row) => row.razon_social,
          sortable: true,
          width:"200px",
          wrap:true
        },
        
        {
          name: "Documento",
          selector: (row) => row.documento,
          sortable: true,
          width:"120px"
        },
        {
          name: "Tipo de Documento",
          selector: (row) => row.tipo_documento,
          sortable: true,
          width:"100px"
        },
        {
          name: "Domicilio",
          selector: (row) => row.domicilio,
          sortable: true,
          width:"180px",
          center:true
        },
        {
          name: "Localidad",
          selector: (row) => row.localidad,
          sortable: true,
          width:"120px",
          center:true
        },
        {
          name: "Cod Postal",
          selector: (row) => row.postal,
          sortable: true,
          width:"150px",
          center:true
        },
        {
          name: "Telefono",
          selector: (row) => row.telefono,
          sortable: true,
          width:"150px",
          center:true
        },
        {
          name: "Cat. IVA",
          selector: (row) => row.categoria_iva,
          sortable: true,
          width:"95px",
          center:true
        },
        {
          name: "Cuit",
          selector: (row) => row.cuit,
          sortable: true,
          width:"120px",
          center:true
        },
        /*{
          name: "Provincia",
          selector: (row) => row.provincia,
          sortable: true
        },
        {
          name: "Cat Ingresos Brutos",
          selector: (row) => row.categoria_ingresos_brutos,
          sortable: true
        },*/
        {
          name: "Acciones",
          cell: (row) => < button className="btn btn-warning" onClick={()=>handleButtonClick(row)} ><i class="bi bi-pencil-square"></i></button>,
          allowOverFlow:true,
          width:"100px",
          center:true

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
const cargarCliente =()=>{
  Swal.fire({
    title: '¿Esta seguro de guardar los datos?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Guardar',
    denyButtonText: `No Guardar`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
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

  const filteredData = data.filter(item =>
    item.razon_social.toLowerCase().includes(filtro)
  );

  
  const onRowClicked = (row, event) => { 
    
    console.log("fila presionada:"+ row.razon_social);
    <Navigate to="/NuevoCliente" replace={true}/>
  };
//<Link to='/NuevoCliente' class="btn btn-success">Nuevo Cliente</Link>
  const action = <>
        <button type="button" class="btn btn-success" onClick={handleShowNuevo}>
        <i class="bi bi-plus-lg"></i>
            Nuevo Cliente
        </button>
        
      </>;

    return (
      <>
      <Modal show={show}  onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Datos del Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <Form onSubmit={peticionPut}>
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
                        name="localidad"
                        placeholder="Localidad"
                        value={clienteSeleccionado.localidad}
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
                     <Form.Select name="categoria_iva" value={clienteSeleccionado.categoria_iva} onChange={handleChange}>
                      <option >Seleccione Categoria</option>
                      <option value="1"> (1) Régimen Simplificado (RS) - Monotributista</option>
                      <option value="2">(2) Responsable Inscripto (RI)</option>
                      <option value="3"> (3) Exento</option>
                      <option value="4"> (4) Consumidor Final</option>
                    </Form.Select>
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
                <Modal.Footer>
        <Button variant="danger" onClick={()=>eliminarCliente()}>
            Eliminar
          </Button>
          <Button variant="success" type="submit">
            Guardar
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
        </Modal.Footer>
                </Form> 
        </Modal.Body>
       
      </Modal>


      <Modal show={showNuevo} size='xl'  onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Nuevo Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
          <Row>
              <Form.Group className="mb-3" as={Col} lg='3'>
              <Form.Label>Razon Social</Form.Label>
                <Form.Control 
                    type="text"
                    name="razon_social"
                    placeholder="Nombre Y Apellido"
                    value={clienteSeleccionado.razon_social}
                    onChange={handleChange}
                    required
                />
             </Form.Group>
             <Form.Group className="mb-3" as={Col} sm='3'>
                    <Form.Label>Tipo de Documento</Form.Label>
                     <Form.Select name="tipo_documento" value={clienteSeleccionado.tipo_documento} onChange={handleChange}>
                      <option >Elija Tipo</option>
                      <option value="DNI">D.N.I.- Documento Nacional de Identidad.</option>
                      <option value="LC">L.C.- Libreta Cívica.</option>
                      <option value="LE">L.E.- Libreta de Enrolamiento.</option>
                      <option value="C.I">C.I.- Cédula de Identidad.</option>
                      
                    </Form.Select>
                </Form.Group>
            <Form.Group className="mb-3" as={Col} sm='3'>
            <Form.Label>Numero Documento</Form.Label>
              <Form.Control 
                  type="number"
                  name="documento"
                  placeholder="Documento"
                  value={clienteSeleccionado.documento}
                  onChange={handleChange}
                  required
              />
          </Form.Group>
           
                <Form.Group className="mb-3" as={Col} sm='3'>
                <Form.Label>Direccion Domicilio</Form.Label>
                    <Form.Control 
                        type="text"
                        name="domicilio"
                        placeholder="Domicilio"
                        value={clienteSeleccionado.domicilio}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                </Row>
           <Row> 
                <Form.Group className="mb-3" as={Col} sm='3'>
                <Form.Label>Localidad</Form.Label>
                    <Form.Control 
                        type="text"
                        name="localidad"
                        placeholder="Localidad"
                        value={clienteSeleccionado.localidad}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" as={Col} sm='3'>
                <Form.Label>Postal</Form.Label>
                    <Form.Control 
                        type="text"
                        name="postal"
                        placeholder="Codigo Postal"
                        value={clienteSeleccionado.postal}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                
                <Form.Group className="mb-3" as={Col} sm='3'>
                <Form.Label>Numero de Telefono</Form.Label>
                    <Form.Control 
                        type="number"
                        name="telefono"
                        placeholder="Telefono"
                        value={clienteSeleccionado.telefono}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" as={Col}sm="3">
                <Form.Label>Elija Categoria de IVA</Form.Label>
                     <Form.Select name="categoria_iva" value={clienteSeleccionado.categoria_iva} onChange={handleChange}>
                      <option >Seleccione Categoria</option>
                      <option value="1"> (1) Monotributista</option>
                      <option value="2">(2) Responsable Inscripto (RI)</option>
                      <option value="3"> (3) Exento</option>
                      <option value="4"> (4) Consumidor Final</option>
                      
                    </Form.Select>
                </Form.Group>
                </Row>
                <Row>
                <Form.Group className="mb-3" as={Col} sm="3">
                <Form.Label>Numero de Cuit</Form.Label>
                    <Form.Control 
                        type="number"
                        name="cuit"
                        placeholder="Cuit"
                        value={clienteSeleccionado.cuit}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                
                <Form.Group className="mb-3" as={Col}sm="3">
                <Form.Label>Elija Provincia</Form.Label>
                     <Form.Select name="provincia" value={clienteSeleccionado.provincia} onChange={handleChange}>
                      <option >Seleccione Provincia </option>
                      <option value="1"> (1)</option>
                      <option value="2">(2)</option>
                      <option value="3"> (3)</option>
                      <option value="4"> (4) </option>
                      
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" as={Col}sm="3">
                <Form.Label>Categoria Ingr. Brutos</Form.Label>
                     <Form.Select name="categoria_ingresos_brutos" value={clienteSeleccionado.categoria_ingresos_bruto} onChange={handleChange}>
                      <option >Seleccione Categoria </option>
                      <option value="1"> (1)</option>
                      <option value="2">(2)</option>
                      <option value="3"> (3)</option>
                      <option value="4"> (4) </option>
                      
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" as={Col} sm="3">
                <Form.Label>Inscripcion Ingr. Brutos</Form.Label>
                    <Form.Control 
                        type="number"
                        name="inscripcion_ingresos_brutos"
                        placeholder="Numero Inscripcion"
                        value={clienteSeleccionado.inscripcion_ingresos_brutos}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                </Row>
                <Modal.Footer>
          <Button variant="success" onClick={()=>cargarCliente()}>
            Guardar
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
        </Modal.Footer>

        </Form>
        </Modal.Body>
        
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
          fixedHeaderScrollHeight="550px"
          highlightOnHover
          subHeader
          subHeaderAlign="left"
          subHeaderComponent={
            <SearchIt
              onChange={e => setFiltro(e.target.value)}
              value={filtro}
            />
          }
          onRowClicked={onRowClicked}
        />
      </div>
      </>
     
  );
}
export default Datatable;