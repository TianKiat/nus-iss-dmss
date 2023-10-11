from app.service.user_profile_service import UserProfileService
from app.service.vendor_profile_service import VendorProfileService
from app.service.order_service import OrderService
from app.service.invoice_service import InvoiceService
from app.service.menu_item_service import MenuItemService

class CustomerController:
    def __init__ (self):
        pass

    def update_order_basket(db, draftInvoice):
        customerProfileID = UserProfileService.get_user_profile_by_user(db, draftInvoice.userID).userProfileID
        if (draftInvoice.quantity > 0):
            menuitem = MenuItemService.get_menu_item(db, draftInvoice.menuItemID)

            new_invoice = False
            invoice = InvoiceService.get_invoice_by_customer_and_vendor_and_order_status(db, customerProfileID, draftInvoice.vendorProfileID, "DRAFT")
            if (invoice is None):
                new_invoice = True
                totalPrice = draftInvoice.quantity * menuitem.price
                invoice = InvoiceService.create_invoice(db, customerProfileID, draftInvoice.vendorProfileID, totalPrice)
                
            order = OrderService.get_order_by_invoice_and_menuitem(db, invoice.invoiceID, draftInvoice.menuItemID)
            if (order is None):
                order = OrderService.create_order(db, draftInvoice.menuItemID, menuitem.menuItemName, draftInvoice.quantity, draftInvoice.quantity * menuitem.price, invoice.invoiceID)
            else:
                OrderService.update_order(db, order.orderID, draftInvoice.menuItemID, menuitem.menuItemName, draftInvoice.quantity, draftInvoice.quantity * menuitem.price, invoice.invoiceID)

            if (not new_invoice):
                InvoiceService.update_totalPrice(db, invoice.invoiceID)
            
            return {"invoiceID": invoice.invoiceID, "orderID": order.orderID}
        
        else:
            invoice = InvoiceService.get_invoice_by_customer_and_vendor_and_order_status(db, customerProfileID, draftInvoice.vendorProfileID, "DRAFT")
            orders = OrderService.delete_order_by_invoice_and_menuitem(db, invoice.invoiceID, draftInvoice.menuItemID)
            if (len(orders) < 1):
                InvoiceService.delete_invoice(db, invoice.invoiceID)
                return {"invoiceID": None}
            else:
                return {"invoiceID": invoice.invoiceID, "orderID": None}

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
    
    def delete_order(db, invoiceID):
        OrderService.delete_order_by_invoice(db, invoiceID.invoiceID)
        return InvoiceService.delete_invoice(db, invoiceID.invoiceID)
    
    def get_all_vendor_profile(db):
        return VendorProfileService.get_all_vendor_profile(db)