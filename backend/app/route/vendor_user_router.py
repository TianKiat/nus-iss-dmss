from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.apicontroller.vendor_controller import VendorController
from app.common.user_model import UserID
from app.common.menu_item_model import MenuItemModel
from run import SessionLocal

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

router = APIRouter()

@router.get("/vendor_profile/get/{user_id}", description="Retrieve vendor profile for vendor")
def vendor_profile(user_id: int = 0, db: Session = Depends(get_db)):
    try:
        return VendorController.get_vendor_profile_id(db, user_id)
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex)) from ex    
    
@router.get("/vendor/orders/get/{user_id}", description="Retrieve orders for vendor")
def vendor_orders(user_id: int = 0, db: Session = Depends(get_db)):
    try:
        return VendorController.get_orders(db, user_id)
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex)) from ex    

@router.get("/menu_items/get/{user_id}", description="Retrieve menu items for vendor")
def menu_items(user_id: int = 0, db: Session = Depends(get_db)):
    try:
        return VendorController.get_menu_items(db, user_id)
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex)) from ex

@router.post("/menu_items/create", description="Create menu item for vendor")
def create_menu_item(menuItem: MenuItemModel, db: Session = Depends(get_db)):
    try:
        return VendorController.create_menu_item(db, menuItem)
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex)) from ex

@router.post("/menu_items/update", description="Update menu item for vendor")
def update_menu_items(menuItem: MenuItemModel, db: Session = Depends(get_db)):
    try:
        return VendorController.update_menu_item(db, menuItem)
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex)) from ex
    
@router.post("/menu_items/delete", description="Delete menu item for vendor")
def delete_menu_items(menu_item_id: int = 0, db: Session = Depends(get_db)):
    try:
        return VendorController.delete_menu_item(db, menu_item_id)
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex)) from ex