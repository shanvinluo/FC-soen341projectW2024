from flask import Flask, request, jsonify
from flask_cors import CORS
from geopy.distance import geodesic
import requests
from flask_mysqldb import MySQL

app = Flask(__name__)

CORS(app)

app.config['MYSQL_HOST'] = 'sql5.freemysqlhosting.net'
app.config['MYSQL_USER'] = 'sql5686988'
app.config['MYSQL_PASSWORD'] = 'jSrGqLGIWE'
app.config['MYSQL_DB'] = 'sql5686988'
app.config['MYSQL_PORT'] = 3306

mysql = MySQL(app)

# test branch locations
branch_location = {
    "branch1": (45.460126, -73.879895),
    "branch2": (45.527175, -73.626089),
    }

geocoding_api_key = "AIzaSyBIOP_0qMxQkVV2bvb2_0WjfjS95of3tkI"

def postal_code_geocode(postalCode):
    url = f'https://maps.googleapis.com/maps/api/geocode/json?address={postalCode}&key={geocoding_api_key}'
    response = requests.get(url)
    data = response.json()
    
    if data['status'] == 'OK':
        location = data['results'][0]['geometry']['location']
        return location['lat'], location["lng"]
    else:
        return None, None

@app.route('/nearest-branch/<string:user>', methods=['GET'])
def  nearest_branch(user):
    cur=mysql.connection.cursor()
    
    cur.execute("SELECT postal_code FROM user_account WHERE username = %s", (user,))
    data = cur.fetchone()
    cur.close()
    
    if not data:
        return jsonify({'error': f'User "{user}" not found'}), 404
    
    postalCode = data[0]
    
    userLat, userLong = postal_code_geocode(postalCode)
    
    print(userLat, userLong)
    
    if userLat is None or userLong is None:
        return jsonify({'error': 'unable to obtain coordinates'}), 400
    
    nearestBranch = None
    minimumDistance = float('inf')
    
    for branch, (lat, lon) in branch_location.items():
        distance = geodesic((userLat,userLong), (lat,lon)).kilometers
        if distance < minimumDistance:
            minimumDistance = distance
            nearest_branch = branch
            
    return jsonify({'nearest_branch':nearest_branch, "distance (km)": minimumDistance})

if __name__ == '__main__':
    app.run(debug=True, port=5003)
    # port=5003