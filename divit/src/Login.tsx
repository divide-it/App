import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { NavLink } from 'react-router-dom';


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
                            <input type="password" onChange={(event) => setPassword(event.target.value)} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button onClick={() => myFunc(username, password, data)}>Entrar</button>
                            <NavLink to="/singup"> Cadastrar </NavLink>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

function SingUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password_again, setPasswordAgain] = useState('');

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

    const INSERT = gql`
        mutation addUser($email: String!, $password: String!) {
          insert_core_User(objects: {email:$email,
            password:$password}) {
            returning {
              id
            }
          }
        }
    `;
    const [addNewUser] = useMutation(INSERT, {
        refetchQueries: mutationResult => [{query: QUERY}]
    });

    function myFunc(user: any, pass: any, pass_again: any, dat: any, addN: any) {
        let motivo = '';
        let falhou = false;

        if (pass != pass_again) {
            falhou = true;
            motivo = 'Senhas divergem';
        }

        if (!falhou) {
            for (let i = 0; i < dat.core_User.length; i++) {
                if (user == dat.core_User[i].email) {
                    falhou = true;
                    motivo = 'Email em uso';
                    break;
                }
            }
        }

        if (falhou) {
            alert('SingUp falhou!' + motivo);
        } else {
            alert('SingUp com Sucesso');
            addN({variables : {email:user, password:pass} });
        }
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
                            <input type="password" onChange={(event) => setPassword(event.target.value)} />
                        </td>
                    </tr>
                    <tr>
                        <td>Confirmar Senha:</td>
                    </tr>
                    <tr>
                        <td>
                            <input type="password" onChange={(event) => setPasswordAgain(event.target.value)} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button onClick={() => myFunc(username, password, password_again, data, addNewUser)}>Cadastrar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export { Login, SingUp };
