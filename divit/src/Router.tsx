import React from 'react';
import {
    BrowserRouter,
    Switch,
    Route,
} from "react-router-dom";

import App from './App';
import GroupListPage from './page/GroupListPage';
import { Login, SingUp} from './Login';

export default function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/singup">
                    <SingUp />
                </Route>
                <Route path="/groups">
                    <GroupListPage />
                </Route>
                <Route path="/">
                    <App />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}
