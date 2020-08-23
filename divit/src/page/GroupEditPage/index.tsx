import React from 'react';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import { Group } from '../../model/Group';
import GroupCard from '../../component/GroupCard';

import ItemCard, { DivisionItem } from '../../component/ItemCard';

import './index.css';
import data from './data.json';

type DivisionItemList = {
    items: DivisionItem[]
}

class GroupEditPageContainer extends React.PureComponent<DivisionItemList, {}> {
    render() {
        const { items } = this.props;

        const total = items.map(i => i.value).reduce((a, b) => a + b);
        const yours = 90.00;
        return (
            <div>
                <div className="group-edit-container">
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

export default function GroupEditPage() {
    const items: DivisionItem[] = data;
    return <GroupEditPageContainer items={items} />
}