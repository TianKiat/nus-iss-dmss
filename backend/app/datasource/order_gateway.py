from sqlalchemy.orm import Session
from sqlalchemy import delete
from app.models.order import Order

class OrderGateway():
    def __init__():
        pass

    def get_order_by_invoice(db: Session, invoiceID: int):
        try:
            return db.query(Order).filter(Order.invoiceID == invoiceID).all()
        except Exception as e:
            print(f"Error: {e}")

    def delete_order_by_invoice(db: Session, invoiceID: int):
        try:
            db.execute(
                delete(Order)
                .where(Order.invoiceID == invoiceID)
            )
            db.commit()

            return {"invoiceID": invoiceID}
        except Exception as e:
            print(f"Error: {e}")