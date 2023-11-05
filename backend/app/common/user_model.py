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

class Token(BaseModel):
    access_token: str
    token_type: str

class UserProfile(BaseModel):
    userProfileID: int
    profileName: str
    email: str
    phone: str
    userID: int

class VendorProfile(BaseModel):
    vendorProfileID: int
    profileName: str
    address: str
    email: str
    phone: str
    status: bool
    userID: int
    shopDesc: str

class UserStatus(BaseModel):
    userID: int
    isDisabled: int

class UserStatusByID(BaseModel):
    userID: int