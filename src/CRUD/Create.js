import axios from 'axios'
import React, {useState} from 'react'
import { Container, Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'

const Create = () => {

    const history = useHistory();

    const [data, setData] = useState({razon_social: "", documento: "", domicilio:"", telefono:"", categoria_iva:""})
    
    const handleChange = ({target}) => {
        setData({
            ...data,
            [target.name]: target.value
        })
    }

    const URL = "http://localhost:5000/clientes/"

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post(URL,data);
        if (response.status === 201) {
            Swal.fire(
                'Guardado!',
                `El registro ${response.data.reference} ha sido guardado exitosamente!`,
                'success'
            )
            history.push('/show')
        }else {
            Swal.fire(
                'Error!',
                'Hubo un problema al crear el registro!',
                'error'
            )
        }
    }

    return (
        <Container>
            <h1 className="text-center">Nuevo Cliente</h1>
            <Form
                onSubmit={handleSubmit}
            >
                <Form.Group className="mb-3">
                    <Form.Control 
                        type="text"
                        name="razon_social"
                        placeholder="Razon Social"
                        value={data.razon_social}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control 
                        type="text"
                        name="documento"
                        placeholder="Documento"
                        value={data.documento}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control 
                        type="text"
                        name="domicilio"
                        placeholder="Domicilio"
                        value={data.domicilio}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control 
                        type="text"
                        name="telefono"
                        placeholder="Telefono"
                        value={data.telefono}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control 
                        type="text"
                        name="categoria_iva"
                        placeholder="Categoria IVA"
                        value={data.categoria_iva}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>



              {/*
                <Form.Group className="mb-3">
                    <select 
                        className="form-control"
                        name="trademark"
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccione una opción</option>
                        <option value="YAMAHA">YAMAHA</option>
                        <option value="SUZUKI">SUZUKI</option>
                        <option value="HONDA">HONDA</option>
                    </select>
                </Form.Group>*/}


                <button className="btn btn-success">Guardar</button>
            </Form>
        </Container>
    )
}

export default Create;
