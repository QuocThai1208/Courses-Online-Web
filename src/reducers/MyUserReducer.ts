export const initialUserState = null

export function MyUserReducer(state: any, action: any) {
    switch (action.type) {
        case 'update':
        case 'login':
            return action.payload
        case 'logout':
            localStorage.removeItem('token')
            return null
        default:
            return state

    }
}
