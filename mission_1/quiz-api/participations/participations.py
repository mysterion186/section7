from flask import Blueprint, request, jsonify
from . import models
from . import database
from tools import jwt_utils as jwt
from quiz import database as q_database
from datetime import datetime
import json
participation = Blueprint('participation',__name__)


@participation.route("/participations/all", methods=["DELETE"])
def delete_all() : 
    """
    Route to delete the participation table.

    Returns : 
    tuple(str, int) : a tuple containing a status message and a code.
    """
    #Check if user is logged in
    raw_token = request.headers.get('Authorization')
    if raw_token == None : 
        return 'Missing authorization headers', 401
    token = raw_token.replace("Bearer ","")
    try : 
        jwt.decode_token(token)
        database.delete_participation()
        return 'No Content', 204
    except jwt.JwtError as e:
        print(e)
        return 'Unauthorized', 401

@participation.route("/participations", methods=["POST"])
def participate():
    """
    Route to accept user's answers for the quiz.

    Returns : 
    tuple(Union[dict, str], int) : the dict is a review of his game (name, score, date, lists of his answers and the actual answers).
    """
    payload = request.get_json()
    number_question = q_database.count_elements("question") - 1
    player_name = payload["playerName"]
    answers = payload["answers"]
    
    # if the users didn't anwered to all the questions or to too many questions.
    if len(answers) != number_question : 
        return "Not same lenght", 400
    
    # list all questions, to calculate user's score.
    questions = q_database.retrieve_all_question()
    score = 0
    answersSummaries = []
    for k in range(len(questions)):
        correct_position = q_database.get_correct_answer_pos(questions[k])
        if  correct_position == answers[k]:
            score += 1
        answersSummaries.append([correct_position, correct_position == answers[k]])
    # create the users Participation object to store it.
    now = datetime.now()
    formatted_date_time = now.strftime("%d/%m/%Y %H:%M:%S")
    participation = models.Participation(
        playerName= player_name,
        score=score,
        date= formatted_date_time
    )
    database.insert_participation(participation)
    response = participation.toJson()
    response = json.loads(response)
    response["answersSummaries"] = answersSummaries
    return response, 200
    