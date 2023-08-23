from fastapi import FastAPI
import uvicorn

from route import sample_router

app = FastAPI()

app.include_router(sample_router.router)

@app.get("/")
async def root():
    return {"message": "Hello World"}

if __name__ == "__main__":
    uvicorn.run("main:app", host = "127.0.0.1", port = 8000, reload = True)