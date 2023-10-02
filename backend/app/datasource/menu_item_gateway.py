from sqlalchemy.orm import Session
from app.models.vendor_profile import VendorProfile
from app.models.menu_item import MenuItem
import mysql.connector
import uuid
from app.common.constants import DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE

sqldb = mysql.connector.connect(host = DB_HOST, user = DB_USERNAME, password = DB_PASSWORD, database = DB_DATABASE)

class MenuItemGateway():
    def __init__(self):
        pass

    def create_menu_item(self, db: Session, menuItem: MenuItem):
        try:
            item_data = {
                'menuItemName' : menuItem.menuItemName,
                'price' : menuItem.price,
                'menuItemImage' : menuItem.menuItemImage,
                'menuItemDesc' : menuItem.menuItemDesc,
                'isValid' : menuItem.isValid,
                'vendorProfileID' : menuItem.vendorProfileID,
            }
            item_table = MenuItem(**item_data)
            db.add(item_table)
            db.commit()

            return {"id" : menuItem.menuItemID}

        except Exception as e:
            return {"error": e.__repr__}
        
    
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
                db.delete(itemToUpdate)
                db.commit()

            return {"id" : menuItemId}

        except Exception as e:
            print(f"Error: {e}")

    def get_menu_items_for_vendor(self, db: Session, vendorProfileId: int):
        try:
            return db.query(MenuItem).filter(MenuItem.vendorProfileID == vendorProfileId).all()
        except Exception as e:
            print(f"Error: {e}")        