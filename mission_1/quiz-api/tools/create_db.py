import sqlite3

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
