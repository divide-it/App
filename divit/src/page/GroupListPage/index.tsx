import React from 'react';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import { Group } from '../../model/Group';
import GroupCard from '../../component/GroupCard';

import './index.css';

const QUERY = gql`
    query {
        groups: core_DivisionGroup {
            id
            title
        }
    }
`;

type GroupPageProps = {
    groups: Group[];
};

class GroupListPageContainer extends React.PureComponent<GroupPageProps, {}> {
    render() {
        const { groups } = this.props;

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="/">
                        Div-it
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" href="/groups">
                                    Meus Grupos
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/groups/add">
                                    Criar Grupo
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="group-list-container">
                    {groups.map((g) => {
                        return (
                            <Link to={`/groups/${g.id}/edit`} style={{ width: '47%', textDecoration: 'none' }}>
                                <GroupCard key={g.id} group={g} />
                            </Link>
                        );
                    })}
                </div>
                <div className="group-list-add">
                    <Link to="/groups/add" style={{ textDecoration: 'none' }}>
                        <div className="group-list-add-button">+</div>
                    </Link>
                </div>
            </div>
        );
    }
}

export default function GroupListPage() {
    const { loading, error, data } = useQuery(QUERY);

    if (loading || error) {
        return <div />;
    }

    return <GroupListPageContainer groups={data.groups} />;
}
