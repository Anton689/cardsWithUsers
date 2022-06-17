import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {selectUsers} from '../../store/selectors/Selectors';
import {useAppDispatch} from '../../Hooks/hooks';
import {defaultUsersParams, getUsers} from '../../store/reducers/s13_UsersReducer';

export const Users = () => {
    const dispatch = useAppDispatch()

    useEffect(()=> {
        dispatch(getUsers(defaultUsersParams))
    }, [])

    const users = useSelector(selectUsers);

    return (
        <div>
            {
                users.map(u => <div>{u.name}</div>)
            }
        </div>
    );
};