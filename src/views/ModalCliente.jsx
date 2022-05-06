import React,{useState,useEffect }from "react";
import { Modal, Button, Form, Col, Row, Container,} from "react-bootstrap";

const ModalCliente = ({tipoBoton, estado}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const handleShow = () => {
        setShow(true)
      };
    /*
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
    */
   if (tipoBoton==="Editar"){
        console.log("se cargo el modal editar");
    return (
            <>
            <Button variant="btn btn-warning" onClick={handleShow}><i class="bi bi-pencil-square"></i></Button>
            
          <Modal show={show} size='xl'  onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title> Actualizar Cliente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            
            </Modal.Body>
            
          </Modal>
        </>
      )
   } else if (tipoBoton==="Nuevo"){
    console.log("se cargo el modal Nuevo");
return(<>
        <Button variant="btn btn-success" onClick={handleShow}>
            <i class="bi bi-plus-lg"></i>
                Nuevo Cliente
          </Button>
            
          <Modal show={show} size='xl'  onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title> Nuevo Cliente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            
            </Modal.Body>
            
          </Modal>
        </>
)          
   }
    
}

export default ModalCliente