import { Alert } from 'reactstrap';
import React from 'react';

const Messege = (props) => {

    var rows = [];

    for (let index in props.messeges) {

        rows.push(<Alert key={index} color={props.color}>{props.messeges[index]}</Alert >);
    }

    return rows



}

export default Messege