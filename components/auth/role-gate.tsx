'use client'

interface RoleGateProps {
    children: React.ReactNode
    allowedRole: string
}

import React from 'react'
import { useCurrentRole } from '@/hooks/use-current-role'
import FormError from '@/components/form-error'

const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
    const role = useCurrentRole()

    if (role !== allowedRole) {
        return (
            <FormError message="You do not have permission to view this content!" />
        )
    }

    return <>{children}</>
}

export default RoleGate
