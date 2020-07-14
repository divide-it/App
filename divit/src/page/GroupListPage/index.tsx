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
    groups: Group[]
}

class GroupListPageContainer extends React.PureComponent<GroupPageProps, {}> {
    render() {
        const { groups } = this.props;

        return (
            <div>
                <div className="group-list-container">
                    { groups.map(g => {
                        return (
                            <GroupCard key={g.id} group={g} />
                        );
                    })}
                </div>
                <div className="group-list-add">
                    <Link to='/groups/add' style={{ textDecoration: 'none' }}>
                        <div className="group-list-add-button">+</div>
                    </Link>
                </div>
            </div>
        );
    }
}

export default function GroupListPage() {
    const { loading, error, data } = useQuery(QUERY);

    if (loading || error ) {
        return <div />;
    }

    return <GroupListPageContainer groups={data.groups} />
}
