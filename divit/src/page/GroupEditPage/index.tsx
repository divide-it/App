import React from 'react';
import gql from 'graphql-tag';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import { Group } from '../../model/Group';
import GroupCard from '../../component/GroupCard';

import ItemCard, { DivisionItem } from '../../component/ItemCard';

import './index.css';
import dataJSON from './data.json';

const getQuery = (id: string) => {
    return gql`
        query {
            group: core_DivisionGroup (
            where: { id: {_eq: ${id} } }
            ) {
            id,
            title,
            description
            }
        }
    `;
}

type DivisionItemList = {
    title: string,
    items: DivisionItem[]
}

class GroupEditPageContainer extends React.PureComponent<DivisionItemList, {}> {
    render() {
        const { items, title } = this.props;

        const total = items.map(i => i.value).reduce((a, b) => a + b);
        const yours = 90.00;
        return (
            <div>
                <div className="group-edit-container">
                    <div className="group-edit-name">{title}</div>
                    { items.map((g, i) => {
                        return (
                            <ItemCard key={i} item={g} />
                        );
                    })}
                </div>
                <div className="group-edit-info">
                    <div className="group-edit-total">
                        <div className="group-edit-title">Total de gastos</div>
                        <div className="group-edit-value-total">R$ {total}</div>
                    </div>
                    <div className="group-edit-total">
                        <div className="group-edit-title">Sua contribuição</div>
                        <div className="group-edit-value-total">R$ {yours}</div>
                    </div>
                </div>
            </div>
        );
    }
}

type TParams =  { id: string };
export default function GroupEditPage({ match }: RouteComponentProps<TParams>) {
    const items: DivisionItem[] = dataJSON;
    const { loading, error, data } = useQuery(getQuery(match.params.id));

    if (loading || error ) {
        return <div />;
    }

    console.log(data)
    return <GroupEditPageContainer title={data.group[0].title} items={items} />
}