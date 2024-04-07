from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['MYSQL_HOST'] = 'sql5.freemysqlhosting.net'
app.config['MYSQL_USER'] = 'sql5686988'
app.config['MYSQL_PASSWORD'] = 'jSrGqLGIWE'
app.config['MYSQL_DB'] = 'sql5686988'
app.config['MYSQL_PORT'] = 3306

mysql = MySQL(app)

@app.route('/comments/<int:vehicle_id>', methods=['GET'])
def get_comments(vehicle_id):
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT comment FROM comments WHERE vehicule_id = %s", (vehicle_id,))
    comments = cursor.fetchall()
    cursor.close()

    if not comments:
        return jsonify({'message': 'no comments :((((('}), 404

    comments_list = [comment[0] for comment in comments]
    return jsonify({'comments': comments_list}), 200


if __name__ == '__main__':
    app.run(debug=True, port=5003)
