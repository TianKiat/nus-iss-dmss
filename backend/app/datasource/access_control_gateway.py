from sqlalchemy.orm import Session
from app.models.access_control import AccessControl

class AccessControlGateway():
    def __init__():
        pass

    def get_access_control(db: Session, roleID: int):
        try:
            return db.query(AccessControl).filter(AccessControl.roleID == roleID).first()
        except Exception as e:
            print(f"Error: {e}")

    def get_access_control_list(db: Session, roleID: int):
        try:
            result = db.query(AccessControl).filter(AccessControl.roleID == roleID).all()
            access_list = []
            if result:
                for item in result:
                    access_list.append(item.accessControlID)
            return access_list
        
        except Exception as e:
            print(f"Error: {e}")