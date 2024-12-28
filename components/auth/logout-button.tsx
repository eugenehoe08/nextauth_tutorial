'use client'

import { logout } from '@/actions/logout'

interface LogoutButtonProps {
    children?: React.ReactNode
}

import React from 'react'

const LogoutButton = ({ children }: LogoutButtonProps) => {
    const onClick = () => {
        logout()
    }

    return (
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    )
}

export default LogoutButton
