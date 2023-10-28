from app.apicontroller.user_profile_controller import UserProfileController
from fastapi import APIRouter, Depends, HTTPException
from run import SessionLocal
from sqlalchemy.orm import Session
from app.common.user_model import UserProfile


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

@router.get("/user_data/{userId}")
def get_user_name(userId: str, db: Session = Depends(get_db)):
    try:
        return UserProfileController().get_user_data(db, userId)
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex)) from ex

@router.get("/check_password/{userId}/{password}")
def check_password(userId: str, password: str, db: Session = Depends(get_db)):
    try:
        return UserProfileController().check_password(db, userId, password)
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex)) from ex

@router.post(
        "/save_user_profile",
        description="Saving of User profile",
)
def save_user_profile(userData: UserProfile, db: Session = Depends(get_db)):
    try:
        return UserProfileController().save_user_profile(db, userData)
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex)) from ex
    
@router.post("/save_username/{userID}/{username}")
def save_user_profile(username: str, userID: str, db: Session = Depends(get_db)):
    try:
        return UserProfileController().save_username(db, username, userID)
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex)) from ex