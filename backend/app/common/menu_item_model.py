from pydantic import BaseModel, ConfigDict, StrictBool, PositiveInt, PositiveFloat, constr

class MenuItemModel(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    menuItemID: PositiveInt
    menuItemName: constr(max_length=50)
    price: PositiveFloat
    menuItemImage : str
    menuItemDesc: constr(max_length=250)
    isValid: StrictBool 
    vendorProfileID: PositiveInt