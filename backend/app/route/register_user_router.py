from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.apicontroller.register_user_controller import RegisterUserController
from app.common.user_model import User, Vendor
from run import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post(
        "/validate_customer_fields_otp",
        description="Check for existing customer record in DB and generate OTP",
)
def validate_customer_fields_otp(data: User, db: Session = Depends(get_db)):
    try:
        return RegisterUserController().validate_fields_otp(db, data)
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex)) from ex

@router.post(
        "/validate_vendor_fields_otp",
        description="Check for existing vendor record in DB and generate OTP",
)
def validate_vendor_fields_otp(data: Vendor, db: Session = Depends(get_db)):
    try:
        return RegisterUserController().validate_fields_otp(db, data)
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex)) from ex


@router.post(
        "/register_customer",
        description="OTP verification and customer registration",
)
def register_customer_account(customer: User, db: Session = Depends(get_db)):
    try:
        return RegisterUserController().register(db, customer)
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex)) from ex

@router.post(
        "/register_vendor",
        description="OTP verification and vendor registration",
)
def register_vendor_account(vendor: Vendor, db: Session = Depends(get_db)):
    try:
        return RegisterUserController().register(db, vendor)
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex)) from ex
