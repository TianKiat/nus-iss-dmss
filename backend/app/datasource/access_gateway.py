from sqlalchemy.orm import Session
from app.models.access import Access

class AccessGateway():
    def __init__():
        pass

    def get_access(db: Session, accessID: int):
        try:
            return db.query(Access).filter(Access.accessID == accessID).first()
        except Exception as e:
            print(f"Error: {e}")