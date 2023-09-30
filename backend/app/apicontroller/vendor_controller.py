from app.service.menu_item_service import MenuItemService
from app.service.vendor_profile_service import VendorProfileService
from app.service.order_service import OrderService
from app.service.invoice_service import InvoiceService
from app.common.user_model import UserID
from app.models.menu_item import MenuItem
from app.common.menu_item_model import MenuItemModel
class VendorController:
    def __init__ (self):
        pass

    def get_menu_items(db, userId: UserID):
        user_profile = VendorProfileService.get_vendor_profile(db, userId)
        if (user_profile is None):
            return []
        
        menuItems = MenuItemService.get_menu_item_for_vendor(db, user_profile.vendorProfileID)

        if len(menuItems) < 1:
            return []

        result = []

        for i in menuItems:
            item : MenuItem = i
            result.append(MenuItemModel.model_validate(item))
        return result

    def create_menu_item(db, menuItem : MenuItemModel):
        return MenuItemModel.model_validate(MenuItemService.create_menu_item_for_vendor(db, menuItem))
    
    def update_menu_item(db, menuItem : MenuItemModel):
        return MenuItemModel.model_validate(MenuItemService.update_menu_item_for_vendor(db, menuItem))