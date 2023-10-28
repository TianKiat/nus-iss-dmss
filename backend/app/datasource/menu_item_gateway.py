from sqlalchemy.orm import Session
from sqlalchemy import and_, Uuid
from app.models.vendor_profile import VendorProfile
from app.models.menu_item import MenuItem
import mysql.connector
import logging

logging.basicConfig(
    level=logging.DEBUG,  # Set the logging level (DEBUG, INFO, WARNING, ERROR, CRITICAL)
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    handlers=[
        logging.StreamHandler(),  # Log to the console
    ]
)


class MenuItemGateway():
    def __init__(self):
        pass

    def create_menu_item(self, db: Session, menuItem: MenuItem):
        logger = logging.getLogger(__name__)
        logger.debug(menuItem)

        try:
            item_data = {
                'menuItemName' : menuItem.menuItemName,
                'price' : menuItem.price,
                'menuItemImage' : menuItem.menuItemImage,
                'menuItemDesc' : menuItem.menuItemDesc,
                'isValid' : True,
                'vendorProfileID' : menuItem.vendorProfileID,
            }
            item_table = MenuItem(**item_data)
            db.add(item_table)
            db.commit()
            item_new = db.query(MenuItem).filter(and_(MenuItem.menuItemName == menuItem.menuItemName, MenuItem.vendorProfileID == menuItem.vendorProfileID)).first()
            logger.debug(item_new)
            return {"id" : item_new.menuItemID}

        except Exception as e:
            print(f"Error: {e}")
        
    def get_menu_item(self, db: Session, menuItemID: int):
        try:
            return db.query(MenuItem).filter(MenuItem.menuItemID == menuItemID).first()
        except Exception as e:
            print(f"Error: {e}")

    def get_valid_menu_item_for_vendor(self, db: Session, vendorProfileId: int):
        try:
            return db.query(MenuItem).filter(MenuItem.vendorProfileID == vendorProfileId, MenuItem.isValid).all()
        except Exception as e:
            print(f"Error: {e}")
    
    def update_menu_item(self, db: Session, menuItem: MenuItem):
        try:
            itemToUpdate = db.query(MenuItem).filter(MenuItem.menuItemID == menuItem.menuItemID).first()
            if itemToUpdate:
                itemToUpdate.menuItemName = menuItem.menuItemName
                itemToUpdate.price = menuItem.price
                itemToUpdate.menuItemImage = menuItem.menuItemImage
                itemToUpdate.menuItemDesc = menuItem.menuItemDesc
            else:
                db.add(menuItem)
            db.commit()

            return {"id" : menuItem.menuItemID}

        except Exception as e:
            print(f"Error: {e}")
    
    def delete_menu_item(self, db: Session, menuItemId: int):
        try:
            itemToUpdate = db.query(MenuItem).filter(MenuItem.menuItemID == menuItemId).first()
            if itemToUpdate:
                itemToUpdate.isValid = False
                db.commit()

            return {"id" : menuItemId}

        except Exception as e:
            print(f"Error: {e}")

    def get_menu_items_for_vendor(self, db: Session, vendorProfileId: int):
        try:
            return db.query(MenuItem).filter(MenuItem.vendorProfileID == vendorProfileId).all()
        except Exception as e:
            print(f"Error: {e}")        