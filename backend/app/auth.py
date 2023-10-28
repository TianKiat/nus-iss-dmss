from datetime import datetime, timedelta
import json
from fastapi.security import OAuth2PasswordBearer

from os import getenv
from fastapi import HTTPException
from jose import jwt, JWTError
from app.common.user_model import Token

ACCESS_TOKEN_EXPIRE_MINUTES = getenv('ACCESS_TOKEN_EXPIRE_MINUTES')  # 30 minutes
ALGORITHM = getenv('ALGORITHM')
SECRET_KEY = getenv('JWT_SECRET_KEY')

oauth2_bearer = OAuth2PasswordBearer(tokenUrl='/login_user')

def create_access_token (userSession: any, expires_delta: timedelta):
    encode = userSession
    expires = datetime.now() + expires_delta
    encode.update({'exp': expires})
    return jwt.encode(encode, SECRET_KEY, algorithm=ALGORITHM)

def get_current_user(token: Token):
    try:
        return jwt.decode(token.access_token, SECRET_KEY, algorithms=[ALGORITHM]) 
    except JWTError:
        raise HTTPException(status_code=401, detail='Could not validate user.')
    
