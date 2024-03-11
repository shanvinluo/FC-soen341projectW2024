from CRUD_on_car.VehiclesDB import create_app, db
from CRUD_on_car.Vehicles_model import Car
from flask import jsonify, abort, request, make_response
from sqlalchemy.exc import IntegrityError
from flask_cors import CORS


app1 = create_app('default')
CORS(app1)
@app1.route("/")
def home():
    return "welcome"


@app1.route("/Cars/list", methods=["GET"])
def get_Cars():
    Cars = Car.query.all()
    cars_info = [car.to_json() for car in Cars]
    print(cars_info)
    if cars_info == []:
        abort(404)
    
    return jsonify(cars_info)

@app1.route("/Car/<int:vehicule_id>", methods=["GET"])
def get_Car(vehicule_id):
    car = db.session.get(Car,vehicule_id)
    if car is None:
        abort(404)
    

    return jsonify(car.to_json())

@app1.route('/Car', methods=['POST'])
def create_Car():

    if not request.json:
        abort(400)
    #if the request is made without an id, alert the user
    if (not isinstance(request.json.get('vehicule_id'),int) or request.json.get('vehicule_id') == None):
        db.session.rollback()
        return "Must enter an ID that is composed of integers", 400
    if (request.json.get("availability") != 1 or request.json.get("availability") != 0):
        return "The vehicle availability can't be anything other than 1 or 0", 400
    else:
        #increment the id, if such an id already exists
        cars = Car.query.all()
        car_ids = [ i.to_json()["vehicule_id"] for i in cars]
        check_id = request.json.get('vehicule_id')
        while(check_id in car_ids):
            check_id += 1
        request.json["vehicule_id"] = check_id

        car = Car(
            vehicule_id=request.json.get('vehicule_id'),
            model_name=request.json.get('model_name'),
            seats=request.json.get('seats'),
            features=request.json.get("features"),
            make_name=request.json.get("make_name"),
            model_year = request.json.get("model_year"),
            availability = request.json.get("availability"),
            availability_start_date = request.json.get("availability_start_date"),
            availability_end_date = request.json.get("availability_end_date"),
            price = request.json.get("price")
        )
        db.session.add(car)
        db.session.commit()
        return jsonify(car.to_json()), 201

@app1.route('/Car/<int:vehicule_id>', methods=['PUT'])
def update_Car(vehicule_id):
    car = db.session.get(Car,vehicule_id)#fetch the car based on ID

    cars = Car.query.all()
    car_ids = [ i.to_json()["vehicule_id"] for i in cars] #Get all car ids
    #This incriments the id to avoid collision
    ################################
    check_id = request.json.get('vehicule_id', car.vehicule_id)
    while(check_id in car_ids):
        check_id += 1
    ################################
    if car is None:
        abort(404)
    if not request.json:
        abort(400)
    if (request.json.get("availability") != 1 or request.json.get("availability") != 0):
        return "The vehicle availability can't be anything other than 1 or 0", 400
    car.vehicule_id=check_id
    car.model_name=request.json.get('model_name', car.model_name)
    car.seats=request.json.get('seats', car.seats)
    car.features=request.json.get("features", car.features)
    car.make_name=request.json.get("make_name", car.make_name)
    car.model_year = request.json.get("model_year", car.make_name)
    car.availability = request.json.get("availability", car.availability)
    car.availability_start_date = request.json.get("availability_start_date", car.availability_start_date)
    car.availability_end_date = request.json.get("availability_end_date", car.availability_end_date)
    car.price = request.json.get("price", car.price)
    db.session.commit()
    return jsonify(car.to_json()),200

@app1.route("/Car/<int:vehicule_id>", methods=["DELETE"])
def delete_Car(vehicule_id):

    car = db.session.get(Car,vehicule_id)
    if car is None:
        abort(404)
    try:
        db.session.delete(car)
    except IntegrityError as e:
        return "The current car model serves as a parent row to another model. Can't delete it"
    except Exception as e1:
        return f"Unknown error: {e1}"
    db.session.commit()
    return jsonify({'result': True}),204


if __name__=='__main__':
    app1.run()
