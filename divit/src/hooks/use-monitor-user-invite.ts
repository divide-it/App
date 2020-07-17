import gql from 'graphql-tag';
import React, { useEffect, useRef } from 'react';
import { useSubscription } from '@apollo/react-hooks';

const MONITOR_USER_SUBSCRIPTION = gql`
    subscription($userId: bigint!) {
        core_DivisionInvite(where: { invitedUser: { _eq: $userId } }) {
            divisionGroup
        }
    }
`;

const Constants = {
    notificationLabel: 'você foi convidado para um nova divisão',
};

export const useMonitorUserInvite = (id: number) => {
    const divisionRegisters = useRef<number | null>(null);
    const { data, loading, error } = useSubscription(MONITOR_USER_SUBSCRIPTION, {
        variables: { userId: id },
    });
    useEffect(() => {
        console.log(error);
        if (!loading && !error && id) {
            alert(data);
            const newRegisters = data?.core_DivisionInvite.length;
            if (!divisionRegisters.current) {
                divisionRegisters.current = newRegisters;
            } else {
                if (newRegisters > divisionRegisters.current) {
                    alert(Constants.notificationLabel);
                }
            }
        }
    }, [id, loading, error, data]);
};
