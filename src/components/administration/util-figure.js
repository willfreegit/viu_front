import React from 'react';


const UtilFigure = ({name}) =>{
    return( <>
        <img src={`${process.env.PUBLIC_URL + "/figures/" + name + '.png'}`} width="20" height="15" /><figcaption>{name}</figcaption>
        </>
    )
}

export default UtilFigure;