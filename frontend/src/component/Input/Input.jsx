// Input Component
import React, { forwardRef, useId } from 'react'
import { Container } from '../index'

function Input({ children, className = "", label, type = "text", ...props }, ref) {
    const id = useId()

    return (
        <Container>
            {label && <label htmlFor={id}>{label}</label>}

            <div className="relative w-full">
                <input
                    id={id}
                    className={` pr-3 py-2 border border-gray-300 focus:ring-blue-500 focus:ring-1 focus:ring-opacity-50 focus:outline-none ${className}`}
                    type={type}
                    ref={ref}
                    {...props}
                />

                {children && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        {children}
                    </div>
                )}
            </div>
        </Container>
    )
}

export default forwardRef(Input)
