from app.datasource.menu_item_gateway import MenuItemGateway

class MenuItemService:
    def __init__(self):
        pass

    def get_menu_item_for_vendor(db, vendorProfileId : int):
        return MenuItemGateway().get_menu_items_for_vendor(db=db, vendorProfileId=vendorProfileId)
    
    def get_menu_item(db, menuItemID):
        return MenuItemGateway().get_menu_item(db=db, menuItemID=menuItemID)
    
    def get_valid_menu_item_for_vendor(db, vendorProfileId : int):
        return MenuItemGateway().get_valid_menu_item_for_vendor(db=db, vendorProfileId=vendorProfileId)
    
    def create_menu_item_for_vendor(db, menuItem):
        return MenuItemGateway().create_menu_item(db=db, menuItem=menuItem)
    
    def update_menu_item_for_vendor(db, menuItem):
        return MenuItemGateway().update_menu_item(db=db, menuItem=menuItem)
    
    def delete_menu_item_for_vendor(db, menuItemId):
        return MenuItemGateway().delete_menu_item(db=db, menuItemId=menuItemId)