import React, { PureComponent, Props, FormEvent } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends PureComponent<{}, { open: boolean }> {
    constructor(props: Props<any>) {
        super(props);
        this.state = {
            open: false,
        };
    }

    toggleMenuBar(e: Event) {
        const { open } = this.state;
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        this.setState({
            open: !open,
        });
    }

    closeMenuBar() {
        this.setState({ open: false });
    }

    render() {
        const { open } = this.state;
        return (
            <div>
                <nav className="navbar" role="navigation" aria-label="main navigation">
                    <div className="container">
                        <div className="navbar-brand">
                            <Link to="/" className=" navbar-item">
                                <strong>DivIt</strong>
                            </Link>
                            <button
                                type="button"
                                onClick={(e: any) => this.toggleMenuBar(e)}
                                className={`navbar-burger ${open ? 'is-active' : ''}`}
                                aria-label="menu"
                                aria-expanded="false"
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    outline: 'none',
                                }}
                            >
                                <span aria-hidden="true" />
                                <span aria-hidden="true" />
                                <span aria-hidden="true" />
                            </button>
                        </div>
                        <div className={`navbar-menu ${open ? 'is-active' : ''}`}>
                            <Link className="navbar-item" to="/typescript-counter" onClick={() => this.closeMenuBar()}>
                                Counter
                            </Link>
                            <a className="navbar-item has-text-danger" onClick={() => this.closeMenuBar()}>
                                Close
                            </a>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}
