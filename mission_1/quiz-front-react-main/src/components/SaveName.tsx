import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ParticipationStorage from "../services/ParticipationStorage";

function SaveName() {
    const navigate = useNavigate();
    const [playerName, setPlayerName] = useState("");
    const [error, setError] = useState(false);

    const handleClick = () => {
        if (playerName === ""){
            setError(true);
        }
        else {
            ParticipationStorage.savePlayerName(playerName);
            navigate("/quiz");
        }
    }
    const handleOnChange = (event:any) => {
        setError(false);
        setPlayerName(event.target.value);
    }
    return (
        <div className="mt-[90%] lg:mt-[20%] flex flex-col justify-center items-centers">
            <div className={`flex items-center border-b py-2 px-2 ${error?"border-red-500":"border-teal-500"} `}>
                <input value={playerName} onChange={handleOnChange} className="appearance-none bg-transparent border-none w-full text-white-700 text-xl mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Edward Elric" aria-label="Full name" required />           
                <button onClick={handleClick} className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 border-4 text-sm text-white py-1 px-2 rounded" type="button">
                    Commencer
                </button>      
            </div>
            {
                error &&
                <div className="text-red-500 flex justify-center items-center">
                    Le nom d'utilisateur ne peut être vide 
                </div>
            }
        </div>
    )
}

export default SaveName;