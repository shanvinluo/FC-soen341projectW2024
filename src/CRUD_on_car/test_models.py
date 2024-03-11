import os
from Vehicles_model import Car

def test_new_Vehicle():
    """
    GIVEN a Car model
    WHEN a new Car is created
    THEN check the vehicle id, the model name, number of seat, features, and the make name. Assert that they are defined correctly
    """
    car = Car(1234, 'Batmobile', 2, "throws explosives", "whatmakesmakes" )
    assert car.vehicule_id == 1234
    assert car.model_name == 'Batmobile'
    assert car.seats == 2
    assert car.features == 'throws explosives'
    assert car.make_name == 'whatmakesmakes'

