from sqlalchemy.orm import Session
from run import SessionLocal
from fastapi import APIRouter, HTTPException, Depends
from app.common.complaint_model import Complaint
from app.apicontroller.complaint_controller import ComplaintController

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post(
        "/complaint",
        description="create complaint",
)
def create_complaint(complaint_input: Complaint, db: Session = Depends(get_db)):
    try:
        return ComplaintController().create_complaint(db, complaint_input)
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex)) from ex