from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS #modification
app = Flask(__name__)
CORS(app) #modification
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
    if 'username' not in data or 'email' not in data or 'password' not in data:
        return jsonify({'error': 'Missing field!!'}), 400

    # Extraire les données de la requête
    username = data['username']
    email = data['email']
    password = data['password']
    cur = mysql.connection.cursor()
    hashed_password = generate_password_hash(password)
    cur.execute("INSERT INTO user_account (username, email, password) VALUES (%s, %s, %s)", (username, email, hashed_password))

    mysql.connection.commit()

    cur.close()

    return jsonify({'message': 'account created successfully!!'}), 201

    
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

    cur = mysql.connection.cursor()
    
    cur.execute("UPDATE user_account SET username = %s, email = %s, password = %s WHERE username = %s OR email = %s",
                (new_username, new_email, new_password, user, user))
    
    if cur.rowcount == 0:
        return jsonify({'error': f'No user with username or email "{user}" exists'}), 404
    
    mysql.connection.commit()
    cur.close()

    return jsonify({'message': 'account updated successfully'}), 200

if __name__ == '__main__':
    app.run(debug=True)


