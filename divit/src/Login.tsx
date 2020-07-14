import React, { useState } from 'react';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function myFunc(user: any, pass: any) {
        alert(user + pass);
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
                            <button onClick={() => myFunc(username, password)}>Entrar</button>
                            <button onClick={() => myFunc(username, password)}>Cadastrar</button>
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
