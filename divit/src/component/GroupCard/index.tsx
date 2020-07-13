import React from 'react';
import { Group } from '../../model/Group';

type GroupCardProps = {
    group: Group
};

export default class GroupCard extends React.PureComponent<GroupCardProps> {
    render() {
        const { group } = this.props;
        return (
            <div className="group-card">
                <div className="group-card-title">{group.title}</div>
            </div>
        );
    }
}