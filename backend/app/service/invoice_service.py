from app.datasource.invoice_gateway import InvoiceGateway

class InvoiceService():
    def __init__(self):
        pass

    def create_invoice(db, customerProfileID, vendorProfileID, totalPrice):
        return InvoiceGateway.create_invoice(db, customerProfileID, vendorProfileID, totalPrice)

    def get_invoice_by_customer_and_order_status(db, customerProfileID, orderStatus):
        return InvoiceGateway.get_invoice_by_customer_and_order_status(db, customerProfileID, orderStatus)
    
    def get_invoice_by_customer_and_vendor_and_order_status(db, customerProfileID, vendorProfileID, orderStatus):
        return InvoiceGateway.get_invoice_by_customer_and_vendor_and_order_status(db, customerProfileID, vendorProfileID, orderStatus)
    
    def get_invoice_by_vendor(db, vendorProfileID):
        return InvoiceGateway.get_invoice_by_vendor(db, vendorProfileID)
    
    def update_isFavorite(db, invoiceID, isFavorite):
        return InvoiceGateway.update_isFavorite(db, invoiceID, isFavorite)
    
    def update_status(db, invoiceID, status, discount):
        return InvoiceGateway.update_status(db, invoiceID, status, discount)
    
    def update_totalPrice(db, invoiceID):
        return InvoiceGateway.update_totalPrice(db, invoiceID)
    
    def delete_invoice(db, invoiceID):
        return InvoiceGateway.delete_invoice(db, invoiceID)