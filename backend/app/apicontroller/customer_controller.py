from app.service.user_profile_service import UserProfileService
from app.service.vendor_profile_service import VendorProfileService
from app.service.order_service import OrderService
from app.service.invoice_service import InvoiceService
from app.service.vendor_profile_service import VendorProfileService

class CustomerController:
    def __init__ (self):
        pass

    def get_order_history(db, userID):
        user_profile = UserProfileService.get_user_profile_by_user(db, userID.userID)
        if (user_profile is None):
            return []
        
        orderStatus = ["COMPLETED", "CANCELLED", "DONE", "PENDING"]
        invoices = InvoiceService.get_invoice_by_customer_and_order_status(db, user_profile.userProfileID, orderStatus)
        if len(invoices) < 1:
            return []
        
        order_history = []
        for invoice in invoices:
            vendor = VendorProfileService.get_vendor_profile(db, invoice.vendorProfileID)
            orders = OrderService.get_order_by_invoice(db, invoice.invoiceID)
            order_history.append({"invoice": invoice, "vendor": vendor, "orders": orders})

        return order_history

    def get_order_basket(db, userID):
        user_profile = UserProfileService.get_user_profile_by_user(db, userID.userID)
        if (user_profile is None):
            return []
        
        orderStatus = ["DRAFT"]
        invoices = InvoiceService.get_invoice_by_customer_and_order_status(db, user_profile.userProfileID, orderStatus)
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

    def update_order_status(db, invoiceStatus):
        return InvoiceService.update_status(db, invoiceStatus.invoiceID, invoiceStatus.status)
    
    def get_all_vendor_profile(db):
        return VendorProfileService.get_all_vendor_profile(db)