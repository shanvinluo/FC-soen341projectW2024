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

#make crud operations


if __name__ == '__main__':
    app.run(debug=True)
