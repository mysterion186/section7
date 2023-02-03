import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import ParticipationStorage from "../services/ParticipationStorage";    
import Question from "../types";
import QuizApiService from "../services/QuizApiService";


function Recap() {
    const [question, SetQuestion] = useState<Question[]|null>(null);

    const playerName : string = ParticipationStorage.getPlayerName() as string;
    const answersSummaries : Array<[number, string]> = ParticipationStorage.getAnswersSummaries() as Array<[number, string]>;
    const score : string = ParticipationStorage.getParticipationScore() as string;
    
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchData(){
            const response = await QuizApiService.getAllQuestions();
            SetQuestion(response.data);
            console.log(response);
            return response;
        }
        fetchData()
    }, []);
    if (question){

        return (
            <div className="flex justify-center items-center flex-col">
                <h1 className="text-center text-xl mb-16"> {playerName} : ton score pour notre quiz est de {score}  </h1> 
                {answersSummaries.map((answer : [number, string], index : number) => (
                    <div 
                        key={question !== null ? question[index].id : index} 
                        className={`mb-5 px-3 text-center border-solid border-2 rounded mx-3 
                                ${answer[1]==="true"?"border-green-700 bg-emerald-300/75":"border-red-700 bg-rose-600/75"} `}>
                            {question![index].text}
                        </div>
                    ))}
                <button 
                    className="bg-green-500 flex justify-center items-center hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick = {() => {navigate("/")}}
                >
                    Retour à la page d'accueil
                </button>
            </div>
        )   
    }
    else {
        return(
            <div>loading...</div>
        )
    }

}

export default Recap; 