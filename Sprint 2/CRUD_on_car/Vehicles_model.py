from CRUD_on_car.VehiclesDB import db

class Car(db.Model):

    __tablename__ = "vehicule"
    vehicule_id = db.Column(db.Integer,primary_key=True)
    model_name = db.Column(db.String(50))
    seats = db.Column(db.Integer)
    features = db.Column(db.String(150))
    make_name = db.Column(db.String(50))
 
    def __init__(self,vehicule_id, model_name, seats, features, make_name):
        self.vehicule_id= vehicule_id
        self.model_name= model_name
        self.seats = seats
        self.features = features
        self.make_name = make_name
        
    def to_json(self):
        return {
            'vehicule_id': self.vehicule_id,
            'model_name': self.model_name,
            'seats': self.seats,
            'features': self.features,
            'make_name': self.make_name
        }
if(__name__) == "__main__":
    def test_new_Vehicle():
        """
        GIVEN a Car model
        WHEN a new Car is created
        THEN check the vehicle id, the model name, number of seat, features, and the make name. Assert that they are defined correctly
        """
        car = Car(1234, 'Batmobile', 2, "throws explosives", "whatmakesmakes" )
        assert car.vehicule_id == 1234
        assert car.model_name != 'Batmobile'
        assert car.seats == 2
        assert car.features == 'throws explosives'
        assert car.make_name == 'whatmakesmakes'