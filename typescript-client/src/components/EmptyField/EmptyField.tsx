import React from 'react';
import {Container} from "react-bootstrap";
import './EmptyField.css'

const EmptyField = () => {
    return (
        <Container>
            <div className='beginDial'>
                <div className='beginText'>
                    Выберите с кем начать диалог
                </div>
            </div>
        </Container>
    );
};

export default EmptyField;