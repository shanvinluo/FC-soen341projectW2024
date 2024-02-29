from CRUD_on_car.VehiclesDB import create_app, db
from CRUD_on_car.Vehicles_model import Car
from flask import jsonify, abort, request


app1 = create_app('default')

@app1.route("/")
def hello_world():
    return "<p>Hello, World!</p>", 200 

@app1.route("/Cars/list", methods=["GET"])
def get_Cars():
    Cars = Car.query.all()
    return jsonify([Car.to_json() for Car in Cars])

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
    car = Car(
        vehicule_id=request.json.get('vehicule_id'),
        model_name=request.json.get('model_name'),
        seats=request.json.get('seats'),
        features=request.json.get("features"),
        make_name=request.json.get("make_name")
    )
    db.session.add(car)
    db.session.commit()
    return jsonify(car.to_json()), 201

@app1.route('/Car/<int:vehicule_id>', methods=['PUT'])
def update_Car(vehicule_id):
    if not request.json:
        abort(400)
    car = db.session.get(Car,vehicule_id)
    if car is None:
        abort(404)
    car.vehicule_id=request.json.get('vehicule_id', car.vehicule_id)
    car.model_name=request.json.get('model_name', car.model_name)
    car.seats=request.json.get('seats', car.seats)
    car.features=request.json.get("features", car.features)
    car.make_name=request.json.get("make_name", car.make_name)
    db.session.commit()
    return jsonify(car.to_json()),200

@app1.route("/Car/<int:vehicule_id>", methods=["DELETE"])
def delete_Car(vehicule_id):
    car = db.session.get(Car,vehicule_id)
    if car is None:
        abort(404)
    db.session.delete(car)
    db.session.commit()
    return jsonify({'result': True}),204


if __name__=='__main__':
    app1.run()
