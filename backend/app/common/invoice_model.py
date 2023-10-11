from pydantic import BaseModel

class InvoiceID(BaseModel):
    invoiceID: int

class IsFavorite(BaseModel):
    invoiceID: int
    isFavorite: bool

class InvoiceStatus(BaseModel):
    invoiceID: int
    status: str

class DraftInvoice(BaseModel):
    userID: int
    vendorProfileID: int
    menuItemID: int
    quantity: int