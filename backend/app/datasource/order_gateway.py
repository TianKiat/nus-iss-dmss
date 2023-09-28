from sqlalchemy.orm import Session
from app.models.order import Order
from app.models.invoice import Invoice

class OrderGateway():
    def __init__():
        pass

    def get_order_by_invoice(db: Session, invoiceID: int):
        try:
            return db.query(Order).filter(Order.invoiceID == invoiceID).all()
        except Exception as e:
            print(f"Error: {e}")