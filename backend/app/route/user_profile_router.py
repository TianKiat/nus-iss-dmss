from fastapi import APIRouter
from app.apicontroller.user_profile_controller import UserProfileController

from app.common.user_model import User

router = APIRouter()

@router.get("/user_profile")
def get_user_profile():
    result = UserProfileController.get_user_profile()
    return result