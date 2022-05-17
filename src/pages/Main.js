import React, { useEffect, useState } from 'react';
import { MdFavoriteBorder, MdClose } from 'react-icons/md'

import { Link } from 'react-router-dom';

import api from '../services/api';

import './Main.css'

export default function Main({ match, history }) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function loadUsers() {
            const response = await api.get('/devs', {
                headers: { user: match.params.id },
            });

            setUsers(response.data);
        }

        loadUsers();

    }, [match.params.id]);

    async function handleLike(id) {
        await api.post(`/devs/${id}/likes`, null, {
            headers: { user: match.params.id }
        });

        setUsers(users.filter(user => user._id !== id))
    }

    async function handleDislike(id) {
        await api.post(`/devs/${id}/dislikes`, null, {
            headers: { user: match.params.id }
        });

        setUsers(users.filter(user => user._id !== id))
    }

    async function handleDelete() {
        await api.delete(`/devs/delete`, null, {
            headers: { user: match.params.id }
        });

        history.push("/");
    }

    return (
        <div className="main-container">
            <Link to="/">
                <h1 className="Logo">Tindev</h1>
            </Link>
            {
                users.length > 0 ? (
                    <ul>{users.map(user => (
                        <li key={user._id}>
                            <img src={user.avatar} alt={user.name} />
                            <footer>
                                <strong>{user.name}</strong>
                                <p>{user.bio}</p>
                            </footer>
                            <div className="buttons">
                                <button type="button" alt="like" onClick={() => handleLike(user._id)}><MdFavoriteBorder /></button>
                                <button type="button" alt="dislike" onClick={() => handleDislike(user._id)}><MdClose /></button>
                            </div>
                        </li>
                    ))}  </ul>
                ) : (<div className="empty"> Acabou :( </div>)
            }
            <button className='delButton' onClick={() => handleDelete()}>Deletar conta</button>
        </div>
    )
}