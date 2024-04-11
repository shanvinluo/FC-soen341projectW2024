"""
VehiclesDB Module

This module provides functionality to interact with a database for managing vehicles.
It includes functions for creating, reading, updating, and deleting vehicle records.

Author: Atai Askarov
Date: 3/26/2024

This module contains the following components:

- create_app: Function to create the Flask application instance.
- db: Database instance for interacting with the vehicle database.

Example:
    # Importing the necessary components from VehiclesDB module
    from CRUD_on_car.VehiclesDB import create_app, db

    # Creating the Flask application instance
    app = create_app()

    # Accessing the database instance
    with app.app_context():
        # Perform database operations using db
        ...

"""

from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from CRUD_on_car.configuration import config


db = SQLAlchemy()

def create_app(config_name):
    """Creates a flask app"""
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    config[config_name].init_app(app)

    db.init_app(app)
    return app
