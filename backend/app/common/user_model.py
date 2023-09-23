from pydantic import BaseModel

class User(BaseModel):
    name: str
    username: str
    password: str
    email: str
    phone: str
    role: int

class Vendor(User):
    address: str
    status: int
    # shopName: str
    # shopDesc: str

class Login(BaseModel):
    username: str
    password: str