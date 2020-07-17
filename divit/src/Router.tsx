import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import App from './App';
import GroupListPage from './page/GroupListPage';
import { Login, SingUp } from './Login';
import { GroupCreationpage } from './page/groupCreation';

export default function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/groups/add" component={GroupCreationpage} />
                <Route path="/groups" component={GroupListPage} />
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/singup">
                    <SingUp />
                </Route>
                <Route path="/">
                    <App />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}
