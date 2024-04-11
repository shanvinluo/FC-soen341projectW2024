"""Tests the reservation crud operations"""
import pytest
from flask import json
from models.CRUD_on_reservation.reservation import app


@pytest
def client():
    """builds and breaks down a pseudo client
    that makes request using the crud operations"""
    app.config['TESTING'] = True
    client = app.test_client()
    yield client


def test_get_reservation(client):
    """Tests if the get crud operation works"""
    client.post("/reservation/create", json = { "reservation_id": 1,
                                                "date_start": "2024-02-23", 
                                                "date_end":"2024-05-30",
                                                "username": "lina",
                                                "vehicule_id": "9"
    })
    get_reservation = client.get("/reservation/1")
    assert get_reservation.status_code == 200
    data = json.loads(get_reservation.get_data(as_text=True))
    assert data["reservation_id"] == 1
    assert data['date_start'] == "Fri, 23 Feb 2024 00:00:00 GMT"
    assert data['date_end']  == "Thu, 30 May 2024 00:00:00 GMT"
    assert data['username'] == "lina"
    assert data['vehicule_id'] == 9
    client.delete("/reservation/1")

def test_create_reservation(client):
    """test the post crud operation"""
    data = {
        "reservation_id" : 4,
        'date_start': '2024-03-01',
        'date_end': '2024-03-05',
        'username': 'nahla',  # Make sure this username exists in the database
        'vehicule_id': 9  # Make sure this vehicule_id exists in the database
    }
    response = client.post('/reservation/create', json=data)
    assert response.status_code == 201
    data = json.loads(response.get_data(as_text=True))
    assert 'message' in data
    assert data['message'] == 'Reservation succeed!!'
    client.delete("/reservation/4")

def test_modify_reservation(client):
    """Tests the modify reservation crud operation"""
    data_post = {
        "reservation_id": 1,
        'date_start': '2024-03-01',
        'date_end': '2024-03-07',
        'username':'test',
        'vehicule_id': 9
    }
    client.post("/reservation/create", json = data_post)
    data_put = {
        "reservation_id": 5,
        'date_start': '2024-02-01',
        'date_end': '2024-03-07',
        'username':'lina',
        'vehicule_id': 9
    }
    response = client.put('/reservation/5', json=data_put)
    assert response.status_code == 200
    data = json.loads(response.get_data(as_text=True))
    assert 'message' in data
    assert data['message'] == 'Reservation modified successfully'
    client.delete("/reservation/5")

def test_delete_reservation(client):
    """tests the delete crud operation"""
    client.post("/reservation/create", json = { "reservation_id": 2,
                                                "date_start": "2024-02-23", 
                                                "date_end":"2024-05-30",
                                                "username": "test",
                                                "vehicule_id": "9"
    })
    response = client.delete('/reservation/2')
    assert response.status_code == 200
    data = json.loads(response.get_data(as_text=True))
    assert 'message' in data
    assert data['message'] == 'your reservation got canceled correctly!!'
