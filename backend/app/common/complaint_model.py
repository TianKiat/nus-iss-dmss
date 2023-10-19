from pydantic import BaseModel

class Complaint(BaseModel):
    title: str
    description: str
    comment: str
    userID: int
    roleID: int
    status: str = 'pending'
