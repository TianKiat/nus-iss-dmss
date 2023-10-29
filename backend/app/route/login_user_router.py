from datetime import datetime, timedelta
from app.auth import create_access_token, get_current_user
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from starlette import status
from app.apicontroller.login_user_controller import LoginUserController
from app.common.user_model import Login
from run import SessionLocal
from app.common.user_model import Token

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post(
        "/login_user",
        description="User login",
)

def login_user(form_data: Login, db: Session = Depends(get_db)):
    try:
        userSession = LoginUserController().login_user(db, form_data)
        if not userSession:
            return userSession
        token = create_access_token(userSession, timedelta(minutes=30))
        return {'access_token': token, 'token_type': 'bearer'}
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex)) from ex
    

@router.post(
    "/user_token",
    status_code=status.HTTP_200_OK,
    description="Get logged in user info",
)

def get_current_user_info(token: Token, db: Session = Depends(get_db)):
    if token is None:
        raise HTTPException(status_code=401, detail='Authentication failed')
    current_user = get_current_user(token)

    if 'exp' in current_user and datetime.fromtimestamp(current_user['exp']) < datetime.now():
        raise HTTPException(
            status_code = status.HTTP_401_UNAUTHORIZED,
            detail="Token expired",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return current_user