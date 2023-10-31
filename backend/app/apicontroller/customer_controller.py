from app.service.user_profile_service import UserProfileService
from app.service.vendor_profile_service import VendorProfileService
from app.service.order_service import OrderService
from app.service.invoice_service import InvoiceService
from app.service.menu_item_service import MenuItemService
from app.service.promotion_service import PromotionService
from app.apicontroller.vendor_controller import VendorController

class CustomerController:
    def __init__ (self):
        pass

    def update_order_basket(self, db, draftInvoice):
        customerProfileID = UserProfileService.get_user_profile_by_user(db, draftInvoice.userID).userProfileID
        if (len(draftInvoice.menuItems) == 1 and draftInvoice.menuItems[0].quantity > 0):
            menuitem = MenuItemService.get_menu_item(db, draftInvoice.menuItems[0].menuItemID)

            new_invoice = False
            invoice = InvoiceService.get_invoice_by_customer_and_vendor_and_order_status(db, customerProfileID, draftInvoice.vendorProfileID, "DRAFT")
            if invoice is None:
                new_invoice = True
                totalPrice = draftInvoice.menuItems[0].quantity * menuitem.price
                invoice = InvoiceService.create_invoice(db, customerProfileID, draftInvoice.vendorProfileID, totalPrice)

            order = OrderService.get_order_by_invoice_and_menuitem(db, invoice.invoiceID, draftInvoice.menuItems[0].menuItemID)
            if order is None:
                order = OrderService.create_order(
                    db,
                    draftInvoice.menuItems[0].menuItemID,
                    menuitem.menuItemName,
                    draftInvoice.menuItems[0].quantity,
                    draftInvoice.menuItems[0].quantity * menuitem.price,
                    invoice.invoiceID
                )
            else:
                OrderService.update_order(
                    db,
                    order.orderID,
                    draftInvoice.menuItems[0].menuItemID,
                    menuitem.menuItemName,
                    draftInvoice.menuItems[0].quantity,
                    draftInvoice.menuItems[0].quantity * menuitem.price,
                    invoice.invoiceID
                )

            if not new_invoice:
                InvoiceService.update_totalPrice(db, invoice.invoiceID)

            return {"invoiceID": invoice.invoiceID, "orderID": order.orderID}

        elif len(draftInvoice.menuItems) == 1:
            invoice = InvoiceService.get_invoice_by_customer_and_vendor_and_order_status(db, customerProfileID, draftInvoice.vendorProfileID, "DRAFT")
            orders = OrderService.delete_order_by_invoice_and_menuitem(db, invoice.invoiceID, draftInvoice.menuItems[0].menuItemID)
            if len(orders) < 1:
                InvoiceService.delete_invoice(db, invoice.invoiceID)
                return {"invoiceID": None}
            else:
                return {"invoiceID": invoice.invoiceID, "orderID": None}

        else:
            invoice = InvoiceService.get_invoice_by_customer_and_vendor_and_order_status(db, customerProfileID, draftInvoice.vendorProfileID, "DRAFT")
            if invoice is None:
                menuItems = []
                menuItemsDetails = []
                totalPrice = 0
                for menuItemDetails in draftInvoice.menuItems:
                    menuItem = MenuItemService.get_menu_item(db, menuItemDetails.menuItemID)
                    if menuItem.isValid:
                        totalPrice += (menuItem.price * menuItemDetails.quantity)
                        menuItems.append(menuItem)
                        menuItemsDetails.append(menuItemDetails)

                if len(menuItems) > 1:
                    invoice = InvoiceService.create_invoice(db, customerProfileID, draftInvoice.vendorProfileID, totalPrice)

                    orderIDs = []
                    for i in range(len(menuItems)):
                        menuItem = menuItems[i]
                        menuItemDetails = menuItemsDetails[i]
                        order = OrderService.create_order(db, menuItem.menuItemID, menuItem.menuItemName, menuItemDetails.quantity, menuItemDetails.quantity * menuItem.price, invoice.invoiceID)
                        orderIDs.append(order.orderID)

                    return {"invoiceID": invoice.invoiceID, "orderIDs": orderIDs}

                else:
                    return {"invoiceID": None, "response": "All stated menu items have been removed. Please order manually."}

            else:
                return {"invoiceID": None, "response": "There is an order under the same store inside the basket. Please remove the order before re-order again."}

    def get_order_history(self, db, userID):
        user_profile = UserProfileService.get_user_profile_by_user(db, userID.userID)
        if user_profile is None:
            return []

        orderStatus = ["COMPLETED", "CANCELLED", "DONE", "PENDING"]
        invoices = InvoiceService.get_invoice_by_customer_and_order_status(db, user_profile.userProfileID, orderStatus)
        if len(invoices) < 1:
            return []

        order_history = []
        for invoice in invoices:
            vendor = VendorProfileService.get_vendor_profile_by_profile_ID(db, invoice.vendorProfileID)
            orders = OrderService.get_order_by_invoice(db, invoice.invoiceID)
            order_history.append({"invoice": invoice, "vendor": vendor, "orders": orders})
        return order_history

    def get_order_basket(self, db, userID):
        user_profile = UserProfileService.get_user_profile_by_user(db, userID.userID)
        if user_profile is None:
            return []

        orderStatus = ["DRAFT"]
        invoices = InvoiceService.get_invoice_by_customer_and_order_status(db, user_profile.userProfileID, orderStatus)
        if len(invoices) < 1:
            return []

        order_history = []
        for invoice in invoices:
            vendor = VendorProfileService.get_vendor_profile_by_profile_ID(db, invoice.vendorProfileID)
            orders = OrderService.get_order_by_invoice(db, invoice.invoiceID)
            order_history.append({"invoice": invoice, "vendor": vendor, "orders": orders})

        return order_history

    def update_favorite_order(self, db, isFavorite):
        return InvoiceService.update_isFavorite(db, isFavorite.invoiceID, isFavorite.isFavorite)

    def update_order_status(self, db, invoiceStatus):
        return InvoiceService.update_status(db, invoiceStatus.invoiceID, invoiceStatus.status, invoiceStatus.discount)

    def delete_order(self, db, invoiceID):
        OrderService.delete_order_by_invoice(db, invoiceID.invoiceID)
        return InvoiceService.delete_invoice(db, invoiceID.invoiceID)

    def get_valid_menu_item(self, db, profileIDs):
        customerProfile = UserProfileService.get_user_profile_by_user(db, profileIDs.userID)

        menuitems_orders = []
        menuitems = MenuItemService.get_valid_menu_item_for_vendor(db, profileIDs.vendorProfileID)
        invoice = InvoiceService.get_invoice_by_customer_and_vendor_and_order_status(db, customerProfile.userProfileID, profileIDs.vendorProfileID, "DRAFT")
        for menuitem in menuitems:
            if invoice is not None:
                order = OrderService.get_order_by_invoice_and_menuitem(db, invoice.invoiceID, menuitem.menuItemID)
                menuitems_orders.append({"menuItem": menuitem, "order": order})
            else:
                menuitems_orders.append({"menuItem": menuitem, "order": None})
        return menuitems_orders

    def get_all_vendor_profile(self, db):
        vendor_openingHours = []

        vendors = VendorProfileService.get_all_vendor_profile(db)
        for vendor in vendors:
            opening_hours = VendorController.get_opening_hours(db, vendor.userID)
            vendor_openingHours.append({"vendor": vendor, "opening_hours": opening_hours})

        return vendor_openingHours

    def get_promotion_verify(self, db, vendorProfileID, promoCode):
        return PromotionService.get_promotion_verify(db, vendorProfileID, promoCode)

    def get_promotion(self, db, vendorProfileID):
        return PromotionService.get_promotions_for_vendor(db, vendorProfileID)
