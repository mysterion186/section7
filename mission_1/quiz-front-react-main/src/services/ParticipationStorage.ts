export default {

    savePlayerName(playerName: string):void{
        window.localStorage.setItem('playerName', playerName);
    },
    getPlayerName():string | null{
        return window.localStorage.getItem('playerName');
    },

    saveTotalQuestions(totalQuestions:number):void{
        window.localStorage.setItem('totalQuestions', totalQuestions.toString());
    },
    getTotalQuestions():string|null{
        return window.localStorage.getItem('totalQuestions');
    },

    saveToken(token:string):void{
        window.localStorage.setItem('token', token);
    },
    getToken():string|null{
        return window.localStorage.getItem('token');
    },

    saveQuestionTotal(total:number):void{
        window.localStorage.setItem('total',total.toString());
    },
    getTotal():string|null{
        const total = window.localStorage.getItem('total');
        return total===null ? null : total;
    },

    saveParticipationScore(score : number):void{
        window.localStorage.setItem('participationScore',score.toString()); 
    },
    getParticipationScore():string|null{
        return window.localStorage.getItem('participationScore');
    },

    saveAnswersSummaries(answersSummaries : number[]){
        window.localStorage.setItem("answersSummaries", answersSummaries.toString());
    },
    getAnswersSummaries():Array<[number, string]>|undefined{
        const rawAnswers = window.localStorage.getItem("answersSummaries");
        if (rawAnswers === null){
            return;
        }
        const temp = rawAnswers.split(',');
        var cleanAnswer: Array<[number, string]> = [];
        for (let i = 0; i < temp.length - 1; i +=2 ) {
            cleanAnswer.push([parseInt(temp[i]), temp[i + 1]]);
        }
        return cleanAnswer;
    },

    saveDate():void{
        const currentDate = new Date();
        const dateString = currentDate.toLocaleString("fr-FR",{
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                });
        window.localStorage.setItem("date",dateString);
    },
    parseDate(dateString:string) : Date | null{
        const dateRegex = /(\d{2})\/(\d{2})\/(\d{4})\s(\d{2}):(\d{2}):(\d{2})/;
        const dateParts = dateRegex.exec(dateString);
      
        if (!dateParts) {
          return null;
        }
      
        const day = parseInt(dateParts[1], 10);
        const month = parseInt(dateParts[2], 10) - 1; // Zero-indexed months
        const year = parseInt(dateParts[3], 10);
        const hour = parseInt(dateParts[4], 10);
        const minute = parseInt(dateParts[5], 10);
        const second = parseInt(dateParts[6], 10);
      
        return new Date(year, month, day, hour, minute, second);
  },
  checkIsValid() : boolean{
    try {
          const specificDate = window.localStorage.getItem("date") as string;
          const currentDate = new Date();
          const specificTimeInMilliseconds = this.parseDate(specificDate)!.getTime();
          const currentTimeInMilliseconds = currentDate.getTime();     
          
          const timeDifferenceInMilliseconds = currentTimeInMilliseconds - specificTimeInMilliseconds;
          const timeDifferenceInHours = timeDifferenceInMilliseconds / (1000 * 60 * 60);
          if (timeDifferenceInHours >= 1) {
                console.log("Le token est périmé ",timeDifferenceInMilliseconds);
                return false;
          } else {
                console.log("Le token est valide ",timeDifferenceInMilliseconds);
                return true;
          }
    }
    catch (error){
          return false;
    }
    
},
}