from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.apicontroller.user_profile_controller import UserProfileController
from run import SessionLocal
from app.common.user_model import User

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