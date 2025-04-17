import React from "react";

const Media = ({media})=>{
    
    return(
        <>
            <div className="w-full  my-3 bg-black border-1 border-gray-700 rounded-2xl overflow-hidden">

                {media?.resourseType=="image"?( 
                    <img src={media.url} className="w-full h-auto object-contain max-h-[500px]" alt="" /> 
                    ):(
                     <video className="w-full h-auto object-contain max-h-[500px]"  
                     autoPlay muted controls loop playsInline src={media.url}></video>   
                    )}

            </div>
        </>
    )
}

export default Media;