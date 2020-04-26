import React, { Props } from 'react';
import { Redirect } from 'react-router-dom';

export default class Logout extends React.Component<{}, { logout: boolean }> {
    onLogoutRedirectUrl = '/login';

    constructor(props: Props<any>) {
        super(props);
        this.state = {
            logout: false,
        };
    }

    componentDidMount() {
        this.setState({
            logout: true,
        });
    }

    render() {
        const { logout } = this.state;
        if (logout) {
            return <Redirect to={this.onLogoutRedirectUrl} />;
        }
        return null;
    }
}
