import React, {useState} from 'react';
import { CardImg, ModalFooter, ModalBody, ModalHeader, Modal, Container, Button } from 'reactstrap';
import { listaVenta } from '../listaVenta.json';
import "./RegistrarModal.css"
import { Table } from 'react-bootstrap';
import MaterialTable, { MTableToolbar } from 'material-table'
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function Detalles({lista}) {
    const [listaVenta, setLista] = useState([]);
    const [modal, setModal] = useState(false);
    const [cargado, setCargado] = useState(false); 
    const api = axios.create();
    const data = lista;

    //Definimos que modal esta en falso dado que sera activado (puesto en verdadero) mediante un boton
    
    const componentDidMount = (e) => {
        if (!cargado) {
            api.get("https://localhost:44307/api/APIDETALLES_DE_PAGO").then(response => {
                setLista(response.data.filter((v) => v.FACTURAId == lista.FACTURAId));
                console.log(response.data)
                setCargado(true);
            });
        }
    }
    
    const toggle = (e) => {
        componentDidMount(); 
        setModal(!modal) 
    }
    //Push añade uno o mas elemento al final del array y devuelve la nueva longitud de este
    const columns = [
        { title: 'Cuota', field: 'numero', type: 'numeric' },
        { title: 'Cliente', field: 'PAGOSId.CLIENTEId.nombre' },
        { title: 'Fecha de Vencimiento', field: 'PAGOSId.fechaVenc' },
        { title: 'Estado', field: 'PAGOSId.estado' }

    ]

    return (
        <div >
            <Button color="primary" className="btn btn-primary" onClick={(e) => toggle()}>Detalles </Button>
            {/* Modal de Bootstrap son unas capas ocultas DIV en el codigo web la hacemos visibles con un boton o enlace   */ }
            {
                /*Cuando se seleccione el boton y este llame a FichaProductos
                comprabara el estad de modal para mostrarlo en pantalla 
                isOpen accede al estado de elemento*/
            }
            <Modal size="lg" isOpen={modal} >
                {/*Encabezado */}
                <ModalHeader>
                    {/*{this.props.titulo}*/}
                   
                </ModalHeader>
                {/*Cuerpo */}
                <ModalBody>
                    <Container className="tab">
                        <Table bordered hover responsive>
                            <MaterialTable
                                columns={columns}
                                data={listaVenta}
                                title='Detalles del Cliente'
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
                                    showTitle: true,
                                    search: true,
                                    filtering: false,

                                    headerStyle: {
                                        backgroundColor: '#039be5',
                                        color: '#FFF'
                                    }

                                }}
                                localization={{
                                    header:{
                                    actions: 'Opciones',
                                    },
                    
                                    pagination:{
                                      labelRowsSelect:'Filas',
                    
                                    },
                                    toolbar:{
                                      searchTooltip:'Buscar',
                                      searchPlaceholder:'Buscar'
                    
                    
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

        </div>
    );
}

export default Detalles;