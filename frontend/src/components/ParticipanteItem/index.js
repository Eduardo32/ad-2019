import React from 'react';

import './styles.css'

function ParticipanteItem(props) {
    const { participante, onEdit, onDelete, sorteiRealizado } = props;
    
    function handleEdit(participante) {
        onEdit(participante);
    }

    function handleDelete(id) {
        onDelete(id);
    }

    return (
        <li className="participante-item">
            <h1>Participante: {participante.nome}</h1>
            <h2>Email: {participante.email}</h2>
            <h3>Amigo: {participante.amigo}</h3>
            <button className="editar" onClick={() => handleEdit(participante)} disabled={sorteiRealizado} >Editar</button>
            <button className="excluir" onClick={() => handleDelete(participante._id)} disabled={sorteiRealizado} >Excluir</button>
        </li>
    )
}

export default ParticipanteItem;