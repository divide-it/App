import React from 'react';
import logo from './logo.svg';
import './App.css';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const QUERY = gql`
  query {
    core_User {
      id
      email
      password
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(QUERY);

  if (loading || error ) {
    return <div />;
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>
          DATA: { data.core_User[0].email }
        </p>
      </header>
    </div>
  );
}

export default App;
