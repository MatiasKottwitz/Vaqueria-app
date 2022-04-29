import React,{useState} from 'react'
import {Form, Row, Button, Col, InputGroup} from 'react-bootstrap'

export const NuevoCliente = () => {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
  
      setValidated(true);
    };
    return (
        
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <h3>Datos de Nuevo Cliente </h3>
        <br /> 
        <Row className="mb-3">
          <Form.Group as={Col} md="2" controlId="validationCustom01">
            <Form.Label>Razon Social</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="First name"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} sm="auto" controlId="validationCustom02">
            <Form.Label>Tipo Documento</Form.Label>
            <Form.Select>
                 <option>D.N.I</option>
                 <option>Libreta</option>
            </Form.Select>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} sm={2} controlId="validationCustom02">
            <Form.Label>Numero Documento</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Numero" 
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} sm={2} controlId="validationCustom02">
            <Form.Label>Domicilio</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Domicilio" 
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} sm={2} controlId="validationCustom02">
            <Form.Label>Localidad</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Localidad" 
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} sm={1} controlId="validationCustom02">
            <Form.Label>Cod Postal</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Codigo" 
            />
            <br />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="2" controlId="validationCustomUsername">
            <Form.Label>Telefono</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">+54</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Numero"
                aria-describedby="inputGroupPrepend"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please choose a username.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col} sm="auto" controlId="validationCustom02">
            <Form.Label>Tipo de IVA</Form.Label>
            <Form.Select>
                 <option>1 Razon Social</option>
                 <option>2 Responsable</option>
            </Form.Select>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} sm={2} controlId="validationCustom02">
            <Form.Label>Numero de Cuit</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Numero" 
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" placeholder="City" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid city.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom04">
            <Form.Label>State</Form.Label>
            <Form.Control type="text" placeholder="State" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid state.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom05">
            <Form.Label>Zip</Form.Label>
            <Form.Control type="text" placeholder="Zip" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid zip.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Form.Group className="mb-3">
          <Form.Check
            required
            label="Agree to terms and conditions"
            feedback="You must agree before submitting."
            feedbackType="invalid"
          />
        </Form.Group>
        <Button type="submit">Submit form</Button>
      </Form>
  )
}
export default NuevoCliente;
