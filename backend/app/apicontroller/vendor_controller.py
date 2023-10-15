from app.service.menu_item_service import MenuItemService
from app.service.vendor_profile_service import VendorProfileService
from app.service.order_service import OrderService
from app.service.invoice_service import InvoiceService
from app.service.opening_hours_service import OpeningHoursService
from app.common.user_model import UserID
from app.models.menu_item import MenuItem
from app.common.menu_item_model import MenuItemModel
from app.common.opening_hours_model import OpeningHoursModel
from sqlalchemy import func
from typing import List
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

        return MenuItemService.create_menu_item_for_vendor(db=db, menuItem=menuItem)
    
    def update_menu_item(db, menuItem : MenuItemModel):

        return MenuItemService.update_menu_item_for_vendor(db=db, menuItem=menuItem)
    
    def delete_menu_item(db, menuItemId : int):
        return MenuItemService.delete_menu_item_for_vendor(db=db, menuItemId=menuItemId)
    
    def get_opening_hours(db, userId: UserID):
        user_profile = VendorProfileService.get_vendor_profile(db, userId)
        if (user_profile is None):
            return []
        
        hours = OpeningHoursService.get_opening_hours_for_vendor(db=db, vendorProfileId=user_profile.vendorProfileID)

        # if hours is zero we initialize 
        if len(hours) == 0:
            opening_hours = []
            for i in range(1,7):
                opening_hours.append(                {
                    vendorProfileID : user_profile.vendorProfileID,
                    day : i,
                    openTime : func.str_to_date("2023-10-10 10:00:00", '%Y-%m-%d %H:%i:%s'),
                    closingtTime : func.str_to_date("2023-10-10 18:00:00", '%Y-%m-%d %H:%i:%s'),
                    isOpen : i < 6
                })
            
            hours = OpeningHoursService.update_opening_hours_for_vendor(db, openingHours=opening_hours)

        return hours
    
    def update_opening_hours(db, openingHours : List[OpeningHoursModel]):
        hours = OpeningHoursService.update_opening_hours_for_vendor(db=db, openingHours=openingHours)

        return hours