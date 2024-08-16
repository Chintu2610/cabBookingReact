import React from "react";
import { useState } from "react";
import { useContext } from "react";
let userDetailsContext=React.createContext(null);
export function VideoComponent()
{
    const context=useContext(userDetailsContext);
    return(
        <div>
            <h2>Video Component - {context.userName}</h2>
        </div>
    )
}

export function Home()
{
    const context=useContext(userDetailsContext);
    return(
        <div>
            <h2>Home Component - {context.userName}</h2>
            <VideoComponent/>
        </div>
    )
}
export function ContextDemo()
{
    var [username,setUsername]=useState();
    function handleOnchange(e)
    {
        setUsername(e.target.value);
    }
    return(
        <userDetailsContext.Provider value={{userName:username}}>
            Name:<input type="text" onChange={handleOnchange}/>
            <div className="container-fluid">
                <h2>Parent Demo</h2>
                <Home/>
            </div>
        </userDetailsContext.Provider>
    )
}
export default ContextDemo;