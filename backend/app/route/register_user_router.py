from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.apicontroller.register_user_controller import RegisterUserController
from app.common.user_model import User, Vendor, Otp
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
def register_customer_account(customer: User, db: Session = Depends(get_db)):
    try:
        return RegisterUserController().register(db, customer)
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex)) from ex

@router.post(
        "/register_vendor",
        description="Vendor registration",
)
def register_vendor_account(vendor: Vendor, db: Session = Depends(get_db)):
    try:
        return RegisterUserController().register(db, vendor)
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex)) from ex
    
@router.post(
        "/register_otp",
        description="Generate OTP",
)
def register_vendor_account(email: str, db: Session = Depends(get_db)):
    try:
        return RegisterUserController().generate_otp(db, email)
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex)) from ex

@router.post(
        "/verify_otp",
        description="Generate OTP",
)
def register_vendor_account(otp: str, email: str, db: Session = Depends(get_db)):
    try:
        return RegisterUserController().verify_otp(db, otp, email)
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex)) from ex
    
@router.post(
        "/delete_record",
        description="Delete record",
)
def delete_record(id: int, db: Session = Depends(get_db)):
    try:
        return RegisterUserController().delete_record(db, id)
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex)) from ex
