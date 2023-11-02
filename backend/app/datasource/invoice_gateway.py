from typing import List
from sqlalchemy.orm import Session
from sqlalchemy import select, insert, update, delete
from sqlalchemy.sql.functions import sum
from app.models.invoice import Invoice
from app.models.order import Order
from datetime import datetime

class InvoiceGateway():
    def __init__():
        pass

    def create_invoice(db: Session, customerProfileID: int, vendorProfileID: int, totalPrice: float):
        try:
            db.execute(
                insert(Invoice).values(
                    date=datetime.today(),
                    totalPrice=totalPrice,
                    discount=0,
                    status="DRAFT",
                    isFavorite=False,
                    customerProfileID=customerProfileID,
                    vendorProfileID=vendorProfileID
                )
            )
            db.commit()

            return db.query(Invoice).filter(
                Invoice.customerProfileID == customerProfileID,
                Invoice.vendorProfileID == vendorProfileID,
                Invoice.status == "DRAFT"
            ).first()
        except Exception as e:
            print(f"Error: {e}")

    def get_invoice_by_customer_and_order_status(db: Session, customerProfileID: int, orderStatus: List[str]):
        try:
            return db.query(Invoice).filter(
                Invoice.customerProfileID == customerProfileID,
                Invoice.status.in_(orderStatus)
            ).order_by(Invoice.date.desc()).all()
        except Exception as e:
            print(f"Error: {e}")

    def get_invoice_by_customer_and_vendor_and_order_status(db: Session, customerProfileID: int, vendorProfileID: int, orderStatus: str):
        try:
            return db.query(Invoice).filter(
                Invoice.customerProfileID == customerProfileID,
                Invoice.vendorProfileID == vendorProfileID,
                Invoice.status == orderStatus
            ).first()
        except Exception as e:
            print(f"Error: {e}")
    
    def get_invoice_by_vendor(db: Session, vendorProfileID: int):
        try:
            return db.query(Invoice).filter(Invoice.vendorProfileID == vendorProfileID).all()
        except Exception as e:
            print(f"Error: {e}")
    
    def update_isFavorite(db: Session, invoiceID: int, isFavorite: int):
        try:
            db.execute(
                update(Invoice)
                .where(Invoice.invoiceID == invoiceID)
                .values(isFavorite=isFavorite)
            )
            db.commit()

            updated_invoice = db.query(Invoice).filter(Invoice.invoiceID == invoiceID).first()
            if (updated_invoice is not None):
                return {"invoiceID": updated_invoice.invoiceID, "isFavorite": updated_invoice.isFavorite}
            else:
                return {"invoiceID": None}
        except Exception as e:
            print(f"Error: {e}")

    def update_status(db: Session, invoiceID: int, status: str, discount: float = 0):
        try:
            if (status == "PENDING"):
                db.execute(
                    update(Invoice)
                    .where(Invoice.invoiceID == invoiceID)
                    .values(status=status, discount=discount, date=datetime.today())
                )
            else:
                db.execute(
                    update(Invoice)
                    .where(Invoice.invoiceID == invoiceID)
                    .values(status=status)
                )
            db.commit()

            updated_invoice = db.query(Invoice).filter(Invoice.invoiceID == invoiceID).first()
            if (updated_invoice is not None):
                return {"invoiceID": updated_invoice.invoiceID, "status": updated_invoice.status}
            else:
                return {"invoiceID": None}
        except Exception as e:
            print(f"Error: {e}")
        
    def update_totalPrice(db: Session, invoiceID: int):
        try:
            totalPrice = 0
            result = db.execute(select(sum(Order.price)).where(Order.invoiceID == invoiceID))
            for value in result:
                totalPrice = value[0]
            
            db.execute(
                update(Invoice)
                .where(Invoice.invoiceID == invoiceID)
                .values(totalPrice=totalPrice)
            )
            db.commit()

            updated_invoice = db.query(Invoice).filter(Invoice.invoiceID == invoiceID).first()
            if (updated_invoice is not None):
                return {"invoiceID": updated_invoice.invoiceID, "totalPrice": updated_invoice.totalPrice}
            else:
                return {"invoiceID": None}
        except Exception as e:
            print(f"Error: {e}")

    def delete_invoice(db: Session, invoiceID: int):
        try:
            db.execute(
                delete(Invoice)
                .where(Invoice.invoiceID == invoiceID)
            )
            db.commit()

            return {"invoiceID": invoiceID}
        except Exception as e:
            print(f"Error: {e}")