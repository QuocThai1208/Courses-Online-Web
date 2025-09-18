'use client'

import React, { useReducer } from 'react'
import { initialUserState, MyUserReducer } from '../reducers/MyUserReducer'
import { MyDispatchContext, MyUserContext } from '../context/userContext'

export default function ClientProvider({ children }: React.PropsWithChildren) {
    const [state, dispatch] = useReducer(MyUserReducer, initialUserState)

    return (
        <MyUserContext.Provider value={state}>
            <MyDispatchContext.Provider value={dispatch}>
                {children}
            </MyDispatchContext.Provider>
        </MyUserContext.Provider>
    )
}
