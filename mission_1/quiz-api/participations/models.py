import json


class Participation():
    """
    Class that represents a participation.
    """
    def __init__(self,playerName,score,date):
        """
        Constructor for the participation object.

        Args : 
        playerName (str): The name of the player.
        score (int) : player's score.
        date (datetime) : date of the participation.
        
        Returns : 
        None
        """
        self.playerName = playerName
        self.date = date
        self.score = score

    def toJson(self) :
        """
        Method to serialize a participation.

        Returns : 
        dict 
        """
        return json.dumps(self,default= lambda x : x.__dict__, ensure_ascii = False)