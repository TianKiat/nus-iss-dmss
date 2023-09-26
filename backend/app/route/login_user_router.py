from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.apicontroller.login_user_controller import LoginUserController
from app.common.user_model import Login
from run import SessionLocal

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

def register_customer_account(user: Login, db: Session = Depends(get_db)):
    try:
        return LoginUserController().login_user(db, user)
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex)) from ex