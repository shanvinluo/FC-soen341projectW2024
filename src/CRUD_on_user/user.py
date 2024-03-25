from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS #modification
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders

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
def receive_pdf_and_email():
    
    if request.method == 'POST':
        # Check if request contains a PDF file
        if 'application/pdf' in request.content_type:
            pdf_data = request.data
            # Process the received PDF data here
            # For example, save it to a file
            with open('received_pdf.pdf', 'wb') as f:
                f.write(pdf_data)

            # Check if the request contains email data
            if 'email' in request.form:
                email = request.form['email']
                # Process the received email here
                print('Email received:', email)
                # You can perform further actions with the email data here

            return 'PDF and email received successfully', 200
        else:
            return 'Unsupported Media Type', 415
    else:
        return 'Method Not Allowed', 405



















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


