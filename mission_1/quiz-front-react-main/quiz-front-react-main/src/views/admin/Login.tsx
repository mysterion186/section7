import { useNavigate } from "react-router-dom";
import {useEffect, useState} from "react";
import ParticipationStorage from "../../services/ParticipationStorage";
import QuizApiService from "../../services/QuizApiService";

function Login() {
    const navigate = useNavigate();
    const [playerName, setPlayerName] = useState("");
    const [errorMessage, setErrorMessage] = useState("Le mot de passe ne peut être vide");
    const [error, setError] = useState(false);

    const handleClick = async () => {
        if (playerName === ""){
            setError(true);
        }
        else {
            const response = await QuizApiService.postLogin({password : playerName});
            if (response.status === 200) {
                ParticipationStorage.saveToken(response.data.token);
                ParticipationStorage.saveDate();
                navigate("/admin/questions");
            }
            else {
                setError(true);
                setErrorMessage("Mot de passe incorrect !")
            }
        }
    }
    const handleOnChange = (event:any) => {
        setError(false);
        setPlayerName(event.target.value);
    }

    useEffect( () => {
        const validity = ParticipationStorage.checkIsValid();
        if (validity) {
            navigate("/admin/questions");
        }
    }, [])

    return (
        <div className="mt-[90%] lg:mt-[20%] flex flex-col justify-center items-centers">
            <div className={`flex items-center border-b py-2 px-2 ${error?"border-red-500":"border-teal-500"} `}>
                <input value={playerName} onChange={handleOnChange} className="appearance-none bg-transparent border-none w-full text-white-700 text-xl mr-3 py-1 px-2 leading-tight focus:outline-none" type="password" placeholder="password" aria-label="Full name" required />           
                <button onClick={handleClick} className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 border-4 text-sm text-white py-1 px-2 rounded" type="button">
                    Log in
                </button>      
            </div>
            {
                error &&
                <div className="text-red-500 flex justify-center items-center">
                     {errorMessage}
                </div>
            }
        </div>
    )
}

export default Login;