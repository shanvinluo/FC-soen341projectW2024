from flask import Flask, request, jsonify
from flask_mysqldb import MySQL

app = Flask(__name__)

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
    if 'username' not in data or 'email' not in data:
        return jsonify({'error': 'Missing username or email'}), 400

    # Extraire les données de la requête
    username = data['username']
    email = data['email']
    cur = mysql.connection.cursor()

    cur.execute("INSERT INTO user_account (username, email) VALUES (%s, %s)", (username, email))

    mysql.connection.commit()

    cur.close()

    return jsonify({'message': 'User added successfully'}), 201

if __name__ == '__main__':
    app.run(debug=True)
    
    #got up to there can add and get user, tried it manually to add user and it showed up on phpmyadmin
    #must complete by doing delete and update(modify)
