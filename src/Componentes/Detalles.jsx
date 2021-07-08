import React from 'react';
import { CardImg, ModalFooter, ModalBody, ModalHeader, Modal, Container, Button } from 'reactstrap';
import { listaVenta } from '../listaVenta.json';
import '../css/RegistrarModal.css';
import { Table } from 'react-bootstrap';
import MaterialTable, { MTableToolbar } from 'material-table'


function Detalles() {
    const [listaVenta, setLista] = useState([])
    const [modal, setModal] = useState(false);
    //Definimos que modal esta en falso dado que sera activado (puesto en verdadero) mediante un boton
    const toggle = (e) => {
        setModal(!modal)
    }
    //Push añade uno o mas elemento al final del array y devuelve la nueva longitud de este
    const columns = [
        { title: 'Cuota', field: 'cuota', type: 'numeric' },
        { title: 'Cliente', field: 'cliente' },
        { title: 'Fecha de Vencimiento', field: 'fecha' },
        { title: 'Estado', field: 'estado' }

    ]
    return (
        <Container className="Contenedor" >
            <Button color="primary" className="btn btn-primary" onClick={this.toggle}>Detalles </Button>
            {/* Modal de Bootstrap son unas capas ocultas DIV en el codigo web la hacemos visibles con un boton o enlace   */ }
            {
                /*Cuando se seleccione el boton y este llame a FichaProductos
                comprabara el estad de modal para mostrarlo en pantalla 
                isOpen accede al estado de elemento*/
            }
            <Modal isOpen={this.state.modal} >
                {/*Encabezado */}
                <ModalHeader>
                    {/*{this.props.titulo}*/}
                    <h3>Detalle Cliente</h3>
                </ModalHeader>
                {/*Cuerpo */}
                <ModalBody>
                    <Container className="tab">
                        <Table bordered hover responsive>
                            <MaterialTable
                                columns={columns}
                                data={listaVenta}
                                components={{
                                    Toolbar: props => (
                                        <div>
                                            <MTableToolbar {...props} />
                                            <div color="primary" style={{ padding: '0px 10px', color: '#039be5' }}>
                                            </div>
                                        </div>
                                    ),
                                }}
                                options={{
                                    actionsColumnIndex: -1,
                                    showTitle: false,
                                    search: false,
                                    filtering: true,

                                    headerStyle: {
                                        backgroundColor: '#039be5',
                                        color: '#FFF'
                                    }

                                }}

                            />
                        </Table>
                    </Container>
                </ModalBody>

                <ModalFooter className='modalFooter'>
                    <Button color="primary" onClick={(e) => toggle()}>Cerrar</Button>

                </ModalFooter>
            </Modal>

        </Container>
    );
}

export default Detalles;