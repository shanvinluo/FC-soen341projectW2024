from CRUD_on_car.VehiclesDB import db

class Car(db.Model):

    __tablename__ = "vehicule"
    vehicule_id = db.Column(db.Integer,primary_key=True)
    model_name = db.Column(db.String(50))
    seats = db.Column(db.Integer)
    features = db.Column(db.String(150))
    make_name = db.Column(db.String(50))
    model_year = db.Column(db.Integer)
    availability = db.Column(db.Integer)
    availability_start_date = db.Column(db.Date)
    availability_end_date = db.Column(db.Date)
    price = db.Column(db.Integer)
 
    def __init__(self,vehicule_id, model_name, seats, features, make_name, model_year, availability,availability_start_date, availability_end_date,price):
        self.vehicule_id= vehicule_id
        self.model_name= model_name
        self.seats = seats
        self.features = features
        self.make_name = make_name
        self.model_year = model_year
        self.availability = availability
        self.availability_start_date = availability_start_date
        self.availability_end_date = availability_end_date
        self.price = price
        
    def to_json(self):
        return {
            'vehicule_id': self.vehicule_id,
            'model_name': self.model_name,
            'seats': self.seats,
            'features': self.features,
            'make_name': self.make_name,
            "model_year": self.model_year,
            "availability": self.availability,
            'availability_start_date': self.availability_start_date, 
            'availability_end_date': self.availability_end_date, 
            "price" : self.price

        }
if(__name__) == "__main__":
    def test_new_Vehicle():
        """
        GIVEN a Car model
        WHEN a new Car is created
        THEN check the vehicle id, the model name, number of seat, features, and the make name. Assert that they are defined correctly
        """
        car = Car(1234, 'Batmobile', 2, "throws explosives", "whatmakesmakes", 2012, 1,"2024-02-05","2024-03-05", 505  )
        assert car.vehicule_id == 1234
        assert car.model_name != 'Batmobile'
        assert car.seats == 2
        assert car.features == 'throws explosives'
        assert car.make_name == 'whatmakesmakes'
        assert car.model_year == 2012
        assert car.availability == 1
        assert car.availability_start_date == "2024-02-05"
        assert car.availability_end_date == "2024-03-05"
        assert car.price == 505
