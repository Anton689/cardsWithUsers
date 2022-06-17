import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ResponseUserType, usersAPI, UsersParamsType, UsersType} from '../../API/usersAPI';
import {AppDispatch} from '../store';

type InitialStateType = {
    users: UsersType[]
    maxPublicCardPacksCount: number
    minPublicCardPacksCount: number
    page: number
    pageCount: number
    usersTotalCount: number
}

const initialState: InitialStateType = {
    users: [],
    maxPublicCardPacksCount: 0,
    minPublicCardPacksCount: 0,
    page: 0,
    pageCount: 0,
    usersTotalCount: 0
}

export const defaultUsersParams: UsersParamsType = {
    userName: '',
    min: 0,
    max: 0,
    sortUsers: '',
    page: 0,
    pageCount: 0
}

export const getUsers = createAsyncThunk<
    ResponseUserType,UsersParamsType, {dispatch: AppDispatch, rejectValue: string}
    >
('users/getUsers', async (data:UsersParamsType = defaultUsersParams, {dispatch, rejectWithValue}) => {
    try {
        const res = await usersAPI.getUsers(data)
        return res.data
    }catch (e: any) {
        return rejectWithValue(e.response.data.error)
    }
})

const slice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUsers.fulfilled, (state, action)=> {
            state.users = action.payload.users
        })
    }
})

export const UsersReducer = slice.reducer