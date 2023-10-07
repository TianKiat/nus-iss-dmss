from pydantic import BaseModel

class User(BaseModel):
    name: str
    username: str
    password: str
    email: str
    phone: str
    role: int
    otp: str

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
    otp: str

class Login(BaseModel):
    username: str
    password: str
    
class UserID(BaseModel):
    userID: int