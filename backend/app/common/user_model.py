from pydantic import BaseModel

class User(BaseModel):
    name: str
    username: str
    password: str
    email: str
    phone: str
    role: int

    def to_lowercase(self):
        return {
            'name': self.name.lower(),
            'username': self.username.lower(),
            'password': self.password,
            'email': self.email.lower(),
            'phone': self.phone,
            'role': self.role
        }

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
    
    def to_lowercase(self):
        return {
            'username': self.username.lower(),
            'password': self.password,
            'email': self.email.lower(),
            'phone': self.phone,
            'role': self.role,
            'shopAddr': self.shopAddr,
            'shopName': self.shopName.lower(),
            'shopDesc': self.shopDesc,
            'status': self.status
        }

class Login(BaseModel):
    username: str
    password: str
    
class UserID(BaseModel):
    userID: int

class IsFavorite(BaseModel):
    invoiceID: int
    isFavorite: bool