"use client"

import React, { useActionState } from "react";
import { useEffect } from "react"
import { toast } from "sonner"
import { ActionFunction } from "@/utils/types"

const initialState = {
    message: "",
    error: false,
}

function FormContainer({ action, children, className }: { action: ActionFunction, children: React.ReactNode, className?: string }) {
    const [state, formAction] = useActionState(action, initialState)
    useEffect(() => {
        if (state.message) {
            if (state.error) {
                toast.error(state.message)
            } else {
                toast.success(state.message)
            }
        }
    }, [state])
    return (
        <form action={formAction} className={className}>
            {children}
        </form>
    )
}

export default FormContainer