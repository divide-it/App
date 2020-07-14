import React from 'react';

function myFunc() {
    alert("HI");
}

function Login() {
    return (
        <div>
            <table>
                <tbody>
                    <tr><td>Email:</td></tr>
                    <tr><td><input type="email"/></td></tr>
                    <tr><td>Senha:</td></tr>
                    <tr><td><input type="passwd"/></td></tr>
                    <tr>
                        <td>
                            <button onClick={myFunc}>Entrar</button>
                            <button onClick={myFunc}>Cadastrar</button>
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
                    <tr><td>Email:</td></tr>
                    <tr><td><input type="email"/></td></tr>
                    <tr><td>Senha:</td></tr>
                    <tr><td><input type="passwd"/></td></tr>
                    <tr><td>Confirmar Senha:</td></tr>
                    <tr><td><input type="passwd"/></td></tr>
                    <tr>
                        <td>
                            <button onClick={myFunc}>Cadastrar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export {
    Login,
    SingUp,
}
