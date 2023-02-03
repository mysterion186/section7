import sqlite3
import requests
import json
from random import randint
import base64
from quiz.models import Question
import quiz.database as db

PATH = "quiz.db"
def log_db(path) : 
    """Connection to the database. 
    
    Args :
    path (str) : path to the db file.
    
    Returns : 
    sqlite3.Connection : object to connect to the database.
    """
    return sqlite3.connect(path)

def create_question(path = PATH) :
    """
    create the question table in the database.

    Args : 
    path (str, optional) : path to the database file.

    Returns : 
    None
    """
    conn = log_db(path)
    c = conn.cursor()
    c.execute("DROP TABLE IF EXISTS question")
    c.execute("create table question(id int primary key, title varchar, text varchar, image varchar, position int, possibleAnswers json);")
    conn.close()
    return

def create_participation(path = PATH) :
    """
    create the question table in the database.

    Args : 
    path (str, optional) : path to the database file.

    Returns : 
    None
    """
    conn = log_db(path)
    c = conn.cursor()
    c.execute("DROP TABLE IF EXISTS participation")
    c.execute("CREATE TABLE participation (id INTEGER PRIMARY KEY AUTOINCREMENT, player_name TEXT NOT NULL, score INTEGER NOT NULL, date TEXT NOT NULL)")
    conn.close()
    return

def create_questions(path = PATH) :
    """
    fetch flags api and create 10 random questions for the player (inside the database)

    Args : 
    path (str, optional) : path to the database file.

    Returns : 
    None
    """
    response = requests.get("https://restcountries.com/v3.1/all")
    response_json = json.loads(response.text)
    print(response_json[0].keys())
    count = 0
    while count != 10 : 
        country_id = randint(0, len(response_json))
        try : 
            # Get intel about the "main" country
            correctAnswersPos = randint(0,3)
            country_intel = response_json[country_id]
            country_name = country_intel["name"]["common"]
            country_flag = country_intel["flags"]["png"]
            print(f"La possition pour la bonne réponse est {correctAnswersPos}, la position dans le quiz est {count}")
            print(f"Le nom du pays est {country_name} \nL'url du drapeau est {country_flag}")
            count +=1 

            # Create a Question object to save in the database 
            # First convert the png to a base64 text
            img_response = requests.get(country_flag)
            img_content = img_response.content
            base64_bytes = base64.b64encode(img_content)
            base64_string = base64_bytes.decode("utf-8") # string to store in db

            # Generate the responses list
            answers_list = []
            for k in range(0,4) : 
                # print( k, correctAnswersPos)
                if k == correctAnswersPos :
                    answers_list.append({
                        "text" : country_name,
                        "isCorrect" : True
                    })
                else : 
                    answers_list.append({
                        "text" : response_json[randint(0,country_id - 2)]["name"]["common"],
                        "isCorrect" : False
                    })
            question = Question(
                id = count,
                title="Drapeau",
                text="Quel est ce pays ?",
                image = "data:image/png;base64,"+base64_string,
                position=count,
                possibleAnswers=answers_list
            )
            db.insert_question(question, path=PATH)

        except Exception as e:
            print(response_json[country_id])
            print(country_id, count)
            print(e) 
            break
        # print() 
    # nom = response_json[0]["name"]['common']
    # flag_url = response_json[0]["flags"]
    # correctAnswersPos = randint(0,4)
    # print(f"La possition pour la bonne réponse est {correctAnswersPos}")
    # print(f"Le nom du pays est {nom} \nL'url du drapeau est {flag_url['png']}")


if __name__ == "__main__":
    create_questions()
