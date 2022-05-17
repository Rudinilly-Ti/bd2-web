import React, { useState } from 'react';
import './Login.css'

import api from '../services/api';

export default function Login({ history }) {
    const [username, setUsername] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        try {

            const response = await api.post(`/devs`, {
                username,
            });

            const { _id } = response.data;

            history.push(`/dev/${_id}`);
            console.log(response)
        } catch (error) {
            alert("Usuário não encontrado")
        }
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <h1 className="Logo">Tindev</h1>
                <input
                    placeholder="Digite seu usuário do Github"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <button type="submit">Enviar</button>
            </form>
        </div>
    );

}
