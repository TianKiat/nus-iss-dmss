from app.datasource.order_gateway import OrderGateway

class OrderService:
    def __init__(self):
        pass

    def get_order_by_invoice(db, invoiceID):
        return OrderGateway.get_order_by_invoice(db, invoiceID)