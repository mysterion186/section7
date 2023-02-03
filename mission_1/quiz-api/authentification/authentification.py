from flask import Blueprint
from flask import Flask, request
from tools.jwt_utils import build_token, decode_token, JwtError


authentification = Blueprint("authentification", __name__)

@authentification.route('/login', methods = ['POST'])
def user():
    payload = request.get_json()
    password = payload["password"]
    if password == "flask2023" :
        return {"token": build_token() },200
    else :
        return 'Unauthorized', 401
