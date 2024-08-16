import { useReducer } from "react";

let initialcount={count:0};


function reducer(state,action)
{
    switch(action.type)
    {
        case "join":
            return {count:state.count+1}
        case "exit":
            return {count:state.count-1}
        default:
            return state;
    }
}
export function ReducerDemo()
{
    const [state,dispatch]=useReducer(reducer,initialcount);
        function handleJoinClick()
        {
            dispatch({type:'join'});
        }
        function handleExitClick()
        {
            dispatch({type:'exit'});
        }
        return(
    <div className="container-fluid">
        <h3>video streaming</h3>
        <div className="bg-primary text-white p-4 w-25">
            buffering video...
        </div>
        <div className="mt-4 md-4">
            Live count:{state.count} viewing
        </div>
        <div className="mt-4">
            <button onClick={handleJoinClick}>Join</button>
            <button onClick={handleExitClick}>Exit</button>
        </div>
    </div>
        );
}
export default ReducerDemo;