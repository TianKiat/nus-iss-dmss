from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from app.route import user_profile_router, sample_router, register_user_router, login_user_router, dashboard_user_router, customer_user_router, vendor_user_router, complaint_router, access_control_router, update_user_status_router

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
app.include_router(dashboard_user_router.router)
app.include_router(customer_user_router.router)
app.include_router(vendor_user_router.router)
app.include_router(user_profile_router.router)
app.include_router(complaint_router.router)
app.include_router(access_control_router.router)
app.include_router(update_user_status_router.router)

@app.get("/")
async def root():
    return {"message": "Hello World"}

if __name__ == "__main__":
    uvicorn.run("main:app", host = "127.0.0.1", port = 8000, reload = True)
