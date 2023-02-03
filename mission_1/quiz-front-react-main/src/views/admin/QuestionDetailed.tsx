import Question from "../../types";
import { useEffect, useState } from "react";
import QuizApiService from "../../services/QuizApiService";
import ParticipationStorage from "../../services/ParticipationStorage";
import { useParams, useNavigate, Link } from "react-router-dom";

function QuestionDetailed() {
    const [question, setQuestion] = useState<Question | null>(null);
    const {position} = useParams() ;
    const navigate = useNavigate();
    useEffect(() => {
        if (! ParticipationStorage.checkIsValid()) navigate("/admin");

        if (position === undefined) {
            navigate("/admin/questions");
        }
        else {
            const getData = async () => {
                const response = await QuizApiService.getQuestionByPosition(position);
                console.log(response);
                if (response.status === 200){
                    setQuestion(response.data);
                }
                else {
                    navigate("/admin/questions");
                }
            }
            getData();
        }
    }, [])

    const handleDelete = () => {
        const token = ParticipationStorage.getToken() as string; 
        const response = QuizApiService.deleteQuestion(position as string, token);
        navigate("/admin/questions");
    };

    
    if (question) {
        return (
            <div className="flex justify-center items-center flex-col">
                <img src={question.image} alt="Question image" className="mt-[50%] lg:mt-[10%]" />
                <div className="flex justify-center items-center flex-col">
                    <h1 className="text-xl mt-3 text-center">
                        {question.text} - {question.position}
                    </h1>
                    <div className="grid grid-cols-1 grid-flow-row  xl:grid-cols-2 mt-3">
                        {
                            question.possibleAnswers.map((answer) => (
                                <div key={answer.id} 
                                    className="hover:bg-green-500 py-2 px-1 cursor-pointer text-lg text-center"  >
                                    <p>{answer.text}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="flex justify-center items-center flex-row space-x-4">
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full" onClick={handleDelete}>
                            Supprimer la question
                        </button>
                        <Link to={`edit`}>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                                Editer la question
                            </button>
                        </Link>
                </div>
            </div>
        )
    }
    else {
        return(
            <div>Loading... </div>
        )
    }
}

export default QuestionDetailed;