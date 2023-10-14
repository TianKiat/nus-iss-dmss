from typing import List
from pydantic import BaseModel

class InvoiceID(BaseModel):
    invoiceID: int

class IsFavorite(BaseModel):
    invoiceID: int
    isFavorite: bool

class InvoiceStatus(BaseModel):
    invoiceID: int
    status: str
    discount: float = 0

class DraftInvoiceMenuItem(BaseModel):
    menuItemID: int
    quantity: int

class DraftInvoice(BaseModel):
    userID: int
    vendorProfileID: int
    menuItems: List[DraftInvoiceMenuItem]