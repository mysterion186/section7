from flask import Blueprint, request, jsonify
from . import models
from . import database
from tools import jwt_utils as jwt
from tools import create_db
import json
from participations import database as p_database
quiz = Blueprint("quiz", __name__)

@quiz.route('/quiz-info', methods=['GET'])
def GetQuizInfo():
    """
    Route to get quiz info

    Returns : 
    tuple(dict, int) : the dictionary contains intel such as the number of questions + the ordered scores of players
    """
    return {"size": database.count_elements("question") - 1, "scores": p_database.retrieve_all_participations()}, 200

@quiz.route('/rebuild-db', methods = ['POST'])
def init_db():
    """
    create the participation and question table in sqlite

    Returns : 
    tuple(str, int) : (status, code)
    """
    create_db.create_question(path = create_db.PATH)
    create_db.create_participation(path = create_db.PATH)
    create_db.create_questions(path = create_db.PATH)
    return "Ok", 200

@quiz.route('/questions',methods=['POST'])
def add_questions() : 
    """
    add a question to the game.

    This function also updates the position of other questions if it is necessary.

    Returns : 
    tuple(str, int) : (status, code)
    """
    # headers = request.headers
    raw_token = request.headers.get('Authorization')
    if raw_token == None : 
        return 'Missing authorization headers', 401
    token = raw_token.replace("Bearer ","")
    try : 
        jwt.decode_token(token)
        payload = request.get_json()
        # check if all parameters are present to create a new question
        missing_params = database.check_parameter(payload)
        pot_id = database.get_max_id() + 1
        if missing_params == []:
            print("parfait il manque rien")
        else : 
            return {"missing_params": missing_params}, 422
        question = models.Question(
                            id = pot_id,
                            title = payload["title"],
                            text = payload["text"],
                            image = payload["image"],
                            position = database.get_max_pos(payload["position"]),
                            possibleAnswers = payload["possibleAnswers"]
                        )
        # avoid having questions with different position (1, 2, 3, 7, 8, ...)
        # if question.position > question.id : 
        #     question.position = question.id
        print("position de la question ",question.position)
        question_number = database.count_elements("question")
        question.possibleAnswers = database.add_id_to_answer(question.possibleAnswers)
        database.update_position(None, question, question_number, "insert")
        return question.toJson(), 200
    except jwt.JwtError as e:
        print(e)
        return 'Unauthorized', 401

@quiz.route('/questions/<which>', methods=['DELETE'])
def delete_question(which) : 
    """
    delete either all the question or one question from the question table.

    This function also updates the position of other questions if it is necessary.
    
    Args :
    which (str) : indicate if we have to delete "all" the question or "X" where X is the question's id.

    Returns : 
    tuple(str, int) : (status, code)
    """
    # check if the user wants to delete one question or all questions
    if which == "all" :
        question_id = "all"
        code = ("No Content",204)
    else : 
        try : 
            question_id = int(which)
            code = ("No Content",204)
        except : 
            return "Les valeurs possibles sont 'all' ou bien un nombre",401
    
    #Check if user is logged in
    raw_token = request.headers.get('Authorization')
    if raw_token == None : 
        return 'Missing authorization headers', 401
    token = raw_token.replace("Bearer ","")
    try : 
        jwt.decode_token(token)
        
        # once the users is authenticated + the questions he wants to delete (all or a number) is correct, we can delete question
        if question_id != "all" : 
            question = database.retrieve_one_question(question_id)
            if question == None : 
                return "Not found",404
        database.delete_question(question_id)
        return code
    except jwt.JwtError as e:
        print(e)
        return 'Unauthorized', 401

@quiz.route("/questions/<question_id>", methods=["GET"])
def get_question(question_id):
    """
    get the question that matches the id.

    Args : 
    question_id (int) : question's id.

    Returns : 
    tuple(Union[dict, str], int) : the dictionnay is the serialized question, str is error message.
    """
    question = database.retrieve_one_question(int(question_id))
    if question == None : 
        return "Not Found",404
    return question.toJson(), 200

@quiz.route("/questions", methods=["GET"])
def get_questions_by_position():
    """
    get the question by it's position in the game.

    Returns :
    tuple(Union[dict, str], int) : the dictionnay is the serialized quesiton, str is error message
    """
    try :  
        pos_id = int(request.args.get("position")) 
        question = database.retrieve_one_question(pos_id, key="position") 
        if question == None :  
            return "Not Found",404 
        return question.toJson(), 200 
    except :  
        count = database.count_elements("question") 
        questions = database.retrieve_all_question() 
        return [json.loads(elt.toJson()) for elt in questions], 200 

@quiz.route("/questions/<question_id>", methods=["PUT"])
def update_question(question_id) : 
    """
    update a specific question

    This function also updates the position of other questions if it is necessary.

    Args : 
    questino_id (int) : id of the question that we want to modify. 

    Returns : 
    tuple(str, int) : (status, code)
    """
    #Check if user is logged in
    raw_token = request.headers.get('Authorization')
    if raw_token == None : 
        return 'Missing authorization headers', 401
    token = raw_token.replace("Bearer ","")
    try : 
        jwt.decode_token(token)
    except jwt.JwtError as e:
        print(e)
        return 'Unauthorized', 401

    payload = request.get_json()
    question = database.retrieve_one_question(int(question_id))
    if question == None :
        return "Not Found", 404
    previous_pos = question.position
    question_number = database.count_elements("question")
    # check if all parameters are present to create a new question
    missing_params = database.check_parameter(payload)
    if missing_params == []:
        print("parfait il manque rien")
    else : 
        return {"missing_params": missing_params}, 422
    # Update question, don't take in account the position handling error (position > number of questions)
    question.title = payload['title']
    question.image = payload["image"]
    question.text = payload["text"]
    question.position = payload["position"]
    question.possibleAnswers = payload["possibleAnswers"]
    question.possibleAnswers = database.add_id_to_answer(question.possibleAnswers)
    # avoid having questions with different position (1, 2, 3, 7, 8, ...)
    if question.position > question_number : 
        question.position = question_number - 1 
    # database.update_question(question)
    if previous_pos != question.position :
        database.update_position(previous_pos, question, question_number, "update")
    else : 
        database.update_question(question)
    return "No Content", 204
