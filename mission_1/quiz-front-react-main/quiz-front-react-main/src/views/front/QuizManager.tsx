import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Question from '../../types';
import ParticipationStorage from "../../services/ParticipationStorage";
import QuizApiService from "../../services/QuizApiService";
import QuizDisplay from "../../components/QuizDisplay";
import Navbar from "../../components/Navbar";

type props = {
    question : Question, 
    total : string, 
    setParentAnswer : any
}
function QuizManager(){
    const [userAnswer, setUserAnswer] = useState<number[]>([]);
    const [question, setQuestion] = useState<Question | null>(null);
    const [currentPos, setCurrentPos] = useState<number>(1);
    const numberQuestionTotal:string = ParticipationStorage.getTotal() as string;

    const navigate = useNavigate();
    
    const endQuiz = async () => {
        const playerName:string = ParticipationStorage.getPlayerName() as string;
        const data = {
            playerName : playerName,
            answers : userAnswer
        }
        const response = await QuizApiService.postParticipation(data);
        console.log(response);
        ParticipationStorage.saveParticipationScore(response.data["score"]);
        ParticipationStorage.saveAnswersSummaries(response.data["answersSummaries"]);
    }

    const loadQuestionByPosition = async () => {
        if (currentPos <= parseInt(numberQuestionTotal)) {
            const response = await QuizApiService.getQuestionByPosition(currentPos.toString());
            if (response.status === 200) {
                setQuestion(response.data);
            }
            else {
                setCurrentPos(currentPos + 1);
            }
        }
        else{
            endQuiz();
            navigate("/recap")
            // console.log("Faut mettre fin au question mec !");
        }
    }

    useEffect(() => {
        const temp = async () => {
            await loadQuestionByPosition();
        }
        temp();
        setCurrentPos( currentPos + 1 );
    }, [userAnswer.length]);

    if (question) {
        return (
            <div className="flex justify-center items-center flex-col">
                <Navbar /> 
                <QuizDisplay 
                    question={question as Question} 
                    total={numberQuestionTotal}
                    setParentAnswer={setUserAnswer}
                    userAnswer={userAnswer}
                />
            </div>
        )
      } else {
        return <p>Loading...</p>;
      }
    
}

export default QuizManager;