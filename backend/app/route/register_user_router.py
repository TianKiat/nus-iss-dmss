from fastapi import APIRouter
from app.apicontroller.register_user_controller import RegisterUserController

from app.common.user_model import User

router = APIRouter()

@router.post("/register_user")
def register_user_account(user: User):
    result = RegisterUserController.register_user(user)
    return result
