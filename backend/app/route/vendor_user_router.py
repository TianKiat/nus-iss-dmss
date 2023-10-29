from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.apicontroller.vendor_controller import VendorController
from app.common.user_model import VendorProfile
from app.common.menu_item_model import MenuItemModel
from app.common.opening_hours_model import OpeningHoursModel
from app.common.promotion_model import PromotionModel
from run import SessionLocal
from typing import List

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

@router.post(
        "/save_vendor_profile",
        description="Saving of vendor profile",
)
def save_vendor_profile(vendorData: VendorProfile, db: Session = Depends(get_db)):
    try:
        return VendorController().save_vendor_profile(db, vendorData)
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
    
@router.get("/opening_hours/get/{user_id}", description="Retrieve opening hours for vendor")
def opening_hours(user_id: int = 0, db: Session = Depends(get_db)):
    try:
        return VendorController.get_opening_hours(db, user_id)
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex)) from ex
    
@router.post("/opening_hours/update/", description="Update opening hours for vendor")
def opening_hours(openingHours : List[OpeningHoursModel], db: Session = Depends(get_db)):
    try:
        return VendorController.update_opening_hours(db, openingHours)
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex)) from ex
    
@router.get("/vendor/promotion/get/{user_id}", description="Retrieve promotions for vendor")
def menu_items(user_id: int = 0, db: Session = Depends(get_db)):
    try:
        return VendorController.get_promotions(db, user_id)
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex)) from ex

@router.post("/promotion/create", description="Create promo for vendor")
def opening_hours(promotion : PromotionModel, db: Session = Depends(get_db)):
    try:
        return VendorController.create_promotion(db, promotion)
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex)) from ex
    
@router.post("/promotion/delete", description="Delete promotion for vendor")
def delete_menu_items(promotion_id: int = 0, db: Session = Depends(get_db)):
    try:
        return VendorController.delete_promotion(db, promotion_id)
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex)) from ex