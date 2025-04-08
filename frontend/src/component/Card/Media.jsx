import React from "react";

const Media = ({media})=>{
    return(
        <>
            <div className="w-full my-3 bg-black border-1 border-gray-700 rounded-2xl overflow-hidden">

                {media?.resourseType=="image"?( 
                    <img src={media.url} alt="" /> 
                    ):(
                     <video src={media.url}></video>   
                    )}

            </div>
        </>
    )
}

export default Media;