import React, { useRef, useCallback, useMemo, useState } from 'react';
import gql from 'graphql-tag';

import './index.css';
import { GroupMember } from '../../model/GroupMember';
import { MemberItem } from '../../component/MemberItem';
import { useMutation } from '@apollo/react-hooks';
import { Route } from 'react-router-dom';
import { userInfo } from 'os';

const CREATE_GROUP = gql`
    mutation($date: String!, $description: String, $owner: Int!, $title: String) {
        insert_core_DivisionGroup(
            objects: { creationDate: $date, description: $description, ownerId: $owner, title: $title }
        ) {
            returning {
                id
            }
        }
    }
`;

const CREATE_DIVISION_INVITE = gql`
    mutation($divisionGroup: Int!, $invitedUser: Int!) {
        insert_core_DivisionInvite(objects: { divisionGroup: $divisionGroup, invitedUser: $invitedUser }) {
            returning {
                invitedUser
            }
        }
    }
`;

const Constants = {
    CrateGroup: 'Create Group',
    AddMember: 'Add a new member',
    GroupCreated: 'Group Created',
};
interface GroupMemberItemProps extends GroupMember {
    onMinusPress: (id: number) => void;
    onEmailChanged: (email: string, id: number) => void;
    onUserMailUpdated: (id: number, userId: number) => void;
}

const GroupMemberItem = ({
    id,
    email,
    onMinusPress,
    onEmailChanged,
    onUserMailUpdated,
}: GroupMemberItemProps): JSX.Element => {
    const onItemRemoved = useCallback(() => onMinusPress(id), [id, onMinusPress]);
    return (
        <MemberItem
            email={email}
            id={id}
            onMinusPress={onItemRemoved}
            onEmailChanged={onEmailChanged}
            onEmailUserUpdate={onUserMailUpdated}
        />
    );
};

export const GroupCreationpage = (): JSX.Element => {
    const [members, setMembers] = useState<GroupMember[]>([]);
    const [title, setTitle] = useState('');
    const groupCreated = useRef(false);

    const onTitleChange = useCallback((e: React.FormEvent<HTMLTextAreaElement>) => {
        setTitle(e.currentTarget.value);
    }, []);

    const [createGroup, groupId] = useMutation(CREATE_GROUP);
    const [createUserInvite] = useMutation(CREATE_DIVISION_INVITE);

    const addMember = useCallback(() => {
        const newMember: GroupMember = { id: members.length, email: '' };
        setMembers([...members, newMember]);
    }, [members]);
    const removeMember = useCallback(
        (groupId: number) => {
            const newMembers = [...members];
            newMembers.splice(groupId);
            setMembers(newMembers);
        },
        [members],
    );

    const updateMemberId = useCallback(
        (id: number, userId: number) => {
            const newMembers = [...members];
            newMembers[id].userId = userId;
            setMembers(newMembers);
        },
        [members],
    );

    const setUserMail = useCallback(
        (email: string, id: number) => {
            const newMembers = [...members];
            newMembers[id].email = email;
            setMembers(newMembers);
        },
        [members, setMembers],
    );
    const items = useMemo(() => {
        return members.map((item) => {
            const { email, id } = item;
            return (
                <GroupMemberItem
                    onMinusPress={removeMember}
                    id={id}
                    email={email}
                    onEmailChanged={setUserMail}
                    onUserMailUpdated={updateMemberId}
                />
            );
        });
    }, [removeMember, setUserMail, members, updateMemberId]);

    const createDivisionGroup = useCallback(() => {
        /*TODO retrieve login from owner id*/
        /*TODO add now date*/
        createGroup({ variables: { date: '2015/05/04', title, owner: 1 } });
    }, [createGroup]);

    const createDivisionMembers = useCallback(() => {
        members.forEach((member) => {
            if (member.id && groupId?.data) {
                createUserInvite({ variables: { divisionGroup: groupId.data, invitedUser: member.userId } });
            }
        });
    }, [createUserInvite, groupId, members]);

    const createGroupCallback = useCallback(() => {
        createDivisionGroup();
        // createDivisionMembers();
        groupCreated.current = true;
    }, [createDivisionGroup, createDivisionMembers]);

    if (groupCreated.current) {
        return <h2>{Constants.GroupCreated}</h2>;
    }

    return (
        <div>
            <textarea onChange={onTitleChange} />
            <div>
                {items.map((item, index) => (
                    <div key={index}>{item}</div>
                ))}
            </div>
            <button onClick={addMember}>{Constants.AddMember}</button>
            <button onClick={createGroupCallback}>{Constants.CrateGroup}</button>
        </div>
    );
};
