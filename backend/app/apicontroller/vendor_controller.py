from app.service.menu_item_service import MenuItemService
from app.service.vendor_profile_service import VendorProfileService
from app.service.order_service import OrderService
from app.service.invoice_service import InvoiceService
from app.service.user_profile_service import UserProfileService
from app.common.user_model import UserID, VendorProfile
from app.models.menu_item import MenuItem
from app.common.menu_item_model import MenuItemModel

class VendorController:
    def __init__ (self):
        pass

    def get_menu_items(db, userId: UserID):
        user_profile = VendorProfileService.get_vendor_profile(db, userId)
        if (user_profile is None):
            return []
        
        menuItems = MenuItemService.get_menu_item_for_vendor(db=db, vendorProfileId=user_profile.vendorProfileID)

        if len(menuItems) < 1:
            return []

        result = []

        for i in menuItems:
            item : MenuItem = i
            result.append(item)
        return result
    
    def get_vendor_profile_id(db, userId: UserID):
        user_profile = VendorProfileService.get_vendor_profile(db, userId)
        if (user_profile is None):
            return
        
        return user_profile
    
    def save_vendor_profile(self, db, vendorData: VendorProfile):
        return VendorProfileService.save_vendor_profile(db, vendorData)
    
    def get_orders(db, userId: UserID):
        user_profile = VendorProfileService.get_vendor_profile(db, userId)
        if (user_profile is None):
            return []
        invoices = InvoiceService.get_invoice_by_vendor(db, user_profile.vendorProfileID)
        if len(invoices) < 1:
            return []
        
        order_history = []
        for invoice in invoices:
            orders = OrderService.get_order_by_invoice(db, invoice.invoiceID)
            order_history.append({"invoice": invoice, "orders": orders})

        return order_history

    def create_menu_item(db, menuItem : MenuItemModel):
        # orm = MenuItem(menuItem.menuItemID,
        #                menuItem.menuItemName,
        #                menuItem.price,
        #                menuItem.menuItemImage,
        #                menuItem.menuItemDesc,
        #                menuItem.vendorProfileID)
        return MenuItemService.create_menu_item_for_vendor(db=db, menuItem=menuItem)
    
    def update_menu_item(db, menuItem : MenuItemModel):
        # orm = MenuItem(menuItem.menuItemID,
        #                menuItem.menuItemName,
        #                menuItem.price,
        #                menuItem.menuItemImage,
        #                menuItem.menuItemDesc,
        #                menuItem.vendorProfileID)
        return MenuItemService.update_menu_item_for_vendor(db=db, menuItem=menuItem)
    
    def delete_menu_item(db, menuItemId : int):
        return MenuItemService.delete_menu_item_for_vendor(db=db, menuItemId=menuItemId)