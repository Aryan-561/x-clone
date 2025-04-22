import React from "react";

function Button({ children, floatingText, className, disabled, onBtnClick }) {
    return (
        <button
            className={`group rounded-2xl flex justify-center relative ${className}`}
            onClick={onBtnClick}
            disabled={disabled}
        >
            {children}
            {floatingText && (
                <span className="absolute bottom-[-60%] font-semibold px-1 rounded-sm text-sm text-white bg-gray-400/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {floatingText}
                </span>
            )}
        </button>
    );
}


export default Button;