import { UserEntity } from '../models/user.entity'

const USERS_DB: UserEntity[] = [
    {
        id: '12345',
    },
	{
        id: '67890',
    },
]

export function ifUserExists(id: string): boolean {
    return USERS_DB.some((user) => user.id === id)
}
