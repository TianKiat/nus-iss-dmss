from sqlalchemy.orm import Session
from app.common.user_model import User, Vendor
from app.models import user, user_profile, vendor_profile, menuitem
import mysql.connector
import uuid
from app.common.constants import DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE

sqldb = mysql.connector.connect(host = DB_HOST, user = DB_USERNAME, password = DB_PASSWORD, database = DB_DATABASE)

class UserGateway():
    def __init__(self):
        pass

    def insert_menu_item_data(self, db: Session, menuItem: menuitem.MenuItem):
        try:
            menuItem.menuItemID = uuid()
            db.add(menuItem)
            db.commit()

            return {"id" : menuItem.menuItemID}

        except Exception as e:
            print(f"Error: {e}")