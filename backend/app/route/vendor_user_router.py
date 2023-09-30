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


@router.get("menu_items/{user_id}", description="Retrieve menu items for vendor")
def menu_items(user_id: int = 0, db: Session = Depends(get_db)):
    try:
        return "hello" # VendorController.get_menu_items(db, user_id)
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex)) from ex

@router.post("menu_items/create", description="Create menu item for vendor")
def create_menu_item(menuItem: MenuItemModel, db: Session = Depends(get_db)):
    try:
        return VendorController.create_menu_item(db, menuItem)
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex)) from ex

@router.post("menu_items/update", description="Update menu item for vendor")
def update_menu_items(menuItem: MenuItemModel, db: Session = Depends(get_db)):
    try:
        return VendorController.update_menu_item(db, menuItem)
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex)) from ex