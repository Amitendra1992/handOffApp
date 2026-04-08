import { useEffect, useState } from "react";
import HandOffContext from "../utils/HandOffContext"

const HandoffProvider = ({children}) => {

    // Load from localStorage on initial render
    const [handoffs, setHandoffs] = useState(() => {
        const saved = localStorage.getItem("handoffs");
        if(saved){
            return JSON.parse(saved);
        }
        else{
            return [];
        }
    });

    // Save to localStorage whenever handoffs change

    useEffect(()=>{
        localStorage.setItem('handoffs', JSON.stringify(handoffs))
    }, [handoffs])

    function addHandOff(newHandOff){
        setHandoffs([...handoffs, newHandOff])
    }

    function updateHandOffStatus(id, newStatus){
        setHandoffs(handoffs.map((handOff) => {
            return handOff.id === id ? {...handOff, status: newStatus, updatedAt: new Date().toISOString()} : handOff;
        }));
    }

    function updateHandOff(id, updatedData){
        setHandoffs(handoffs.map((handOff) => {
            return handOff.id === id 
                    ? {...handOff, ...updatedData, updatedAt: new Date().toISOString()}
                    : handOff
        }));
    }

    function adComments(id, comment){
        setHandoffs(handoffs.map((handOff) => {
            return handOff.id === id 
                    ?
                    {...handOff, 
                        comments: [...(handOff.comments || []), { //comments is an array of objects {id: 123, comment: "New update", timestamp: 34131}. We are adding a new comment object everytime a comment is being added by user
                            id: Date.now().toString(),
                            text: comment,
                            timestamp: new Date().toISOString()
                        }],
                        updatedAt: new Date().toISOString()
                    }
                    : handOff
        }));
    }

    return(
        <div>
            <HandOffContext.Provider value={
                {handoffs, 
                addHandOff, 
                updateHandOffStatus,
                updateHandOff,
                adComments,
                }}>
                    {children}
            </HandOffContext.Provider>
        </div>
    )
}

export default HandoffProvider;