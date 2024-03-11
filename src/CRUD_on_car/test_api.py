import pytest, requests
from CRUD_on_car.Vehicles_CRUD import app1
from CRUD_on_car.VehiclesDB import db


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
            try:
                db.session.close()
                db.drop_all()
            except:
                pass


def test_create_car(client):
    response = client.post('/Car', json={'vehicule_id': 5,
                                        'model_name': 'Batmobile',
                                        'seats': 2,
                                        "features": "throws explosives, rubs ur back",
                                        "make_name": "into the unknown",
                                        "model_year": 2023,
                                        "availability": 1,
                                        "availability_start_date": "2024-03-04",
                                        "availability_end_date": "2024-03-05",
                                        "price": 234})
        
    assert response.status_code == 201

        # Check if the car was created in the database
    car = client.get("/Car/5").get_json()
    client.delete("/Car/5")
    assert car['vehicule_id'] == 5
    assert car['model_name'] == 'Batmobile'
    assert car['seats'] == 2
    assert car['features'] == "throws explosives, rubs ur back"
    assert car['make_name'] == "into the unknown"
    assert car['model_year'] == 2023
    assert car['availability'] == 1
    assert car['availability_start_date'] == "Mon, 04 Mar 2024 00:00:00 GMT"
    assert car['availability_end_date'] == "Tue, 05 Mar 2024 00:00:00 GMT"
    assert car['price'] == 234

def test_get_cars(client):
    before = client.get("/Cars/list")
    client.post("/Car", json={'vehicule_id': 10,
                            'model_name': 'Batmobile',
                            'seats': 2,
                            "features": "throws explosives, rubs ur back"
                            ,"make_name": "into the unknown",
                            "model_year": 2023,
                            "availability": 1,
                            'availability_start_date':"2024-02-05",
                            "availability_end_date": "2024-03-05",
                            "price": 234})
    client.post('/Car', json={'vehicule_id': 8,
                              'model_name':'Audi TT',
                              'seats': 4,
                              "features": "wines like a bitch, does wrum wrum",
                              "make_name": "a piece of cake",
                              "model_year": 2023,
                              "availability": 1,
                              "availability_start_date": "2024-02-05",
                              "availability_end_date": "2024-03-05",
                              "price": 234})
    after = client.get("/Cars/list")
    assert after.status_code == 200

    dataBefore = before.get_json() #list of car json objs inside the database prior to appending
    dataAfter = after.get_json()#list of data after appending
    dataBefore_length = 0
    if(dataBefore != None): 
        dataBefore_length = len(dataBefore)
    else:
        pass #if the list was initially empty we keep the length at 0
    """assert dataAfter[0]['vehicule_id'] == 8
    assert dataAfter[0]['model_name'] == 'Audi TT'
    assert dataAfter[0]['seats'] == 4
    assert dataAfter[0]["features"] == "wines like a bitch, does wrum wrum"
    assert dataAfter[0]["make_name"] == "a piece of cake"
    assert dataAfter[0]["model_year"] == 2023
    assert dataAfter[0]["availability"] == 1
    assert dataAfter[0]["availability_start_date"] == "Mon, 05 Feb 2024 00:00:00 GMT"
    assert dataAfter[0]["availability_end_date"] == "Tue, 05 Mar 2024 00:00:00 GMT"
    assert dataAfter[0]["price"] == 234

    assert dataAfter[1]['vehicule_id'] == 10
    assert dataAfter[1]['model_name'] == 'Batmobile'
    assert dataAfter[1]['seats'] == 2
    assert dataAfter[1]["features"] == "throws explosives, rubs ur back"
    assert dataAfter[1]["make_name"] == "into the unknown"
    assert dataAfter[1]["model_year"] == 2023
    assert dataAfter[1]["availability"] == 1
    assert dataAfter[1]["availability_start_date"] == "Mon, 05 Feb 2024 00:00:00 GMT"
    assert dataAfter[1]["availability_end_date"] == "Tue, 05 Mar 2024 00:00:00 GMT"
    assert dataAfter[1]["price"] == 234"""

    client.delete("/Car/8")
    client.delete("/Car/10")
    assert isinstance(dataAfter, list)
    assert len(dataAfter) == dataBefore_length + 2 #assert that the length has increased by 2
    
def test_get_car(client):
        # Create a car in the database for testing retrieval
    client.post('/Car', json={'vehicule_id': 40,
                              'model_name': 'Batmobile',
                              'seats': 2,
                              "features": "throws explosives, rubs ur back",
                              "make_name": "into the unknown",
                              "model_year": 2023,
                              "availability": 1,
                              'availability_start_date': "2024-02-05",
                              "availability_end_date": "2024-03-05",
                              "price": 234})

    response = client.get('/Car/40')  # Assuming you have a route for retrieving a car by ID    
    assert response.status_code == 200
    data = response.get_json()
    #print(data['availability_end_date'])
    client.delete('/Car/40')
    assert data["vehicule_id"] == 40
    assert data["model_name"] == 'Batmobile'
    assert data["seats"] == 2
    assert data["features"] == "throws explosives, rubs ur back"
    assert data["make_name"] == "into the unknown"
    assert data['model_year'] == 2023
    assert data['availability'] == 1
    assert data['availability_start_date'] == "Mon, 05 Feb 2024 00:00:00 GMT"
    assert data['availability_end_date'] == "Tue, 05 Mar 2024 00:00:00 GMT"
    assert data['price'] == 234

def test_update_car(client):
    # Create a car in the database for testing update
    client.post('/Car', json={'vehicule_id': 50,
                            'model_name': 'Batmobile',
                            'seats': 2,
                            "features": "throws explosives, rubs ur back"
                            ,"make_name": "into the unknown",
                            "model_year": 2023,
                            "availability": 1,
                            'availability_start_date': "2024-02-05",
                            "availability_end_date": "2024-03-05",
                            "price": 234})
    # Update the car
    response = client.put('/Car/50', json={'vehicule_id': 58,
                                            'model_name':'Audi TT',
                                            'seats': 4,
                                            "features": "wines like a bitch, does wrum wrum",
                                            "make_name": "a piece of cake",
                                            "model_year": 2023,
                                            "availability": 1,
                                            "availability_end_date": "2024-03-05",
                                            'availability_start_date': "2024-02-05",
                                            "price": 234})
        
    assert response.status_code == 200
    
    updated_car = client.get("/Car/58").get_json()
    client.delete("/Car/58")
    assert updated_car['vehicule_id'] == 58
    assert updated_car['model_name'] == 'Audi TT'
    assert updated_car['seats'] == 4
    assert updated_car['features'] == "wines like a bitch, does wrum wrum"
    assert updated_car['make_name'] == "a piece of cake"
    assert updated_car['model_year'] == 2023
    assert updated_car['availability'] == 1
    assert updated_car['availability_start_date'] == "Mon, 05 Feb 2024 00:00:00 GMT"
    assert updated_car['availability_end_date'] == "Tue, 05 Mar 2024 00:00:00 GMT"
    assert updated_car['price'] == 234

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
    client.post('/Car', json={'vehicule_id': 90,
                              'model_name':'Audi TT',
                              'seats': 4,
                              "features": "wines like a bitch, does wrum wrum",
                              "make_name": "a piece of cake",
                              "model_year": 2023,
                              "availability": 1,
                              "availability_start_date": "2024-02-05",
                              "availability_end_date": "2024-03-05",
                              "price": 234})

    # Delete the car
    response = client.delete('/Car/90')  # Assuming you have a route for deleting a car by ID
    assert response.status_code == 204
    
