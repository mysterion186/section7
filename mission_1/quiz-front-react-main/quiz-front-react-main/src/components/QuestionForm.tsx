import { useState, useEffect } from 'react';
import Question from '../types';
import QuizApiService from '../services/QuizApiService';
import ParticipationStorage from '../services/ParticipationStorage';
import { useNavigate } from 'react-router-dom';
function QuestionForm (props : {questionId : number | null}){
    const [question, setQuestion] = useState<Question|null>(null);
    const [listAnswer, setListAnswer] = useState<boolean[]>([false,false,false,false]);
    const navigate = useNavigate();
    const [selected, setSelected] = useState<number>(-1);


    useEffect(() => {
        var cleanQuestion:Question;
        if (props.questionId === null) {
            cleanQuestion = {
                position : 0,
                text : '',
                title : '',
                image : '',
                possibleAnswers : [
                    {
                        text : '',
                        isCorrect : false
                    },
                    {
                        text : '',
                        isCorrect : false
                    },
                    {
                        text : '',
                        isCorrect : false
                    },
                    {
                        text : '',
                        isCorrect : false
                    },
                ],
            }
            setQuestion(cleanQuestion);
        }
        else {
            const getData = async () => {
                const response = await QuizApiService.getQuestionByPosition(props.questionId!.toString());
                if (response.status === 200) {
                    cleanQuestion = response.data;
                    setQuestion(cleanQuestion);
                    const Answers = [];
                    for (let i = 0; i < cleanQuestion.possibleAnswers.length; i++) {
                        if (cleanQuestion.possibleAnswers[i].isCorrect){
                            Answers.push(true);
                            setSelected(i);
                        }
                        else Answers.push(false);
                    }
                    console.log(Answers);
                    setListAnswer(Answers);
                }
            }
            getData();
        }
        
    }, []);

    const handleChange = (event:any) => {
        const rawSelected = parseInt(event.target.value);
        setSelected(rawSelected);
        for (let i = 0; i < question!.possibleAnswers.length; i++) {
            if (i === rawSelected) question!.possibleAnswers[rawSelected].isCorrect = true;
            else {
                question!.possibleAnswers[i].isCorrect = false;
            }
        }
        setQuestion(question);
        console.log(question!.possibleAnswers);
    }

    function convertToBase64(event:any) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            if (reader.result !== null && typeof(reader.result)==="string" )
            setQuestion({...question, image: reader.result } as Question);
        };
        reader.onerror = (error) => {
            console.log('Error: ', error);
        };
    };

    const handleAnswerUpdate = (event : any,index:number) => {
        setQuestion(() => {
            const prev = question!;
            const newPossibleAnswers = [...prev.possibleAnswers];
            newPossibleAnswers[index] = { ...newPossibleAnswers[index], text: event.target.value }
            return { ...prev, possibleAnswers: newPossibleAnswers };
        });
    }

    if (question){
        return (
            <div className='flex justify-center items-center flex-col'>
                <form action="">
                    <label className="mt-5 block uppercase tracking-wide text-white-700 text-xs font-bold mb-2">
                        Thème de la question
                    </label>
                    <div className={`flex items-center border-b py-2 px-2 ${false?"border-red-500":"border-teal-500"} `}>
                        <input value={question.title} onChange={(event) =>{setQuestion({...question, title: event.target.value})}} className="appearance-none bg-transparent border-none w-full text-white-700 text-xl mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Thème" aria-label="Full name" required />
                    </div>
                    
                    <label className="mt-5 block uppercase tracking-wide text-white-700 text-xs font-bold mb-2">
                        Intitulé de la question
                    </label>
                    <div className={`flex items-center border-b py-2 px-2 ${false?"border-red-500":"border-teal-500"} `}>
                        <input value={question.text} onChange={(event) =>{setQuestion({...question, text: event.target.value})}} placeholder="Intitulé" className="appearance-none bg-transparent border-none w-full text-white-700 text-xl mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" aria-label="Full name" required />
                    </div>

                    <div>
                        <label className="mt-5 block uppercase tracking-wide text-white-700 text-xs font-bold mb-2">
                            Position dans le quiz
                        </label>
                        <div className={`flex items-center border-b py-2 px-2 ${false?"border-red-500":"border-teal-500"} `}>
                            <input value={question.position} onChange={(event) =>{setQuestion({...question, position: parseInt(event.target.value)})}} placeholder="Position" className="appearance-none bg-transparent border-none w-full text-white-700 text-xl mr-3 py-1 px-2 leading-tight focus:outline-none" type="number" aria-label="Full name" required />
                        </div>

                        <label className="mt-5 block uppercase tracking-wide text-white-700 text-xs font-bold mb-2">
                            Réponse 1
                        </label>
                        <div className={`flex items-center border-b py-2 px-2 ${false?"border-red-500":"border-teal-500"} `}>
                            <input onChange={() => {handleChange(window.event)} } type="radio" checked={selected ===0} name="correctAnswer" value="0" id="flexCheckDefault" />
                            <textarea 
                                value={question.possibleAnswers[0].text} 
                                onChange={() => {handleAnswerUpdate(window.event, 0)} }  
                                placeholder="Réponse 1" 
                                className="appearance-none bg-transparent border-none w-full text-white-700 text-xl mr-3 py-1 px-2 leading-tight focus:outline-none" 
                                aria-label="Full name" required ></textarea>
                        </div>

                        <label className="mt-5 block uppercase tracking-wide text-white-700 text-xs font-bold mb-2">
                            Réponse 2
                        </label>
                        <div className={`flex items-center border-b py-2 px-2 ${false?"border-red-500":"border-teal-500"} `}>
                            <input onChange={() => {handleChange(window.event)} } type="radio" checked={selected === 1} name="correctAnswer" value="1" id="flexCheckDefault" />
                            <textarea 
                                value={question.possibleAnswers[1].text} 
                                onChange={() => {handleAnswerUpdate(window.event, 1)} } 
                                placeholder="Réponse 2" 
                                className="appearance-none bg-transparent border-none w-full text-white-700 text-xl mr-3 py-1 px-2 leading-tight focus:outline-none" 
                                aria-label="Full name" required></textarea>
                        </div>

                        <label className="mt-5 block uppercase tracking-wide text-white-700 text-xs font-bold mb-2">
                            Réponse 3
                        </label>
                        <div className={`flex items-center border-b py-2 px-2 ${false?"border-red-500":"border-teal-500"} `}>
                            <input onChange={() => {handleChange(window.event)}} type="radio" checked={selected === 2} name="correctAnswer" value="2" id="flexCheckDefault" />
                            <textarea 
                                value={question.possibleAnswers[2].text} 
                                onChange={() => {handleAnswerUpdate(window.event, 2)} } 
                                placeholder="Réponse 3" 
                                className="appearance-none bg-transparent border-none w-full text-white-700 text-xl mr-3 py-1 px-2 leading-tight focus:outline-none" 
                                aria-label="Full name" required ></textarea>
                        </div>

                        <label className="mt-5 block uppercase tracking-wide text-white-700 text-xs font-bold mb-2">
                            Réponse 4
                        </label>
                        <div className={`flex items-center border-b py-2 px-2 ${false?"border-red-500":"border-teal-500"} `}>
                            <input onChange={() => {handleChange(window.event)}} type="radio" checked={selected === 3} name="correctAnswer" value="3" id="flexCheckDefault" />
                            <textarea 
                                value={question.possibleAnswers[3].text} 
                                onChange={() => {handleAnswerUpdate(window.event, 3)} } 
                                placeholder="Réponse 4" 
                                className="appearance-none bg-transparent border-none w-full text-white-700 text-xl mr-3 py-1 px-2 leading-tight focus:outline-none" 
                                aria-label="Full name" required ></textarea>
                        </div>
                    </div>
                    <div className='mt-10'>
                        <label className="form-label" >Image pour la question : </label>
                        <div>
                            <input
                                type="file"
                                accept="image/jpeg/*"
                                onChange={convertToBase64}
                            />
                            {
                                question.image &&
                                <img src={question.image}></img>
                            }
                        </div>
                    </div>
                </form>
                <div className='flex display-center items-center flex-col'>
                    <button 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" 
                        onClick={async () => {
                            console.log(question);
                            const token = ParticipationStorage.getToken() as string;
                            if (props.questionId !== null) {
                                if (question.id !== undefined) {
                                    const response = await QuizApiService.updateQuestion(question.id.toString(), question, token);
                                    if (response.status === 200) {
                                        navigate("/admin/questions")
                                    }
                                }
                            }
                            else {
                                const response = await QuizApiService.postQuestion(question,token);
                                if (response.status === 200) {
                                    navigate("/admin/questions");
                                }
                            }
                        }}
                    >
                        Confirmer la modification
                    </button>
                    <button className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => { navigate("/admin/questions")}}>
                        Annuler la modification
                    </button>
                </div>
            </div>
        )
    }
    else {
        return (
            <div>Loading... </div>
        )
    }
}

export default QuestionForm;