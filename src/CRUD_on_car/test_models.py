import os
from CRUD_on_car.Vehicles_model import Car

def test_new_Vehicle():
        """
        GIVEN a Car model
        WHEN a new Car is created
        THEN check the vehicle id, the model name, number of seat, features, and the make name. Assert that they are defined correctly
        """
        car = Car(1234, 'Batmobile', 2, "throws explosives", "whatmakesmakes", 2012, 1,"2024-02-05","2024-03-05", 505, 644, "sunflower seeds","manual", "magenta"  )
        assert car.vehicule_id == 1234
        assert car.model_name == 'Batmobile'
        assert car.seats == 2
        assert car.features == 'throws explosives'
        assert car.make_name == 'whatmakesmakes'
        assert car.model_year == 2012
        assert car.availability == 1
        assert car.availability_start_date == "2024-02-05"
        assert car.availability_end_date == "2024-03-05"
        assert car.price == 505
        assert car.fuel_type == "sunflower seeds"
        assert car.color == "magenta"
        assert car.mileage == 644
        assert car.transmission == "manual"

