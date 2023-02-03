import {useState, useEffect} from "react";
import Question from "../../types";
import QuizApiService from "../../services/QuizApiService";
import { useNavigate, Link } from "react-router-dom";

function Questions () {
    const [questions, setQuestions] = useState<Question[] | null>(null);
    const navigate = useNavigate();
    useEffect(() => {
        const getData = async () => {
            const response = await QuizApiService.getAllQuestions();
            setQuestions(response.data);
        };
        getData();
    }, []);

    if (questions){
        return (
            <div className="flex justify-center items-center flex-col">
                <div className="flex justify-center items-center flex-col lg:flex-row">
                    <button className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded-full">
                        Supprimer les participations
                    </button>
                    <button className="bg-rose-500 mt-3 lg:mt-0 lg:ml-3 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded-full">
                        Supprimer les questions
                    </button>
                </div>
                <table className="table-auto border-separate mt-16 max-h-16">
                    <thead>
                        <tr className='items-center '>
                            <th className="px-12 border-b-2 hidden lg:block">Position</th>
                            <th className="px-12 border-b-2 ">Questions</th>
                        </tr>
                    </thead>
                    <tbody className="justify-center items-center overflow-y-auto" style={{height: "5px",width: "5px"}}>
                        {questions!.map((item, index) => (
                            <tr key={index} className="hover:bg-green-400 items-center cursor-pointer" onClick={() => {navigate("/admin/questions/"+item.position)}}>
                                <td className="px-12 border-b-2 text-center hidden lg:block">{item.position}</td>
                                <td className="px-12 border-b-2 text-center">{item.text}</td>
                            </tr>
                        ))}
    
                    </tbody>
                </table>
                <Link to="add">
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
                            Ajouter une question
                        </button>
                </Link>
            </div>
        )
    }
    else {
        return(
            <div>Loading... </div>
        )
    }
}

export default Questions;