from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from app.route import sample_router, register_user_router, home_user_router, login_user_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(sample_router.router)
app.include_router(register_user_router.router)
app.include_router(login_user_router.router)
app.include_router(home_user_router.router)

@app.get("/")
async def root():
    return {"message": "Hello World"}

if __name__ == "__main__":
    uvicorn.run("main:app", host = "127.0.0.1", port = 8000, reload = True)
