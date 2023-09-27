from pydantic import BaseModel

class User(BaseModel):
    name: str
    username: str
    password: str
    email: str
    phone: str
    role: int

class Vendor(BaseModel):
    username: str
    password: str
    email: str
    phone: str
    role: int
    shopAddr: str
    shopName: str
    shopDesc: str
    status: int

class Otp(BaseModel):
    email: str

class Login(BaseModel):
    username: str
    password: str
    