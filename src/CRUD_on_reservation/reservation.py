from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
# Configure MySQL
app.config['MYSQL_HOST'] = 'sql5.freemysqlhosting.net'
app.config['MYSQL_USER'] = 'sql5686988'
app.config['MYSQL_PASSWORD'] = 'jSrGqLGIWE'
app.config['MYSQL_DB'] = 'sql5686988'
app.config['MYSQL_PORT'] = 3306

mysql = MySQL(app)



@app.route('/reservation/<int:id>', methods=['GET'])
def get_reservation(id):
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM reservation WHERE reservation_id = %s", (id,))
    reservation = cur.fetchone()
    cur.close()
    if not reservation:
        return jsonify({'error': 'not existing reservation !!'}), 404
    return jsonify({
        'reservation_id': reservation[0],
        'date_start': reservation[1],
        'date_end': reservation[2],
        'username': reservation[3],
        'vehicule_id': reservation[4]
    }), 200

#the reservation id id is already auto incremented
# si tu veux a partir du terminal verifier ce method
#curl -X POST -H "Content-Type: application/json" -d '{"date_start": "2024-02-27", "date_end": "2024-03-05", "username": "new_username", "vehicule_id": 1234}' http://127.0.0.1:5000/reservation/create
#make sure vehicule_id exist in the data base and same for username
#of not existant then wont work 
@app.route('/reservation/create', methods=['POST'])
def create_reservation():
    cur = mysql.connection.cursor()

    data = request.json 
    reservation_id = data["reservation_id"]
    date_start = data['date_start']
    date_end = data['date_end']
    username = data['username']
    vehicule_id = data['vehicule_id']
     #if not exist (userrname or id of the car), throw message for the error
     
    cur.execute("SELECT * FROM user_account WHERE username = %s", (username,))
    user = cur.fetchone()

    if not user:
        return jsonify({'error': 'the username you entered does not exist'}), 400
    
    cur.execute("SELECT * FROM vehicule WHERE vehicule_id = %s", (vehicule_id,))
    vehicule = cur.fetchone()
    
    vehicule_availability = vehicule[6]#vehicle availability fetched from the car database

    if not vehicule:
        #not the good id for the vehicle
        return jsonify({'error': 'the vehicle does not exist'}), 400
    
    if vehicule_availability == 0:
         #if the vehicle isn't available, no reservation for you, sweetheart
         return jsonify({'error': 'the vehicle is not available for rent'}), 400
    
    
    cur.execute("INSERT INTO reservation (reservation_id, date_start, date_end, username, vehicule_id) VALUES (%s, %s, %s, %s, %s)", (reservation_id, date_start, date_end, username, vehicule_id))
    mysql.connection.commit()
    cur.close()
    #succeed message
    return jsonify({'message': 'Reservation succeed!!'}), 201

#to test it frm terminal 
#curl -X DELETE http://127.0.0.1:5000/reservation/(PUT ID THAT YOU WANT TO DELETE)
@app.route('/reservation/<int:id>', methods=['DELETE'])
def delete_reservation(id):
    cur = mysql.connection.cursor()

    cur.execute("SELECT * FROM reservation WHERE reservation_id = %s", (id,)) 
    user = cur.fetchone() #get the reservation
    #cur.execute("SELECT * FROM vehicule WHERE vehicule_id = %s", (vehicule_id,))
    #vehicule = cur.fetchone() #fetch that car
    if not user:
        #if no such reservation, dne
        return jsonify({'error': 'reservation does not exist'}), 400
    
    vehicule_id = user[4] #get the id of the reserved car
    cur.execute("DELETE FROM reservation WHERE reservation_id = %s", (id,)) #delete reservation if it's there
    cur.execute("UPDATE vehicule SET availability = %s WHERE vehicule_id = %s",(1, vehicule_id)) #once the reservation has been updated, the car has become available
    mysql.connection.commit()
    cur.close()
    #deletion succeded message
    return jsonify({'message': 'your reservation got canceled correctly!!'}), 200



@app.route('/reservation/<int:id>', methods=['PUT'])
def modify_reservation(id):
    cur = mysql.connection.cursor()

    # Retrieve existing reservation details
    cur.execute("SELECT * FROM reservation WHERE reservation_id = %s", (id,))
    existing_reservation = cur.fetchone()

    if not existing_reservation:
        return jsonify({'error': 'Reservation not found'}), 404

    # get update
    data = request.json 
    reservation_id = data["reservation_id"]
    date_start_new = data['date_start']
    date_end_new = data['date_end']
    vehicule_id_new = data['vehicule_id'] #get the new reservation's car id
    vehicule_id_old = existing_reservation[4] #get the existing reservation's car id

    if vehicule_id_new == vehicule_id_old:
        # if the car is the same, change the dates
        cur.execute("UPDATE reservation SET date_start = %s, date_end = %s, vehicule_id = %s WHERE reservation_id = %s",
                (date_start_new, date_end_new, vehicule_id_new, id))
    else:
        #if the cars are different, assign appropriate availability to each car
        cur.execute("UPDATE vehicule SET availability = %s WHERE vehicule_id = %s",(0, vehicule_id_new)) 
        cur.execute("UPDATE vehicule SET availability = %s WHERE vehicule_id = %s",(1, vehicule_id_old)) 
        #update everything
        cur.execute("UPDATE reservation SET reservation_id = %s, date_start = %s, date_end = %s, vehicule_id = %s WHERE reservation_id = %s",
                (reservation_id, date_start_new, date_end_new, vehicule_id_new, id))
    mysql.connection.commit()
    cur.close()

    #message to say modified correctly
    return jsonify({'message': 'Reservation modified successfully'}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5001)


