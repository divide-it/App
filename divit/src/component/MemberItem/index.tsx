import React, { useCallback, useEffect } from 'react';
import { GroupMember } from '../../model/GroupMember';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

interface GroupItemProps extends GroupMember {
    onMinusPress: () => void;
    onEmailChanged: (email: string, id: number) => void;
    onEmailUserUpdate: (id: number, userId: number) => void;
}

const USER_ID_QUERY = gql`
    query($email: String!) {
        core_User(where: { email: { _eq: $email } }) {
            id
        }
    }
`;

export const MemberItem = ({
    email,
    onMinusPress,
    id,
    onEmailChanged,
    onEmailUserUpdate,
    userId,
}: GroupItemProps): JSX.Element => {
    const { loading, error, data } = useQuery(USER_ID_QUERY, {
        variables: { email },
    });

    useEffect(() => {
        if (!loading && !error && data?.core_User[0]?.id && !userId) {
            console.log(data?.core_User[0]?.id);
            onEmailUserUpdate(id, data.core_User[0].id);
        }
    }, [data, error, loading, onEmailUserUpdate]);

    const onChange = useCallback(
        (e: React.FormEvent<HTMLInputElement>) => {
            onEmailChanged(e.currentTarget.value, id);
        },
        [id, onEmailChanged],
    );
    return (
        <div>
            <span>
                <input type="text" onChange={onChange} />
                <button onClick={onMinusPress}> - </button>
            </span>
            <hr />
        </div>
    );
};
