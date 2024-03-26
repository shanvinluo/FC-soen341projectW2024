import pytest, requests
from CRUD_on_car.Vehicles_CRUD import app1
from CRUD_on_car.VehiclesDB import db


ENDPOINT = "http://127.0.0.1:5000"

"""def test_can_call_endpoint():
    response = requests.get(ENDPOINT)
    assert response.status_code == 200
"""
    #creates a temporary client that will throw requests to test the code
@pytest.fixture
def client():
    with app1.test_client() as client:
        with app1.app_context():
            db.create_all()
        yield client
        with app1.app_context():
            try:
                db.session.close()
                db.drop_all()
            except:
                pass


def test_create_car(client):
    response = client.post('/Car', json={
                                        "vehicule_id": 123456,
                                        "make_name": "Toyota",
                                        "model_name": "Camry",
                                        "model_year": 2022,
                                        "price": 25000,
                                        "mileage": 15000,
                                        "fuel_type": "Gasoline",
                                        "transmission": "Automatic",
                                        "color": "Silver",
                                        "seats": 5,
                                        "availability_start_date": "2024-04-01",
                                        "availability_end_date": "2024-04-30",
                                        "availability": 1,
                                        "features": "Bulletproof windows",
                                        "postal_code": "H3H 1K4"
                                    })
        
    assert response.status_code == 201

        # Check if the car was created in the database
    car = client.get("/Car/123456").get_json()
    client.delete("/Car/123456")
    assert car['vehicule_id'] == 123456
    assert car['model_name'] == 'Camry'
    assert car['seats'] == 5
    assert car['make_name'] == "Toyota"
    assert car['model_year'] == 2022
    assert car['availability'] == True
    assert car['availability_start_date'] == "Mon, 01 Apr 2024 00:00:00 GMT"
    assert car['availability_end_date'] == "Tue, 30 Apr 2024 00:00:00 GMT"
    assert car['price'] == 25000
    assert car['features'] == "Bulletproof windows"
    assert car['postal_code'] == "H3H 1K4"

def test_get_cars(client):
    before = client.get("/Cars/list")
    client.post("/Car", json={
                            "vehicule_id": 123456,
                            "make_name": "Toyota",
                            "model_name": "Camry",
                            "model_year": 2022,
                            "price": 25000,
                            "mileage": 15000,
                            "fuel_type": "Gasoline",
                            "transmission": "Automatic",
                            "color": "Silver",
                            "seats": 5,
                            "availability_start_date": "2024-04-01",
                            "availability_end_date": "2024-04-30",
                            "availability": 1,
                            "features": "Bulletproof windows",
                            "postal_code": "H3H 1K4"
})
    client.post('/Car', json={
                                "vehicule_id": 987654,
                                "make_name": "Ford",
                                "model_name": "Mustang",
                                "model_year": 2023,
                                "price": 35000,
                                "mileage": 2000,
                                "fuel_type": "Gasoline",
                                "transmission": "Manual",
                                "color": "Red",
                                "seats": 4,
                                "availability_start_date": "2024-03-15",
                                "availability_end_date": "2024-04-15",
                                "availability": 1,
                                "features": "Bulletproof windows",
                                "postal_code": "H3H 1K4"
})
    after = client.get("/Cars/list")
    assert after.status_code == 200

    dataBefore = before.get_json() #list of car json objs inside the database prior to appending
    dataAfter = after.get_json()#list of data after appending
    dataBefore_length = 0
    if(dataBefore != None): 
        dataBefore_length = len(dataBefore)
    else:
        pass #if the list was initially empty we keep the length at 0

    client.delete("/Car/123456")
    client.delete("/Car/987654")
    assert isinstance(dataAfter, list)
    #assert len(dataAfter) == dataBefore_length + 2 #assert that the length has increased by 2
    
def test_get_car(client):
        # Create a car in the database for testing retrieval
    client.post('/Car', json={
                                "vehicule_id": 987654,
                                "make_name": "Ford",
                                "model_name": "Mustang",
                                "model_year": 2023,
                                "price": 35000,
                                "mileage": 2000,
                                "fuel_type": "Gasoline",
                                "transmission": "Manual",
                                "color": "Red",
                                "seats": 4,
                                "availability_start_date": "2024-03-15",
                                "availability_end_date": "2024-04-15",
                                "availability": 1,
                                "features": "Bulletproof windows",
                                "postal_code": "H3H 1K4"

})

    response = client.get('/Car/987654')  # Assuming you have a route for retrieving a car by ID    
    assert response.status_code == 200
    data = response.get_json()
    #print(data['availability_end_date'])
    client.delete('/Car/40')
    assert data['vehicule_id'] == 987654
    assert data['make_name'] == "Ford"
    assert data['model_name'] == "Mustang"
    assert data['model_year'] == 2023
    assert data['price'] == 35000
    assert data['mileage'] == 2000
    assert data['fuel_type'] == "Gasoline"
    assert data['transmission'] == "Manual"
    assert data['color'] == "Red"
    assert data['seats'] == 4
    assert data['availability_start_date'] == "Fri, 15 Mar 2024 00:00:00 GMT"
    assert data['availability_end_date'] == "Mon, 15 Apr 2024 00:00:00 GMT"
    assert data['availability'] == 1  # Assuming 1 represents availability as True
    assert data['features'] == "Bulletproof windows"
    assert data['postal_code'] == "H3H 1K4"

