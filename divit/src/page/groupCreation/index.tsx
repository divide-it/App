import React, { useRef, useCallback, useMemo, useState } from 'react';
import gql from 'graphql-tag';

import './index.css';
import { GroupMember } from '../../model/GroupMember';
import { MemberItem } from '../../component/MemberItem';
import { useMutation } from '@apollo/react-hooks';
import { useLocation } from 'react-router-dom';
import { useMonitorUserInvite } from '../../hooks/use-monitor-user-invite';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router';

const CREATE_GROUP = gql`
    mutation($date: date!, $description: String, $owner: bigint!, $title: String) {
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
    mutation($divisionGroup: bigint!, $invitedUser: bigint!) {
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
    userId,
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
            userId={userId}
            onMinusPress={onItemRemoved}
            onEmailChanged={onEmailChanged}
            onEmailUserUpdate={onUserMailUpdated}
        />
    );
};

export const GroupCreationpage = (): JSX.Element => {
    const location = useLocation();
    const currentUserId = typeof location.state === 'number' ? location.state : 1;
    const [members, setMembers] = useState<GroupMember[]>([]);
    const [title, setTitle] = useState('');
    const groupCreated = useRef(false);

    useMonitorUserInvite(currentUserId as number);

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
                    userId={item.userId}
                />
            );
        });
    }, [removeMember, setUserMail, members, updateMemberId]);

    const createDivisionMembers = useCallback(
        (id: number) => {
            members.forEach((member) => {
                console.log('member', member);
                if (member.userId) {
                    console.log('ID', id);
                    createUserInvite({ variables: { divisionGroup: id, invitedUser: member.userId } });
                }
            });
        },
        [createUserInvite, groupId, members],
    );

    const createDivisionGroup = useCallback(() => {
        /*TODO retrieve login from owner id*/
        createGroup({ variables: { date: new Date().toISOString(), title, owner: currentUserId } }).then((id) => {
            createDivisionMembers(id.data?.insert_core_DivisionGroup?.returning[0]?.id);
        });
    }, [createGroup, createDivisionMembers]);

    const createGroupCallback = useCallback(() => {
        createDivisionGroup();
        groupCreated.current = true;
    }, [createDivisionGroup, createDivisionMembers]);

    const history = useHistory();
    const navigateToGroupList = useCallback(() => {
        history.push({
            pathname: '/groups',
        });
    }, []);

    if (groupCreated.current) {
        navigateToGroupList();
    }

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
            <div
                className="section-1-container section-container form-group"
                style={{ marginLeft: '45%', marginTop: '5%' }}
            >
                <textarea onChange={onTitleChange} placeholder="Descrição do grupo" />
                <div>
                    {items.map((item, index) => (
                        <div key={index}>{item}</div>
                    ))}
                </div>
                <div style={{ marginLeft: '-40px', marginTop: '20px' }}>
                    <Button onClick={addMember} style={{ marginRight: '10px' }}>
                        {Constants.AddMember}
                    </Button>
                    <Button type="submit" onClick={createGroupCallback}>
                        {Constants.CrateGroup}
                    </Button>
                </div>
            </div>
        </div>
    );
};
