import axios, { AxiosInstance, AxiosResponse } from "axios";
import Question from "../types";

const instance = axios.create({
	baseURL: process.env.REACT_APP_API_URL
});

type type_headers = {
    'Content-type' : string;
    authorization? : string;
}

export default {

    async call(method: string, ressources: string, data: object | null  = null, token : string | null = null ){
        var headers : type_headers= {
            "Content-type" : "application/json",
        };
         if (token !== null){
            headers.authorization =  "Bearer " + token;
        }
        return instance({
            method, 
            headers : headers,
            url : ressources,
            data
        }).then((response) => {
            return {status: response.status, data : response.data};
        }).catch((err) => {
            return {status: err.response.status, data : err.response.data};
        })
    },
    
    getQuizInfo(){
        return this.call("get","quiz-info", null, null);
    },

    getQuestionById(questionId : number) {
        return this.call("get","questions/"+questionId.toString());
    },
    getQuestionByPosition(position : string) {
        return this.call("get","questions?position="+position);
    },
    getAllQuestions() {
        return this.call("get","questions?position=all");
    },

    postParticipation(data: {playerName:string, answers:number[]}){
        return this.call("post","participations",data);
    },

    postLogin(data:{password : string}){
        return this.call("post","login", data);
    },

    deleteQuestion(id:string, token : string){
        return this.call("delete","questions/"+id, null, token);
    },

    updateQuestion(id:string, data:Question, token : string){
        return this.call("put","questions/"+id, data, token);
    },

    postQuestion(data:Question, token:string){
        return this.call("post","questions", data, token);
    }

}

