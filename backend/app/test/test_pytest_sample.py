from fastapi.testclient import TestClient

from app.main import app
from app.service.user_service import UserService

client = TestClient(app)

def test_sample():
    response = client.get("/")
    assert response.status_code == 200
    