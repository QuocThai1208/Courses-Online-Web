export const initialUserState = null

export function MyUserReducer(state: any, action: any) {
    switch (action.type) {
        case 'login':
            return action.payload
        case 'logout':
            return null
        default:
            return state

    }
}