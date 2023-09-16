from pydantic import BaseModel

class Customer(BaseModel):
    name: str
    username: str
    password: str
    email: str
    phone: str
    role: int

class Vendor(Customer):
    address: str
    status: int
    # shopName: str
    # shopDesc: str
