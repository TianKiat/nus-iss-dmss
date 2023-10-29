from sqlalchemy.orm import Session
from run import SessionLocal
from fastapi import APIRouter, HTTPException, Depends
from app.common.complaint_model import Complaint, ComplaintID, ComplaintUpdate
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
    
@router.get(
        "/get_complaint_list",
        description="retrieve list of complaint",
)
def get_complaint_list(db: Session = Depends(get_db)):
    try:
        return ComplaintController().get_complaint_list(db)
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex)) from ex
    
@router.post(
        "/get_complaint",
        description="retrieve specific complaint",
)
def get_complaint(inputID: ComplaintID, db: Session = Depends(get_db)):
    try:
        return ComplaintController().get_complaint(db, inputID.complaintID)
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex)) from ex

@router.post(
        "/update_complaint_status",
        description="update specific complaint status",
)    
def update_complaint(complaintUpdate: ComplaintUpdate, db: Session = Depends(get_db)):
        return ComplaintController().update_complaint(db, complaintUpdate)