import "bootstrap/dist/css/bootstrap.css";
import React,{useState,useEffect }from "react";
import axios from "axios";
import { Col, Row, Table } from "react-bootstrap";
import {
  DatatableWrapper,
  Filter,
  Pagination,
  PaginationOptions,
  TableBody,
  TableHeader
} from "react-bs-datatable";
//Configuracion de hooks.



/*import TABLE_BODY from "../db.json";
const prueba = TABLE_BODY;*/
// Create table headers consisting of 4 columns.
const STORY_HEADERS = [
  {
    prop: "razon_social",
    title: "Razon Social",
    isFilterable: true
  },
  {
    prop: "documento",
    title: "Documento"
  },
  {
    prop: "domicilio",
    title: "Domicilio"
  },
  {
    prop: "telefono",
    title: "Telefono"
  }
];

// Then, use it in a component.
export default function Tabla() {
  const [data, setData] = useState([]);
  const url = "http://localhost:3001/clientes/"
  useEffect(()=>{
    getData()
},[]);
  //3 - funcion para mostrar todos los datos
 
  const getData = async()=>{
     await axios.get(url)
     .then((response)=>{
         const data = response.data
         setData(data);
         console.log(data);
          
     })
 }
  return (
    <>
    <div>
      <button type="" className="btn btn-success">Agregar</button>
    </div>
    <DatatableWrapper
      body={data}
      headers={STORY_HEADERS}
      paginationOptionsProps={{
        initialState: {
          rowsPerPage: 10,
          options: [5, 10, 15, 20]
        }
      }}
    >
      <Row className="mb-4 p-2">
        <Col
          xs={12}
          lg={4}
          className="d-flex flex-col justify-content-end align-items-end"
        >
          <Filter />
        </Col>
        <Col
          xs={12}
          sm={6}
          lg={4}
          className="d-flex flex-col justify-content-lg-center align-items-center justify-content-sm-start mb-2 mb-sm-0"
        >
          <PaginationOptions />
        </Col>
        <Col
          xs={12}
          sm={6}
          lg={4}
          className="d-flex flex-col justify-content-end align-items-end"
        >
          <Pagination />
        </Col>
      </Row>
      <Table>
        <TableHeader />
        <TableBody />
      </Table>
    </DatatableWrapper>
    </>
  );
}

