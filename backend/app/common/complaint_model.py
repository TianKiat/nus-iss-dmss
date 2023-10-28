from pydantic import BaseModel

class Complaint(BaseModel):
    title: str
    description: str
    comment: str
    userID: int
    roleID: int
    status: str = 'pending'

class ComplaintID(BaseModel):
    complaintID: int

class ComplaintUpdate(BaseModel):
    complaintID: int
    status: str