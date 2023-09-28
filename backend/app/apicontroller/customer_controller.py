from app.service.user_profile_service import UserProfileService
from app.service.vendor_profile_service import VendorProfileService
from app.service.order_service import OrderService
from app.service.invoice_service import InvoiceService

class CustomerController:
    def __init__ (self):
        pass

    def get_order_history(db, userID):
        user_profile = UserProfileService.get_user_profile_by_user(db, userID.userID)
        if (user_profile is None):
            return []
        
        invoices = InvoiceService.get_invoice_by_customer(db, user_profile.userProfileID)
        if len(invoices) < 1:
            return []
        
        order_history = []
        for invoice in invoices:
            vendor = VendorProfileService.get_vendor_profile(db, invoice.vendorProfileID)
            orders = OrderService.get_order_by_invoice(db, invoice.invoiceID)
            order_history.append({"invoice": invoice, "vendor": vendor, "orders": orders})

        return order_history

    def update_favorite_order(db, isFavorite):
        return InvoiceService.update_isFavorite(db, isFavorite.invoiceID, isFavorite.isFavorite)