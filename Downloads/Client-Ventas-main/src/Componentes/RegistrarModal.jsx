import React from 'react';
import { CardImg, ModalFooter, ModalBody, ModalHeader, Modal, Container, Button } from 'reactstrap';
import { listaClientes } from '../listaClientes';
import './RegistrarModal.css';


class RegistrarModal extends React.Component {
    constructor(props) {
        super(); //llamara a toda la clase que hereda

        //Para darle accion mediante el boton , tendremos que definir en contructor el metodo
        this.state = {
            modal: false,
            listaClientes,
           
        };

        //PARA PODER UTILIZAR LAS PROPS QUE RECIBE EL CONSTRUCTOR Y COMPARTIRLA EN NUESTRO METODO agregarCarrito();
        this.toggle = this.toggle.bind(this);
        
        //console.log()  dara una descripcion detallada del error
        console.log(props.props);

    }

    //Definimos que modal esta en falso dado que sera activado (puesto en verdadero) mediante un boton


    toggle() {

        this.setState(prevState => ({
            modal: !prevState.modal
        }
        ));

    }
    //Push añade uno o mas elemento al final del array y devuelve la nueva longitud de este
   


    render() {
        return (
            <Container>

                <Button color="primary"  className="btn btn-primary" onClick={this.toggle}>Registar Cliente </Button>
                {/* Modal de Bootstrap son unas capas ocultas DIV en el codigo web
            la hacemos visibles con un boton o enlace   */ }
                {
                    /*Cuando se seleccione el boton y este llame a FichaProductos
                    comprabara el estad de modal para mostrarlo en pantalla 
                    isOpen accede al estado de elemento*/
                }

                
                <Modal isOpen={this.state.modal} >
                    {/*Encabezado */}
                    <ModalHeader>
                        {/*
{this.props.titulo}
                         */}

                        <h3>Registro Cliente</h3>
                        
                    </ModalHeader>

                    {/*Cuerpo */}
                    <ModalBody>
                    <form>
                

                <div clasame="form-group">
                    <label>Nombre o razon social</label>
                    <input type="text" className="form-control" placeholder="Nombre o razon social" />
                </div>

                <div className="form-group">
                    <label>Ruc</label>
                    <input type="text" className="form-control" placeholder="Ruc" />
                </div>

                <div className="form-group">
                    <label>Telefono</label>
                    <input type="email" className="form-control" placeholder="Telefono" />
                </div>

                <div className="form-group">
                    <label>Correo</label>
                    <input type="email" className="form-control" placeholder="Correo" />
                </div>
                <div className="form-group">
                    <label>Direccion</label>
                    <input type="email" className="form-control" placeholder="Direccion " />
                </div>

                

            </form>
                    </ModalBody>

                    {/*Pie de pagina */}
                    <ModalFooter className='modalFooter'>
                        <Button color="primary" >Registrar</Button>
                        <Button color="primary" onClick={this.toggle}>Volver atras</Button>

                    </ModalFooter>
                </Modal>

            </Container>


        );
    }
}

    export default RegistrarModal;
