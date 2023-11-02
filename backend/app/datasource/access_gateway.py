from sqlalchemy.orm import Session
from app.models.access import Access

class AccessGateway():
    def __init__(self):
        pass

    def get_access(self,db: Session, accessID: int):
        try:
            return db.query(Access).filter(Access.accessID == accessID).first()
        except Exception as e:
            print(f"Error: {e}")

    def get_full_access_list(self, db:Session):
        try:
            
            access_dict = {}
            result= db.query(Access).filter().all()
            if result:
                for item in result:
                    access_dict[item.accessID] = item.accessName
            return access_dict
        except Exception as e:
            print(f"Error: {e}")