import sqlite3
import ast
import json
from .models import Participation
from datetime import datetime

PATH = "quiz.db"
def log_db(path) : 
    """Connection to the database. 
    
    Args :
    path (str) : path to the db file.
    
    Returns : 
    sqlite3.Connection : object to connect to the database.
    """
    return sqlite3.connect(path)

def delete_participation(path = PATH) : 
    """
    Delete all entries from the participation table.

    Args :
    path (str, optional) : path to the database file. Default is PATH ("quiz.db").
    
    Returns : 
    None
    """
    conn = log_db(path)
    try : 
        conn.execute("DELETE FROM participation")
        conn.commit()
    except Exception as e :
        print(e)
    finally : 
        conn.close()
    return

def insert_participation(participation,path = PATH) :
    """
    Insert one participant into the participation table.

    Args : 
    participation (Participation) : Object that contains all information about a participation.
    path (str, optional) : path to the database file. Default is PATH ("quiz.db").
    
    Returns : 
    None
    """
    conn = log_db(path)
    try : 
        conn.execute("INSERT INTO participation(player_name, score, date) VALUES (?,?,?)", (
                                                                                            participation.playerName,
                                                                                            participation.score,
                                                                                            participation.date
                                                                                        ))
        conn.commit()
    except Exception as e :
        print(e)
    finally : 
        conn.close()
    return

def retrieve_all_participations(path = PATH):
    """
    Retrieve all participations from the participations table.

    Args : 
    path (str, optional) The path to the database. Default is PATH ("quiz.db").
    
    Returns :
    list(Participation) : list that contains all the Participation that are in the database.
    """
    conn = log_db(path)
    try : 
        data = conn.execute("SELECT * FROM participation ORDER BY score DESC")
        participations = []
        for row in data : 
            participation = Participation(
                playerName = row[1],
                score = row[2],
                date = row[3]
            )
            participations.append(json.loads(participation.toJson()))
    except Exception as e :
        print(e)
    finally : 
        conn.close()
    return participations