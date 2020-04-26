import React from 'react';
import { Link } from 'react-router-dom';

const Splash = (): JSX.Element => (
    <section className="hero is-info is-fullheight">
        <div className="hero-body">
            <div className="container">
                <h1 className="title">bem vindo</h1>
                <h2 className="subtitle">à melhor solução de divisão de pagamentos</h2>
                <Link to="/home" className="button">
                    Checkout the full demo
                </Link>
            </div>
        </div>
    </section>
);

export default Splash;
