import Container from "../Container/Container";

import React from 'react'

function X({className = "", children, image, imageAlt = " deafault image"}) {
    return (
        <Container className="w-full flex justify-center items-center">
            <img className={`${className} `} src={image} alt={imageAlt} />
            {children}
        </Container>
    )
}

export default X
