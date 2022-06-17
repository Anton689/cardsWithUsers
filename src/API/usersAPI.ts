import {instance} from './instance';


export const usersAPI = {
    getUsers(params?: Partial<UsersParamsType>) {
        return instance.get<ResponseUserType>('social/users',{params})
    }
}

export type UsersParamsType = {
    userName: string
    min: number
    max: number
    sortUsers: string
    page: number
    pageCount: number
}


export type ResponseUserType = {
    users: UsersType[]
    maxPublicCardPacksCount: number
    minPublicCardPacksCount: number
    page: number
    pageCount: number
    usersTotalCount: number
}

export type UsersType = {
    avatar: string
    created: string
    email: string
    isAdmin: boolean
    name: string
    publicCardPacksCount: number
    updated: string
    verified: boolean
    _id: string
}
