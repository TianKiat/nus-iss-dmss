from app.apicontroller.user_profile_controller import UserProfileController
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

@router.get("/user_profile/{userId}")
def get_user_profile(userId: str, db: Session = Depends(get_db)):
    try:
        return UserProfileController().get_user_profile(db, userId)
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex)) from ex

@router.get("/user_name/{userId}")
def get_user_name(userId: str, db: Session = Depends(get_db)):
    try:
        return UserProfileController().get_user_name(db, userId)
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex)) from ex
