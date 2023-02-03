import json


class Question() : 
    """
    Class that represents a question
    """
    def __init__(self,id,title,text,image,position,possibleAnswers) : 
        """Constructor to create a question object.
        
        Args : 
        id (int) : The id of the question.
        title (str) : quesion's theme.
        text (str) : actual question.
        image (str) : basecode64 encoded image.
        position (int) : question's position in the game.
        possibleAnswers (list(dict)) : question's answers with the good answer.

        Returns : 
        None
        """
        self.id = id
        self.title = title 
        self.text = text
        self.image = image
        self.position = position
        self.possibleAnswers = possibleAnswers
    
    def toJson(self) : 
        """
        Method to serialize a participation.

        Returns : 
        dict 
        """
        return json.dumps(self,default= lambda x : x.__dict__, ensure_ascii = False)


if __name__ == "__main__" : 
    question = Question(
        id = 2,
        text = "Quelle est la couleur du cheval blanc d'Henry IV ?",
        title = "Histoire !",
        image ="falseb64imagecontent",
        position = 2, 
        possibleAnswers = [
            {
                "text": "Noir",
                "isCorrect": False 
            },
            {
                "text": "Gris",
                "isCorrect": False
            },
            {
                "text": "Blanc",
                "isCorrect": True
            },
            {
                "text": "La rÃ©ponse D",
                "isCorrect": False
            }
        ]
    )
    print(question.toJson())
    import database
    conn = database.log_db(database.PATH)
    conn.close()
    database.insert_question(question)
    # result = database.retrieve_question("test",database.PATH)
    # print(result.toJson())


