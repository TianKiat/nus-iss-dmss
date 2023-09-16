from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.apicontroller.access_control_controller import AccessControlContoller
from run import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/access_control_user")
def access_control_user(roleID: int, db: Session = Depends(get_db)):
    return AccessControlContoller.get_access_control(db, roleID)