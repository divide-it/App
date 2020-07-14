import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const QUERY = gql`
        query {
            core_User {
                id
                email
                password
            }
        }
    `;
    const { loading, error, data } = useQuery(QUERY);

    function myFunc(user: any, pass: any, dat: any) {
        for (let i = 0; i < dat.core_User.length; i++) {
            if (user == dat.core_User[i].email && pass == dat.core_User[i].password) {
                alert('Login realizado com sucesso!');
                return <div />;
            }
        }
        alert('Login falhou!');
    }

    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <td>Email:</td>
                    </tr>
                    <tr>
                        <td>
                            <input type="email" onChange={(event) => setUsername(event.target.value)} />
                        </td>
                    </tr>
                    <tr>
                        <td>Senha:</td>
                    </tr>
                    <tr>
                        <td>
                            <input type="passwd" onChange={(event) => setPassword(event.target.value)} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button onClick={() => myFunc(username, password, data)}>Entrar</button>
                            <button onClick={() => myFunc(username, password, data)}>Cadastrar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

function SingUp() {
    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <td>Email:</td>
                    </tr>
                    <tr>
                        <td>
                            <input type="email" />
                        </td>
                    </tr>
                    <tr>
                        <td>Senha:</td>
                    </tr>
                    <tr>
                        <td>
                            <input type="passwd" />
                        </td>
                    </tr>
                    <tr>
                        <td>Confirmar Senha:</td>
                    </tr>
                    <tr>
                        <td>
                            <input type="passwd" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button>Cadastrar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export { Login, SingUp };
