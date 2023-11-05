from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.common.user_model import UserStatus, UserStatusByID
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

def update_user_status(userStatus: UserStatus, db: Session = Depends(get_db)):
    return UpdateUserStatusController().update_user_is_disabled(db, userStatus.userID, userStatus.isDisabled)

@router.get(
    "/retrieve_user_control",
    description="retrieve user control",
)

def retrieve_user_control(db: Session = Depends(get_db)):
    return UpdateUserStatusController().retrieve_user_control(db)

@router.post(
    "/retrieve_user_control_by_id",
    description="retrieve user control",
)
def retrieve_user_control_by_id(user:UserStatusByID, db: Session = Depends(get_db)):
    return UpdateUserStatusController().retrieve_user_control_by_id(db, user.userID)