from fastapi import APIRouter
from app.apicontroller.sample_controller import SampleController

router = APIRouter()

@router.get("/sample")
def get_sample():
    return [{"output":"sample output", "output": "another sample output"}]

@router.get("/sample/{input}")
def get_sample_input(input:str):
    return {"output": input}

@router.post("/sample")
def post_sample():
    result = SampleController.post_sample()
    return result

@router.put("/sample")
def put_sample():
    return "PUT called"

@router.delete("/sample")
def delete_sample():
    return "Delete called"