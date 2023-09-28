from app.datasource.invoice_gateway import InvoiceGateway

class InvoiceService():
    def __init__(self):
        pass

    def get_invoice_by_customer(db, customerProfileID):
        return InvoiceGateway.get_invoice_by_customer(db, customerProfileID)
    
    def update_isFavorite(db, invoiceID, isFavorite):
        return InvoiceGateway.update_isFavorite(db, invoiceID, isFavorite)