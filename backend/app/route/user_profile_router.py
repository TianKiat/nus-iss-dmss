from app.apicontroller.user_profile_controller import UserProfileController
from app.common.user_model import User
from fastapi import APIRouter, Depends, HTTPException
from run import SessionLocal
from sqlalchemy.orm import Session

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/user_profile/{id}")
def get_user_profile(id:str, db: Session = Depends(get_db)):
    result = UserProfileController.get_user_profile(db, id)
    return result