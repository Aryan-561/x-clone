import React, { useEffect, useState } from "react";

function FormattingTime({timestamp=new Date(), className, isFullDetails=false}){
    const [time, setTime] = useState("")
    const [fullTimeDetails, setFullTimeDetails] = useState("")
    
    const formattingTime = (timestamp)=>{
        const then = new Date(timestamp)
        const now = new Date()
        const option = {
            day:"2-digit",
            month:"short",
            year:"numeric",
            hour:"2-digit",
            minute:"2-digit",
            hour12:true,
        }
        
        const formattedString = then.toLocaleString('en-In', option)
        
        const [formattedDate, formattedTime] = formattedString.split(', ');
        
        setFullTimeDetails(`${formattedTime}, ${formattedDate}`)

        const diffInSeconds = Math.floor((now-then)/1000)
        if(diffInSeconds<60){
            setTime("just now")
        }
        else if(diffInSeconds<3600){
            const min  = Math.floor(diffInSeconds/60)
            setTime(`${min}m`)
        }
        else if(diffInSeconds<86400){
            const hr  = Math.floor(diffInSeconds/3600)
            setTime(`${hr}h`)
        }
        else{
            setTime(formattedDate)
        }
    }
    useEffect(() => {
        formattingTime(timestamp);
      }, [timestamp]);

    return(
        <>
        <div className={`text-gray-400 text-xs sm:text-base ${className}`}>{isFullDetails?fullTimeDetails:time}</div>
        </>
    )
}

export default FormattingTime;