import React from 'react';

type DivisionItemProps = {
    item: DivisionItem
}

export type DivisionItem = {
    user: string,
    name: string,
    value: number,
}

export default class ItemCard extends React.PureComponent<DivisionItemProps> {
    render() {
        const { item: { user, name, value } } = this.props;

        return (
            <div className="item-card">
                <div className="item-card-user-photo"></div>
                <div className="item-card-tag">
                    R$ {value}        {user} adicionou o item "{name}"
                </div>
            </div>
        );
    }
}