import pytest 
from CRUD_on_user.user import app

ENDPOINT = "http://127.0.0.1:5000"


@pytest.fixture
def client():
    app.config['TESTING'] = True
    client = app.test_client()
    yield client

def test_get_user(client):
    responseBefore = client.get('/user')
    dataBefore = responseBefore.get_json()
    lengthBefore = 0

    if dataBefore != None:
        lengthBefore = len(dataBefore["users"])

    json1 = {"username": "Bron",
             "email":"@yourporch",
             "password":"grumb"}
    json2 = {"username": "Leroy",
             "email":"@yourbra",
             "password":"grunt"}
    
    sons_of_jay = [json1, json2]
    
    for son in sons_of_jay:
        client.post("/user", json = son)
    
    responseAfter = client.get('/user')
    
    dataAfter = responseAfter.get_json()
    lengthAfter = len(dataAfter["users"])
    print(lengthAfter)
    client.delete("/user/Leroy")
    client.delete("/user/Bron")
    assert responseAfter.status_code == 200
    assert 'users' in dataAfter
    #assert lengthBefore + 2 == lengthAfter
    
    

def test_add_user(client):
    response = client.post('/user', json={'username': 'test2', 'email': 'test@test.com', 'password': 'test', "status": 0})
    assert response.status_code == 201
    data = response.get_json()
    assert 'message' in data
    assert data['message'] == 'account created successfully!!'
    client.delete("/user/test2")

def test_delete_user(client):
    response = client.post('/user', json={'username': 'test1', 'email': 'test@test.com', 'password': 'test',"status": 0})
    assert response.status_code == 201
    response = client.delete('/user/test1')
    assert response.status_code == 200
    data = response.get_json()
    assert 'message' in data
    assert data['message'] == 'account deleted!'

def test_update_user(client):
    response = client.post('/user', json={'username': 'testmamba', 'email':"robynGood", 'password': 'test', "status": 0})
    assert response.status_code == 201
    response = client.put('/user/testmamba', json={'username': 'yourma', 'email': 'new_test@yourMaSPlace.com', 'password': 'new_test', "status": 0})
    assert response.status_code == 200
    data = response.get_json()
    assert 'message' in data
    assert data['message'] == 'account updated successfully'
    client.delete("/user/yourma")
