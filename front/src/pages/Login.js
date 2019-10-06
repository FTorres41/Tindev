import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/logo.svg';
import api from '../services/api';

import './Login.css'

export default function Login ({ history }) {
    const [username, setUsername] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        const response = await api.post('/devs', {
            username
        })

        const { _id } = response.data;

        history.push(`/dev/${_id}`)
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <Link to="/">
                    <img src={logo} alt="Tindev"/>
                </Link>
                <input 
                    type="text"
                    placeholder="Digite seu usuário no Github"
                    value={username}
                    onChange={ e => setUsername(e.target.value) } />
                <button type="submit">Enviar</button>
            </form>
        </div>
    )
}