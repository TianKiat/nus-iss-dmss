from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.common.user_model import UserStatus
from app.apicontroller.update_user_status_controller import UpdateUserStatusController
from run import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post(
    "/update_user_status",
    description="udpate User isDisabled Status",
)

def login_user(userStatus: UserStatus, db: Session = Depends(get_db)):
    return UpdateUserStatusController().update_user_is_disabled(db, userStatus.userID, userStatus.isDisabled)