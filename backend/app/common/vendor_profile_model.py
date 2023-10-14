from pydantic import BaseModel

class ProfileIDs(BaseModel):
    userID: int
    vendorProfileID: int