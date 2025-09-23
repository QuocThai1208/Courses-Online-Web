'use client'

import React, { useReducer } from 'react'
import { initialUserState, MyUserReducer } from '../reducers/MyUserReducer'
import { MyDispatchContext, MyUserContext } from '../context/userContext'
import TokenRestore from './auth/token-restore'

export default function ClientProvider({ children }: React.PropsWithChildren) {
    const [state, dispatch] = useReducer(MyUserReducer, initialUserState)

    return (
        <MyUserContext.Provider value={state}>
            <MyDispatchContext.Provider value={dispatch}>
                <TokenRestore />
                {children}
            </MyDispatchContext.Provider>
        </MyUserContext.Provider>
    )
}
