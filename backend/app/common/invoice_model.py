from pydantic import BaseModel
from datetime import datetime

class InvoiceID(BaseModel):
    invoiceID: int

class IsFavorite(BaseModel):
    invoiceID: int
    isFavorite: bool

class InvoiceStatus(BaseModel):
    invoiceID: int
    status: str