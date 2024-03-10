import pytest, requests
from CRUD_on_reservation.reservation import app, mysql
from flask import request, json
from unittest.mock import MagicMock
@pytest.fixture
def client():
    app.config['TESTING'] = True
    client = app.test_client()
    yield client


def test_get_reservation(client):
    response = client.get('/reservation/30')
    assert response.status_code == 200
    data = json.loads(response.get_data(as_text=True))
    print(data)
    
    assert data['date_start'] == "Sat, 27 Jul 2024 00:00:00 GMT"
    assert data['date_end']  == "Fri, 27 Sep 2024 00:00:00 GMT"
    assert data['username'] == "nacho"
    assert data['vehicule_id'] == 100

def test_create_reservation(client):
    data = {
        'date_start': '2024-03-01',
        'date_end': '2024-03-05',
        'username': 'new_username',  # Make sure this username exists in the database
        'vehicule_id': 33  # Make sure this vehicule_id exists in the database
    }
    response = client.post('/reservation/create', json=data)
    assert response.status_code == 201
    data = json.loads(response.get_data(as_text=True))
    print(data)
    assert 'message' in data
    assert data['message'] == 'Reservation succeed!!'
    


def test_modify_reservation(client):
    data = {
        'date_start': '2024-03-01',
        'date_end': '2024-03-07',
        'username':'new_username',
        'vehicule_id': 101
    }
    response = client.put('/reservation/30', json=data)
    assert response.status_code == 200
    data = json.loads(response.get_data(as_text=True))
    assert 'message' in data
    assert data['message'] == 'Reservation modified successfully'

def test_delete_reservation(client):
    response = client.delete('/reservation/30')
    assert response.status_code == 200
    data = json.loads(response.get_data(as_text=True))
    assert 'message' in data
    assert data['message'] == 'your reservation got canceled correctly!!'