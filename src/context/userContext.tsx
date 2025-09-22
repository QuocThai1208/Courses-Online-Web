'use client'

import { createContext, Dispatch } from "react"

export const MyUserContext = createContext<any | null>(null)
export const MyDispatchContext = createContext<Dispatch<any> | null>(null)