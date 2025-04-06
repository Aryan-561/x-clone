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
                    className={`pl-10 pr-3 py-2 ${className}`}
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
