from app.apicontroller.user_profile_controller import UserProfileController
from fastapi import APIRouter, Depends
from run import SessionLocal
from sqlalchemy.orm import Session

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/user_profile/{userId}")
def get_user_profile(userId:str, db: Session = Depends(get_db)):
    return UserProfileController().get_user_profile(db, userId)