from pydantic import BaseModel, ConfigDict, StrictBool, PositiveInt, PositiveFloat, constr
from datetime import datetime
class PromotionModel(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    promotionID: PositiveInt
    promoCode: constr(max_length=516)
    discount: PositiveFloat
    discountType: constr(max_length=516)
    minimumSpending: PositiveFloat
    isValid: StrictBool
    vendorProfileID : PositiveInt