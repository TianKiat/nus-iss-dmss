from app.service.menu_item_service import MenuItemService
from app.service.vendor_profile_service import VendorProfileService
from app.service.order_service import OrderService
from app.service.invoice_service import InvoiceService
from app.service.opening_hours_service import OpeningHoursService
from app.service.promotion_service import PromotionService
from app.common.user_model import UserID, VendorProfile
from app.models.menu_item import MenuItem
from app.models.promotion import Promotion
from app.common.menu_item_model import MenuItemModel
from app.common.opening_hours_model import OpeningHoursModel
from app.common.promotion_model import PromotionModel
from sqlalchemy import func
from datetime import datetime
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

        return MenuItemService.create_menu_item_for_vendor(db=db, menuItem=menuItem)
    
    def update_menu_item(db, menuItem : MenuItemModel):

        return MenuItemService.update_menu_item_for_vendor(db=db, menuItem=menuItem)
    
    def delete_menu_item(db, menuItemId : int):
        return MenuItemService.delete_menu_item_for_vendor(db=db, menuItemId=menuItemId)
    
    def get_promotions(db, userId: UserID):
        user_profile = VendorProfileService.get_vendor_profile(db, userId)
        if (user_profile is None):
            return []

        promos = PromotionService.get_promotions_for_vendor(db=db, vendorProfileID=user_profile.vendorProfileID)
        if len(promos) < 1:
            return []

        # result = []

        # for i in promos:
        #     item : Promotion = i
        #     result.append(item)
        return promos
    
    def create_promotion(db, promotion : PromotionModel):
        return PromotionService.create_promotion_for_vendor(db=db, promotion=promotion)
    
    def delete_promotion(db, promotionId : int):
        return PromotionService.delete_promotion_for_vendor(db=db, promotionId=promotionId)
    
    def get_opening_hours(db, userId: UserID):
        user_profile = VendorProfileService.get_vendor_profile(db, userId)
        if (user_profile is None):
            return []
        
        hours = OpeningHoursService.get_opening_hours_for_vendor(db=db, vendorProfileId=user_profile.vendorProfileID)

        # if hours is zero we initialize 
        if all(h is None for h in hours):
            opening_hours = []
            for i in range(1,8):
                opening_hour = OpeningHoursModel(openingHoursID=1, vendorProfileID=user_profile.vendorProfileID, day=i,openTime=datetime(2023,10,10,10,0,0),closingtTime=datetime(2023,10,10,18,0,0),isOpen=i < 6)
                opening_hours.append(opening_hour)
            
            hours = OpeningHoursService.update_opening_hours_for_vendor(db, openingHours=opening_hours)

        return hours
    
    def update_opening_hours(db, openingHours : List[OpeningHoursModel]):
        hours = OpeningHoursService.update_opening_hours_for_vendor(db=db, openingHours=openingHours)

        return hours