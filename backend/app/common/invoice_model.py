from pydantic import BaseModel
from datetime import datetime

class IsFavorite(BaseModel):
    invoiceID: int
    isFavorite: bool