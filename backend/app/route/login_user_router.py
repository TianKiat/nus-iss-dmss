from fastapi import APIRouter
from apicontroller.login_user_controller import LoginUserController

from common.user_model import User

router = APIRouter()

@router.post("/login_user")
def login_user_account(user: User):
    result = LoginUserController.login_user(user)
    return user

