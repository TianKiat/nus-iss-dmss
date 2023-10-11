from app.datasource.order_gateway import OrderGateway

class OrderService:
    def __init__(self):
        pass

    def create_order(db, menuItemID, foodName, quantity, price, invoiceID):
        return OrderGateway.create_order(db, menuItemID, foodName, quantity, price, invoiceID)

    def get_order_by_invoice(db, invoiceID):
        return OrderGateway.get_order_by_invoice(db, invoiceID)
    
    def get_order_by_invoice_and_menuitem(db, invoiceID, menuItemID):
        return OrderGateway.get_order_by_invoice_and_menuitem(db, invoiceID, menuItemID)
    
    def update_order(db, orderID, menuItemID, foodName, quantity, price, invoiceID):
        return OrderGateway.update_order(db, orderID, menuItemID, foodName, quantity, price, invoiceID)
    
    def delete_order_by_invoice(db, invoiceID):
        return OrderGateway.delete_order_by_invoice(db, invoiceID)
    
    def delete_order_by_invoice_and_menuitem(db, invoiceID, menuItemID):
        return OrderGateway.delete_order_by_invoice_and_menuitem(db, invoiceID, menuItemID)