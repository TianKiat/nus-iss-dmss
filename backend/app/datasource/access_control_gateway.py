from sqlalchemy.orm import Session
from app.models.access_control import AccessControl

class AccessControlGateway():
    def __init__():
        pass

    def get_access_control(db: Session, roleID: int):
        try:
            return db.query(AccessControl).filter(AccessControl.roleID == roleID).all()
        except Exception as e:
            print(f"Error: {e}")