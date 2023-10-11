from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.apicontroller.customer_controller import CustomerController
from app.common.user_model import UserID
from app.common.invoice_model import IsFavorite, InvoiceStatus, InvoiceID, DraftInvoice
from run import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/invoice/create", description="Create customer order basket")
def create_order_basket(draftInvoice: DraftInvoice, db: Session = Depends(get_db)):
    try:
        return CustomerController.create_order_basket(db, draftInvoice)
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex)) from ex

@router.post("/invoice/get_history", description="Retrieve customer order history")
def get_order_history(userID: UserID, db: Session = Depends(get_db)):
    try:
        return CustomerController.get_order_history(db, userID)
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex)) from ex

@router.post("/invoice/get_basket", description="Retrieve customer basket")
def get_order_basket(userID: UserID, db: Session = Depends(get_db)):
    try:
        return CustomerController.get_order_basket(db, userID)
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex)) from ex

@router.post("/invoice/isFavorite/update", description="Update order isFavorite in invoice table")
def update_favorite_order(isFavorite: IsFavorite, db: Session = Depends(get_db)):
    try:
        return CustomerController.update_favorite_order(db, isFavorite)
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex)) from ex

@router.post("/invoice/status/update", description="Update order status in invoice table")
def update_order_status(invoiceStatus: InvoiceStatus, db: Session = Depends(get_db)):
    try:
        return CustomerController.update_order_status(db, invoiceStatus)
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex)) from ex

@router.post("/invoice/delete", description='Delete order basket in invoice table')
def delete_order(invoiceID: InvoiceID, db: Session = Depends(get_db)):
    try:
        return CustomerController.delete_order(db, invoiceID)
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex)) from ex

@router.get("/vendor_profile/get_all", description="Retrieve vendor list for customer order")
def get_all_vendor_profile(db: Session = Depends(get_db)):
    try:
        return CustomerController.get_all_vendor_profile(db)
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex)) from ex