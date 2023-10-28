from pydantic import BaseModel, ConfigDict, StrictBool, PositiveInt, constr
from datetime import datetime
class OpeningHoursModel(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    openingHoursID: PositiveInt
    vendorProfileID: PositiveInt
    day: PositiveInt
    openTime: datetime
    closingtTime: datetime
    isOpen: StrictBool 