from app.datasource.menu_item_gateway import MenuItemGateway

class MenuItemService:
    def __init__(self):
        pass

    def get_menu_item_for_vendor(db, vendorProfileId : int):
        return MenuItemGateway.get_menu_items_for_vendor(db, vendorProfileId)
    
    def create_menu_item_for_vendor(db, menuItem):
        return MenuItemGateway.create_menu_item(db, menuItem)
    
    def update_menu_item_for_vendor(db, menuItem):
        return MenuItemGateway.update_menu_item(db, menuItem)