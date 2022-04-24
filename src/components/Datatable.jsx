import React,{useState,useEffect }from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import { Modal, Button,Form} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { Link, NavLink } from "react-router-dom";
//-------------------------------------------------- Funcion buscar.
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
    const [filtro, setFiltro] = useState('');
    const [clienteSeleccionado, setClienteSeleccionado]=useState({
      razon_social:"",
      documento:"",
      domicilio:"",
      telefono:"",
      categoria_iva:"",
      cuit:""
      
    })
    
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
          cell: (row) => < button className="btn btn-warning" onClick={()=>handleButtonClick(row)} >Editar Cliente</button>,
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
const peticionPut = async()=>{
  await axios.put(url+"/"+clienteSeleccionado.id,clienteSeleccionado)
  .then(()=>{
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
//----------------------------------------------
//-------

  const action = <>
        <button type="button" class="btn btn-success"onClick={handleShowNuevo}>
            Nuevo Cliente
        </button>
        <Link to='/NuevoCliente' class="btn btn-success">Nuevo Cliente</Link>
      </>;

    return (
      <>
      <Modal show={show}  onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Datos del Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <Form>
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
          <Button variant="success" onClick={()=>peticionPut()} >
            Guardar
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
        </Modal.Footer>
                </Form> 
        </Modal.Body>
       
      </Modal>


      <Modal show={showNuevo} fullscreen={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Nuevo Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
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
                        type="number"
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
                        type="number"
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
                        type="number"
                        name="cuit"
                        placeholder="Cuit"
                        value={clienteSeleccionado.cuit}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
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
        />
      </div>
      </>
     
  );
}
export default Datatable;