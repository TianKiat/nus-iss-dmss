from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.apicontroller.customer_controller import CustomerController
from app.common.user_model import UserID, IsFavorite
from run import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/order_history", description="Retrieve customer order history")
def access_control_user(userID: UserID, db: Session = Depends(get_db)):
    try:
        return CustomerController.get_order_history(db, userID)
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex)) from ex

@router.post("/update_favorite_order", description="Update order isFavorite in invoice table")
def access_control_user(isFavorite: IsFavorite, db: Session = Depends(get_db)):
    try:
        return CustomerController.update_favorite_order(db, isFavorite)
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex)) from ex