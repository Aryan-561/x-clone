import React from "react";
import {Container} from "../index"

function EventLoading(){
    return(
        <>
            <Container className="flex justify-center p-2">
                <div className="w-6 h-6 border-sky-500/25 border-4  rounded-full  border-t-sky-400 animate-spin">

                </div>
            </Container>
        </>
    )
}

export default EventLoading;