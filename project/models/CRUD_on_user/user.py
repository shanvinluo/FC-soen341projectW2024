from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS #modification
from Gmail_Api import sendMessage

app = Flask(__name__)


CORS(app) #modification

cors = CORS(app, resources={r"/*": {"origins": "*"}})
# Configure MySQL


app.config['MYSQL_HOST'] = 'sql5.freemysqlhosting.net'
app.config['MYSQL_USER'] = 'sql5686988'
app.config['MYSQL_PASSWORD'] = 'jSrGqLGIWE'
app.config['MYSQL_DB'] = 'sql5686988'
app.config['MYSQL_PORT'] = 3306

mysql = MySQL(app)

@app.route('/user', methods=['GET'])
def get_user():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM user_account")
    rows = cur.fetchall()
    cur.close()

    return jsonify({'users': rows})

@app.route('/user', methods=['POST'])
def add_user():
    data = request.json
    if 'username' not in data or 'email' not in data or 'password' not in data or 'status' not in data:
        return jsonify({'error': 'Missing field!!'}), 400


    username = data['username']
    email = data['email']
    password = data['password']
    status = int(data['status'])  #status c un int donc si employee 1 sinn ca mets 0
    cur = mysql.connection.cursor()
    hashed_password = generate_password_hash(password)
    cur.execute("INSERT INTO user_account (username, email, password, employee) VALUES (%s, %s, %s, %s)", (username, email, hashed_password, status))
    
    mysql.connection.commit()

    cur.close()

    return jsonify({'message': 'account created successfully!!','code': 'OK'}), 201


    
@app.route('/user/<string:user>', methods=['DELETE'])
def delete_user(user):
    cur = mysql.connection.cursor()
    cur.execute("DELETE FROM user_account WHERE username = %s OR email = %s", (user, user))
    
    if cur.rowcount == 0:
        return jsonify({'error': f'No user with username or email "{user}" exists'}), 404
    
    mysql.connection.commit()
    cur.close()
    return jsonify({'message': 'account deleted!'}), 200

@app.route('/user/<string:user>', methods=['PUT'])
def update_user(user):
    data = request.json
    if 'username' not in data or 'email' not in data or 'password' not in data:
        return jsonify({'error': 'Missing field!!'}), 400

    new_username = data['username']
    new_email = data['email']
    new_password = generate_password_hash(data['password'])
    #new_password = generate_password_hash(data['password'])

    cur = mysql.connection.cursor()
    
    
    cur.execute("UPDATE user_account SET username = %s, email = %s, password = %s WHERE username = %s OR email = %s",
                (new_username, new_email, new_password, user, user))
    
    if cur.rowcount == 0:
        return jsonify({'error': f'No user with username or email "{user}" exists'}), 404
    
    mysql.connection.commit()
    cur.close()

    return jsonify({'message': 'account updated successfully'}), 200

@app.route('/user-location/<string:username>', methods=['PUT'])
def update_location(username):


    data = request.json
    if 'postal_code' not in data:
        return jsonify({'error': 'Missing postal_code field'}), 400

    postal_code = data['postal_code']
    cur = mysql.connection.cursor()

    cur.execute("SELECT * FROM user_account WHERE username = %s", (username,))
    user = cur.fetchone()
    if not user:
        return jsonify({'error': f'User "{username}" not found'}), 404

    cur.execute("UPDATE user_account SET postal_code = %s WHERE username = %s", (postal_code, username))
    mysql.connection.commit()
    cur.close()

    return jsonify({'message': f'Postal code updated for user "{username}"'}), 200


