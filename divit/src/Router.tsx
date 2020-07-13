import React from 'react';
import {
    BrowserRouter,
    Switch,
    Route,
} from "react-router-dom";

import App from './App';
import GroupListPage from './page/GroupListPage';

export default function Router() {
    return (
        <BrowserRouter>
            <Switch>
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