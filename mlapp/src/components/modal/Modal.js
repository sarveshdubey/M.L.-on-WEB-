import { React, useState, useContext, Fragment } from 'react';

import './Modal.css';
import up from '../../Assets/up.png';
import down from '../../Assets/down.png';



const Modal = (props) => {

    const onSubmitHandler = async (e) => {
      
    }
    return (
        <Fragment>
            {props.showModal ? <div className="Backdrop" onClick={() => { props.setshowModal(false) }} ></div> : null}

            <div className="Modal"
                style={{
                    transform: props.showModal ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.showModal ? '1' : '0'
                }}>
                   <div className="Content">
                        {props.prediction === "UP" ? <img src={up} /> : null}
                        {props.prediction === "DOWN" ? <img src={down}/> : null}
                        {props.prediction === "UP" ? <p>Congrats!, the person survived. </p> : null}
                        {props.prediction === "DOWN" ? <p>Sorry!, the person didn't make it.</p> : null}
                   </div>
               
            </div>
        </Fragment>)
}

export default Modal;