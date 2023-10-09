from sqlalchemy.orm import Session
from sqlalchemy import update
from app.models.invoice import Invoice

class InvoiceGateway():
    def __init__():
        pass

    def get_invoice_by_customer(db: Session, customerProfileID: int):
        try:
            return db.query(Invoice).filter(Invoice.customerProfileID == customerProfileID, Invoice.status.in_(["COMPLETED", "DONE", "CANCELLED"])).all()
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