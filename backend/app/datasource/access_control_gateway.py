from sqlalchemy.orm import Session
from app.models.access_control import AccessControl

class AccessControlGateway():
    def __init__(self):
        pass

    def get_access_control(self, db: Session, roleID: int):
        try:
            return db.query(AccessControl).filter(AccessControl.roleID == roleID).first()
        except Exception as e:
            print(f"Error: {e}")

    def get_access_control_list(self, db: Session, roleID: int):
        try:
            result = db.query(AccessControl).filter(AccessControl.roleID == roleID).all()
            access_list = []
            if result:
                for item in result:
                    access_list.append(item.accessID)
            return access_list
        
        except Exception as e:
            print(f"Error: {e}")

    def insert_access_control(self, db: Session, roleID: int, accessID: int):
        try:
            access_control = {
                "accessID":accessID,
                "roleID":roleID
            }
            access_control_table = AccessControl(**access_control)
            db.add(access_control_table)
            db.commit()
            result = db.query(AccessControl).filter(AccessControl.roleID == roleID, AccessControl.accessID == accessID).first()
            if result:
                return True
            else:
                return False
        except Exception as e:
            print(f"Error: {e}")

    def delete_access_control(self, db: Session, roleID: int, accessID: int):
        result = db.query(AccessControl).filter(AccessControl.roleID == roleID, AccessControl.accessID == accessID).first()
        if result:
            control_id = result.accessControlID
            db.delete(result)
            db.commit()
            check = db.query(AccessControl).filter(AccessControl.accessControlID == control_id).first()
            if check:
                return True
            else:
                return False
        else:
            return False