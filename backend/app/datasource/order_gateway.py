from sqlalchemy.orm import Session
from sqlalchemy import insert, update, delete
from app.models.order import Order

class OrderGateway():
    def __init__():
        pass

    def create_order(db: Session, menuItemID: int, foodName: str, quantity: int, price: float, invoiceID: int):
        try:
            db.execute(
                insert(Order).values(
                    menuItemID=menuItemID,
                    foodName=foodName,
                    quantity=quantity,
                    price=price,
                    invoiceID=invoiceID
                )
            )
            db.commit()

            return db.query(Order).filter(Order.invoiceID == invoiceID, Order.menuItemID == menuItemID).first()
        except Exception as e:
            print(f"Error: {e}")

    def get_order_by_invoice(db: Session, invoiceID: int):
        try:
            return db.query(Order).filter(Order.invoiceID == invoiceID).all()
        except Exception as e:
            print(f"Error: {e}")

    def get_order_by_invoice_and_menuitem(db: Session, invoiceID: int, menuItemID: int):
        try:
            return db.query(Order).filter(Order.invoiceID == invoiceID, Order.menuItemID == menuItemID).first()
        except Exception as e:
            print(f"Error: {e}")

    def update_order(db: Session, orderID: int, menuItemID: int, foodName: str, quantity: int, price: float, invoiceID: int):
        try:
            db.execute(
                update(Order)
                .where(Order.orderID == orderID)
                .values(
                    menuItemID=menuItemID,
                    foodName=foodName,
                    quantity=quantity,
                    price=price,
                    invoiceID=invoiceID
                )
            )
            db.commit()

            return db.query(Order).filter(Order.orderID == orderID).first()
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
    
    def delete_order_by_invoice_and_menuitem(db: Session, invoiceID: int, menuItemID: int):
        try:
            db.execute(
                delete(Order)
                .where(Order.invoiceID == invoiceID, Order.menuItemID == menuItemID)
            )
            db.commit()

            return db.query(Order.orderID).filter(Order.invoiceID == invoiceID).all()
        except Exception as e:
            print(f"Error: {e}")