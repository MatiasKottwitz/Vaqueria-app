import React,{useState,useEffect, useContext }from "react";

import DataTable from "react-data-table-component";

import {Container} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, NavLink } from "react-router-dom";
import ModalCliente from "../views/ModalCliente";
import { DataContext,DatoContext } from "../context/Context";

import '../styles/styles.css'
//-------------------------------------------------- Funcion buscar.lala 
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
    const {data} = useContext(DataContext);//datos provenientes del context.
    const {dato,setDato} = useContext(DatoContext);    
    const [filtro, setFiltro] = useState('');
    const [estadoEditar, setEstadoEditar]= useState(false);
    const [estadoNuevo, setEstadoNuevo]= useState(false);  
    const paginacionOpciones={
      rowsPerPageText: 'Filas por Pagina',
      rangeSeparatorText: 'de',
      selectAllRowsItem: true,
      selectAllRowsText:'Todos'
    };
    
    
    const seleccionarDato=(celda)=>{
      setDato(celda);
      console.log(dato.razon_social);
    
    }
    //Funcion Utilizada para capurar datos de los input.
    const handleChange=e=>{
        const {name, value}=e.target;
        setDato(prevState=>({
            ...prevState,
            [name]:value
        }));
        console.log(dato);
    }
    
  
    const resetEstados=()=>{
      setEstadoNuevo(false);
      setEstadoEditar(false);
    }

    const HandleButtonClick = (row) => {
        seleccionarDato(row);
        //console.log(row);
        setEstadoEditar(true);
        
        //llamar al modal con los datos de la fila seleccionada..
    }
    
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
          cell: (row) => <button className="btn btn-warning" onClick={()=>HandleButtonClick(row)}> <i class="bi bi-pencil-square"></i></button>,
          allowOverFlow:true,
          width:"100px",
          center:true

        }
      ];


  const filteredData = data.filter(item =>
    item.razon_social.toLowerCase().includes(filtro)
  );
  const action = <>
                <button type="button" class="btn btn-success" onClick={()=>setEstadoNuevo(true)}>
                    <i class="bi bi-plus-lg"></i>Nuevo Cliente
                </button>
  
                </>;

    return (
      <>
      {estadoEditar === true && <ModalCliente tipoBoton={"Editar"} resetEstados={resetEstados}/>}
      {estadoNuevo === true && <ModalCliente tipoBoton={"Nuevo"} resetEstados={resetEstados}/>}
      <div className="table-responsive">
        <Container fluid={'auto'}>
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
          fixedHeaderScrollHeight="650px"
          highlightOnHover
          subHeader
          direction="auto"
          subHeaderAlign="left"
          subHeaderComponent={
            <SearchIt
              onChange={e => setFiltro(e.target.value)}
              value={filtro}
            />
          }
        />
        </Container>
      </div>
     
      </>
     
  );
}
export default Datatable;