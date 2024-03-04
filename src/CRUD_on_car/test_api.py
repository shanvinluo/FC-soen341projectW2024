import requests
import pytest
from CRUD_on_car.Vehicles_CRUD import app1
from CRUD_on_car.Vehicles_model import Car
from CRUD_on_car.VehiclesDB import db
import time


ENDPOINT = "http://127.0.0.1:5000"

def test_can_call_endpoint():
    response = requests.get(ENDPOINT)
    assert response.status_code == 200

    #creates a temporary client that will throw requests to test the code
@pytest.fixture
def client():
    with app1.test_client() as client:
        with app1.app_context():
            db.create_all()
        yield client
        with app1.app_context():
            db.drop_all()


def test_create_car(client):
    response = client.post('/Car', json={'vehicule_id': 10, 'model_name': 'Batmobile', 'seats': 2, "features": "throws explosives, rubs ur back" ,"make_name": "into the unknown"})
        
    assert response.status_code == 201

        # Check if the car was created in the database
    car = Car.query.first()
    assert car.vehicule_id == 10
    assert car.model_name == 'Batmobile'
    assert car.seats == 2
    assert car.features == "throws explosives, rubs ur back"
    assert car.make_name == "into the unknown"
def test_get_cars(client):
    client.post("/Car", json={'vehicule_id': 10, 'model_name': 'Batmobile', 'seats': 2, "features": "throws explosives, rubs ur back" ,"make_name": "into the unknown"})
    client.post('/Car', json={'vehicule_id': 8, 'model_name': 'Audi TT', 'seats': 4, "features": "wines like a bitch, does wrum wrum" ,"make_name": "a piece of cake"})
    response = client.get("/Cars/list")
    print(response)
    assert response.status_code == 200
    data = response.get_json()
    assert isinstance(data, list)

    # Add assertions based on the expected data structure
    assert len(data) == 2  # Assuming you added two cars

    # Assert details for the first car
    assert data[1]['vehicule_id'] == 10
    assert data[1]['model_name'] == 'Batmobile'
    assert data[1]['seats'] == 2
    assert data[1]['features'] == "throws explosives, rubs ur back"
    assert data[1]['make_name'] == "into the unknown"

    # Assert details for the second car
    assert data[0]['vehicule_id'] == 8
    assert data[0]['model_name'] == 'Audi TT'
    assert data[0]['seats'] == 4
    assert data[0]['features'] == "wines like a bitch, does wrum wrum"
    assert data[0]['make_name'] == "a piece of cake"
    
def test_get_car(client):
        # Create a car in the database for testing retrieval
    client.post('/Car', json={'vehicule_id': 10, 'model_name': 'Batmobile', 'seats': 2, "features": "throws explosives, rubs ur back" ,"make_name": "into the unknown"})

    response = client.get('/Car/10')  # Assuming you have a route for retrieving a car by ID
    #time.sleep(1)    
    assert response.status_code == 200
    
    data = response.get_json()
    
    assert data["vehicule_id"] == 10
    assert data["model_name"] == 'Batmobile'
    assert data["seats"] == 2
    assert data["features"] == "throws explosives, rubs ur back"
    assert data["make_name"] == "into the unknown"

def test_update_car(client):
        # Create a car in the database for testing update
    client.post('/Car', json={'vehicule_id': 10, 'model_name': 'Batmobile', 'seats': 2, "features": "throws explosives, rubs ur back" ,"make_name": "into the unknown"})

        # Update the car
    response = client.put('/Car/10', json={'vehicule_id': 8, 'model_name': 'Audi TT', 'seats': 4, "features": "whines like a bitch, does wrum wrum" ,"make_name": "a piece of cake"})
        
    assert response.status_code == 200
    time.sleep(1)
        # Check if the car was updated in the database
    updated_car = Car.query.first()
    assert updated_car.vehicule_id == 8
    assert updated_car.model_name == 'Audi TT'
    assert updated_car.seats == 4
    assert updated_car.features == "whines like a bitch, does wrum wrum"
    assert updated_car.make_name == "a piece of cake"

def test_delete_car(client):
        # Create a car in the database for testing deletion
    client.post('/Car', json={'vehicule_id': 8, 'model_name': 'Audi TT', 'seats': 4, "features": "wines like a bitch, does wrum wrum" ,"make_name": "a piece of cake"})

    # Delete the car
    response = client.delete('/Car/8')  # Assuming you have a route for deleting a car by ID
    
    assert response.status_code == 204

    # Check if the car was deleted from the database
    deleted_car = Car.query.first()
    assert deleted_car is None