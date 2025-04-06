import React from "react";

function Button({children, floatingText, classname, onBtnClick}){
    
    return(
        <>
            <button className={`group rounded-full flex justify-center relative ${classname}`}  onClick={onBtnClick}>
                {children}

                {floatingText &&(
                <span className="absolute top-12 font-semibold px-1 rounded-sm text-sm text-white bg-gray-400/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {floatingText}
                </span>)}
            </button>
        </>
    )
}

export default Button;