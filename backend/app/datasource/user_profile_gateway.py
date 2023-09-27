import mysql.connector
from app.models.user_profile import UserProfile
from sqlalchemy.orm import Session
from app.common.constants import DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE

sqldb = mysql.connector.connect(host = DB_HOST, user = DB_USERNAME, password = DB_PASSWORD, database = DB_DATABASE)

class UserProfileGateway():
    def __init__(self):
        pass

    def retrive_profile(self, db: Session, id):
        try:
            return db.query(UserProfile).filter(UserProfile.userID == id).first()
        except Exception as e:
            print(f"Error: {e}")