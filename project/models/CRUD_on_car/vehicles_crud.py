"""Contains the crud operations for the the car object"""
from datetime import datetime
from flask import jsonify, abort, request
from sqlalchemy.exc import IntegrityError
from flask_cors import CORS
from CRUD_on_car.vehicles_db import create_app, db
from CRUD_on_car.vehicles_model import Car






app1 = create_app('default')

#allowed_methods = ["GET", "POST", "PUT", "DELETE"]
#allowed_headers = ["Content-Type", "Authorization"]

# Apply CORS with additional headers
#CORS(app1, origins='http://localhost:3000')

CORS(app1)
cors = CORS(app1, resources={r"/*": {"origins": "*"}})






#CORS(app1)
@app1.route("/")



@app1.route("/Cars/list", methods=["GET"])
def list_cars():
    """Gets a list of car objects from the database"""
    query = Car.query
    # Filters
    price_range = request.args.get('priceRange')
    start_desired_date = request.args.get('startDesiredDate')
    end_desired_date = request.args.get('endDesiredDate')
    fuel_type = request.args.get('fuel_type')
    color = request.args.get('color')
    mileage = request.args.get('mileage')
    transmission_type = request.args.get('transmissionType')
    year = request.args.get('year')
    postal_code=request.args.get('postal_code')

    if price_range:
        low, high = map(int, price_range.split('-'))
        query = query.filter(Car.price.between(low, high))

    if start_desired_date:
        start_desired_date_object=datetime.strptime(start_desired_date, '%Y-%m-%d').date()
        query = query.filter(Car.availability_start_date <= (start_desired_date_object))

    if end_desired_date:
        end_desired_date_object=datetime.strptime(end_desired_date, '%Y-%m-%d').date()
        query = query.filter(Car.availability_end_date >= (end_desired_date_object))

    if fuel_type:
        query = query.filter(Car.fuel_type==fuel_type)

    if color:
        query = query.filter(Car.color==color)

    if mileage:
        query = query.filter(Car.mileage <= int(mileage))

    if transmission_type:
        query = query.filter_by(transmission=transmission_type)

    if year:
        query = query.filter(Car.model_year == int(year))
    if postal_code:
        query = query.filter(Car.postal_code==postal_code)

    cars = query.all()
    return jsonify([{
        'vehicule_id': car.vehicule_id,
        'make_name': car.make_name,
        'model_name': car.model_name,
        'model_year': car.model_year,
        'price': car.price,
        'mileage': car.mileage,
        'fuel_type': car.fuel_type,
        'transmission': car.transmission,
        'color': car.color,
        'seats':car.seats,
        'availability_start_date':car.availability_start_date,
        'availability_end_date':car.availability_end_date,
        'postal_code':car.postal_code,
        # Include other fields as necessary
    } for car in cars])


@app1.route("/Car/<int:vehicule_id>", methods=["GET"])
def get_car(vehicule_id):
    """Gets a car object from the database"""
    car = db.session.get(Car,vehicule_id)
    if car is None:
        abort(404)


    return jsonify(car.to_json())

@app1.route('/Car', methods=['POST'])
def create_car():
    """Deletes a car from the database"""
    if not request.json:
        abort(400)
    #if the request is made without an id, alert the user
    if (not isinstance(request.json.get('vehicule_id'),int) or
        request.json.get('vehicule_id') is None):
        db.session.rollback()
        return "Must enter an ID that is composed of integers", 400

    elif (request.json.get("availability") != 1 and request.json.get("availability") != 0):

        return "The vehicle availability can't be anything other than 1 or 0", 400
    else:
        #increment the id, if such an id already exists
        cars = Car.query.all()
        car_ids = [ i.to_json()["vehicule_id"] for i in cars]
        check_id = request.json.get('vehicule_id')
        while check_id in car_ids:
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
            price = request.json.get("price"),
            mileage=request.json.get("mileage") ,
            fuel_type=request.json.get("fuel_type"),
            transmission=request.json.get("transmission"),
            color=request.json.get("color"),
            postal_code= request.json.get("postal_code")
        )
        db.session.add(car)
        db.session.commit()
        return jsonify(car.to_json()), 201

@app1.route('/Car/<int:vehicule_id>', methods=['PUT'])
def update_car(vehicule_id):
    """Updates the attributes of a car object, can be any number of values"""
    car = db.session.get(Car,vehicule_id)#fetch the car based on ID

    cars = Car.query.all()
    car_ids = [ i.to_json()["vehicule_id"] for i in cars] #Get all car ids
    #This incriments the id to avoid collision
    ################################
    check_id = request.json.get('vehicule_id', car.vehicule_id)
    while check_id in car_ids:
        check_id += 1
    ################################
    if car is None:
        abort(404)
    if not request.json:
        abort(400)

    if (request.json.get("availability") != 1 and request.json.get("availability") != 0):

        return "The vehicle availability can't be anything other than 1 or 0", 400
    car.vehicule_id=check_id
    car.model_name=request.json.get('model_name', car.model_name)
    car.seats=request.json.get('seats', car.seats)
    car.features=request.json.get("features", car.features)
    car.make_name=request.json.get("make_name", car.make_name)
    car.model_year = request.json.get("model_year", car.make_name)
    car.availability = request.json.get("availability", car.availability)
    car.availability_start_date = request.json.get("availability_start_date",
                                                   car.availability_start_date)
    car.availability_end_date = request.json.get("availability_end_date", car.availability_end_date)
    car.price = request.json.get("price", car.price)
    car.mileage=request.json.get("mileage",car.mileage)
    car.fuel_type=request.json.get("fuel_type",car.fuel_type)
    car.transmission=request.json.get("transmission",car.transmission)
    car.color=request.json.get("color",car.color)
    db.session.commit()
    return jsonify(car.to_json()),200

@app1.route("/Car/<int:vehicule_id>", methods=["DELETE"])
def delete_car(vehicule_id):
    """deletes a car from the database"""
    car = db.session.get(Car,vehicule_id)
    if car is None:
        abort(404)
    try:
        db.session.delete(car)
    except IntegrityError:
        return "The current car model serves as a parent row to another model. Can't delete it"
    except Exception as e1:
        return f"Unknown error: {e1}"
    db.session.commit()
    return jsonify({'result': True}),204


if __name__=='__main__':
    app1.run()
