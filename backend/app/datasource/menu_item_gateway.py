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
            menuItem.menuItemID = uuid()
            db.add(menuItem)
            db.commit()

            return {"id" : menuItem.menuItemID}

        except Exception as e:
            print(f"Error: {e}")
    
    def update_menu_item(self, db: Session, menuItem: MenuItem):
        try:
            db.query(MenuItem).filter(MenuItem.menuItemID == menuItem.menuItemID).update(menuItem)
            db.commit()

            return {"id" : menuItem.menuItemID}

        except Exception as e:
            print(f"Error: {e}")

    def get_menu_items_for_vendor(self, db: Session, vendorProfileId: int):
        try:
            return db.query(MenuItem).filter(MenuItem.vendorProfileID == vendorProfileId).all()
        except Exception as e:
            print(f"Error: {e}")        