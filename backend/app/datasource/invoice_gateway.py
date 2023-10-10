from sqlalchemy.orm import Session
from sqlalchemy import update, delete
from app.models.invoice import Invoice

class InvoiceGateway():
    def __init__():
        pass

    def get_invoice_by_customer_and_order_status(db: Session, customerProfileID: int, orderStatus: list[str]):
        try:
            return db.query(Invoice).filter(Invoice.customerProfileID == customerProfileID, Invoice.status.in_(orderStatus)).all()
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

    def update_status(db: Session, invoiceID: int, status: str):
        try:
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