def test_update_car(client):
    # Create a car in the database for testing update
    client.post('/Car', json={"vehicule_id": 987654,
                                "make_name": "Ford",
                                "model_name": "Mustang",
                                "model_year": 2023,
                                "price": 35000,
                                "mileage": 2000,
                                "fuel_type": "Gasoline",
                                "transmission": "Manual",
                                "color": "Red",
                                "seats": 4,
                                "availability_start_date": "2024-03-15",
                                "availability_end_date": "2024-04-15",
                                "availability": 1,
                                "features": "Bulletproof windows",
                                "postal_code": "H3H 1K4"})
    # Update the car
    response = client.put('/Car/987654', json={
                            "vehicule_id": 123456,
                            "make_name": "Toyota",
                            "model_name": "Camry",
                            "model_year": 2022,
                            "price": 25000,
                            "mileage": 15000,
                            "fuel_type": "Gasoline",
                            "transmission": "Automatic",
                            "color": "Silver",
                            "seats": 5,
                            "availability_start_date": "2024-04-01",
                            "availability_end_date": "2024-04-15",
                            "availability": 1,
                            "features": "Bulletproof windows",
                            "postal_code": "H3H 1K4"
})
        
    assert response.status_code == 200
    
    car = client.get("/Car/123456").get_json()
    client.delete("/Car/123456")
    assert car['vehicule_id'] == 123456
    assert car['model_name'] == 'Camry'
    assert car['seats'] == 5
    assert car['make_name'] == "Toyota"
    assert car['model_year'] == 2022
    assert car['availability'] == True
    assert car['availability_start_date'] == "Mon, 01 Apr 2024 00:00:00 GMT"
    assert car['availability_end_date'] == "Mon, 15 Apr 2024 00:00:00 GMT"
    assert car['price'] == 25000
    assert car['features'] == "Bulletproof windows"
    assert car['postal_code'] == "H3H 1K4"


# if there are no cars to display, 204!
def test_fetch_empty_database(client):
    response = client.get("/Cars/list")
    if response == []:
        assert response.status_code == 204
    #assert response.get_json().message == "Must enter an ID that is composed of integers"
#What will happen if the vehicule id is a string? 400!
def test_wrong_id_input(client):
    response = client.post("/Car", json = {'vehicule_id': "phone",
                                            'model_name':'Audi TT',
                                            'seats': 4,
                                            "features": "wines like a bitch, does wrum wrum",
                                            "make_name": "a piece of cake",
                                            "model_year": 2023,
                                            "availability": 1,
                                            "availability_start_date": "2024-02-05",
                                            "availability_end_date": "2024-03-05",
                                            "price": 234})
    assert response.status_code == 400



# What will happen if the vehicule id isn't specified? 400! spartans were there the legend goes
def test_post_Null_car(client):
    response  = client.post("/Car", json = {'vehicule_id': None,
                                            'model_name':'',
                                            'seats': "",
                                            "features": "",
                                            "make_name": "",
                                            "model_year": "",
                                            "availability": "",
                                            "availability_start_date": "2024-02-05",
                                            "availability_end_date": "2024-03-05",
                                            "price": ""}) 
    assert response.status_code == 400
# tests the availability bit. Can't be anything other than 1 or 0
def test_post_availability(client):
    response  = client.post("/Car", json = {'vehicule_id': 6,
                                            'model_name':'',
                                            'seats': "",
                                            "features": "",
                                            "make_name": "",
                                            "model_year": "",
                                            "availability": 5,
                                            "availability_start_date": "2024-02-05",
                                            "availability_end_date": "2024-03-05",
                                            "price": ""}) 
    assert response.status_code == 400    

def test_delete_car(client):
        # Create a car in the database for testing deletion
    client.post('/Car', json={
                            "vehicule_id": 123456,
                            "make_name": "Toyota",
                            "model_name": "Camry",
                            "model_year": 2022,
                            "price": 25000,
                            "mileage": 15000,
                            "fuel_type": "Gasoline",
                            "transmission": "Automatic",
                            "color": "Silver",
                            "seats": 5,
                            "availability_start_date": "2024-04-01",
                            "availability_end_date": "2024-04-30",
                            "availability": 1,
                            "features": "Bulletproof windows",
                            "postal_code": "H3H 1K4"
})

    # Delete the car
    response = client.delete('/Car/123456')  # Assuming you have a route for deleting a car by ID
    assert response.status_code == 204
    
