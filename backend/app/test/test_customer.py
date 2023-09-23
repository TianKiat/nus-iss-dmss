from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_access_control_user():
    # test with existing data
    data = {"roleID": 1}
    expected_result = {
        "accessName": "ACCESS 1",
        "accessURL": "frontend/src/pages/viewAccounts",
        "accessID": 1
    }

    response = client.post("/access_control_user", params=data)
    assert response.status_code == 200
    assert response.json() == expected_result

    # test with non-existing data
    data = {"roleID": 0}
    expected_result = []

    response = client.post("/access_control_user", params=data)
    assert response.status_code == 200
    assert response.json() == expected_result

    # test with invalid data
    data = {"roleID": "abc"}

    response = client.post("/access_control_user", params=data)
    assert response.status_code == 422