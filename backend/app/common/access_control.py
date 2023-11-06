from pydantic import BaseModel
from typing import List

class AccessRole(BaseModel):
    roleID: int

class AccessUpdate(BaseModel):
    roleID: int
    access_list: List[int] = None