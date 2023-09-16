from sqlalchemy.orm import Session
from app.models.access import Access

class AccessGateway():
    def __init__():
        pass

    def get_access(db: Session, accessID: int):
        return db.query(Access).filter(Access.accessID == accessID).first()