@app.route('/user/verification', methods=['POST'])
def receiveVerificationInfo():
    receipt = """
                                                                                             Receipt
    1. Rental Terms and Conditions:\n
    - The Renter acknowledges receiving the vehicle described above in good condition and agrees to return it to the Rental Company in the same condition, subject to normal wear and tear.\n
    - The Renter agrees to use the vehicle solely for personal or business purposes and not for any illegal activities.\n
    - The Renter agrees to pay the Rental Company the agreed-upon rental rate for the specified rental period. Additional charges may apply for exceeding the mileage limit, late returns, fuel refueling, or other damages.\n
    - The Renter agrees to bear all costs associated with traffic violations, tolls, and parking fines incurred during the rental period.\n
    - The Renter acknowledges that they are responsible for any loss or damage to the vehicle, including theft, vandalism, accidents, or negligence, and agrees to reimburse the Rental Company for all repair or replacement costs.\n
    - The Renter agrees to return the vehicle to the designated drop-off location at the agreed-upon date and time. Failure to do so may result in additional charges.\n
    - The Rental Company reserves the right to terminate this agreement and repossess the vehicle without prior notice if the Renter breaches any terms or conditions of this agreement.\n
    - The Renter acknowledges receiving and reviewing a copy of the vehicle's insurance coverage and agrees to comply with all insurance requirements during the rental period.\n

    2. Indemnification:\n
    - The Renter agrees to indemnify and hold harmless the Rental Company, its employees, agents, and affiliates from any claims, liabilities, damages, or expenses arising out of or related to the Renter's use of the vehicle.\n

    3. Entire Agreement:\n
    - This Agreement constitutes the entire understanding between the parties concerning the subject matter hereof and supersedes all prior agreements and understandings, whether written or oral.\n

    4. Execution Date:\n
    - The parties hereto have executed this Agreement as of the date first written above.\n
    """
    data = request.json
    if(data): 
        renter_info = data["RenterInformation"]
        vehicle_info = data["VehicleInformation"]
        rental_info = data["RentalDetails"]
        signature_info = data['SignatureDetails']

        renter_name = renter_info["Name"]
        renter_email = renter_info["Email"]
        renter_postal_code = renter_info["PostalCode"]
        renter_driver_license = renter_info["DriverLicense"]

        car_make = vehicle_info["CarMake"]
        car_model = vehicle_info["CarModel"]
        car_year = vehicle_info["Year"]
        car_color = vehicle_info["Color"]
        car_mileage = vehicle_info["Mileage"]
        car_license_plate = vehicle_info["LicencePlateNumber"]

        rent_start = rental_info["RentStart"]
        rent_end = rental_info["RentEnd"]
        pickup_location = rental_info["PickupLocation"]
        dropoff_location = rental_info["DropoffLocation"]

        signature = signature_info["Signature"]
        signee_name = signature_info["SigneeName"]
        signature_date = signature_info["Date"]
        
        all_variables = [
            renter_name, renter_email, renter_postal_code, renter_driver_license,
            car_make, car_model, car_year, car_color, car_mileage, car_license_plate,
            rent_start, rent_end, pickup_location, dropoff_location,
            signature, signee_name, signature_date
        ]
        keys = [
            "Name", "Email", "PostalCode", "DriverLicense",
            "CarMake", "CarModel", "Year", "Color", "Mileage", "LicencePlateNumber",
            "RentStart", "RentEnd", "PickupLocation", "DropoffLocation",
            "Signature", "SigneeName", "Date"
        ]
        for i in range(len(all_variables)):
            receipt += "\n" + keys[i] + ": " + str(all_variables[i]) +"\n"
        sendMessage(receipt, renter_email, "confirmation")
        
        return "good boy", 200
    else: return "so-so boy", 500


@app.route('/user/<string:username>', methods=['GET'])
def get_user_by_username(username):
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM user_account WHERE username = %s", (username,))
    user = cur.fetchone()
    cur.close()

    if user:
        user_data = {
            'username': user[0],
            'email': user[1],
            'password': user[2],  # Note: You should not return the actual password in a real-world application
            'employee': user[4],
            'postal_code': user[3],  # Assuming postal code is in the database
            # Add more fields as needed
        }
        return jsonify({'user': user_data}), 200
    else:
        return jsonify({'error': f'User with username "{username}" not found'}), 404


















#do not touch this fucntion plz
#its for the login


@app.route('/api/login', methods=['POST'])
def authenticate():
    data = request.json
    if 'username' not in data or 'password' not in data:
        return jsonify({'error': 'Missing field!!'}), 400

    new_username = data['username']
    new_password = data['password']
    print(new_password)
    #new_password = generate_password_hash(data['password'])

    cur = mysql.connection.cursor()
    
    cur.execute("SELECT * FROM user_account WHERE username = %s",  (new_username,))
    user = cur.fetchone()
    
    if user and check_password_hash(user[2], new_password):
        cur.close()
        return jsonify({'code':'OK'}), 200
    else: 
        cur.close()
        return jsonify({'code':'ERROR'}), 200


if __name__ == '__main__':
    app.run(debug=True, port=5002)
    # port=5002


