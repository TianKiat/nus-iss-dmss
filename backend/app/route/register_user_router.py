from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.apicontroller.register_user_controller import RegisterUserController
from app.common.user_model import Customer, Vendor
from run import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post(
        "/register_customer",
        description="User registration",
)
def register_customer_account(customer: Customer, db: Session = Depends(get_db)):
    try:
        return RegisterUserController().register_customer(db, customer)
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex))

@router.post(
        "/register_vendor",
        description="Vendor registration",
)
def register_vendor_account(vendor: Vendor, db: Session = Depends(get_db)):
    try:
        return RegisterUserController().register_vendor(db, vendor)
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex))
