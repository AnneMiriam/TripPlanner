#!/usr/bin/env python3

# Remote library imports
from flask import Flask, request, make_response, session, jsonify
from flask_restful import Resource, Api
from datetime import datetime
from os import environ
from dotenv import load_dotenv


# from flask_bcrypt import Bcrypt

# Local imports
from config import app, db, api

# Secret Key
load_dotenv(".env")
app.secret_key = environ.get("SECRET_KEY")


# Add your model imports
from models import User, Destination, Trip

# Views go here!


@app.route("/")
def index():
    return "<h1>Pathfinders Paradise</h1>"

    ################################# User Authentication #################################


class Signup(Resource):
    def post(self):
        try:
            data = request.get_json()
            new_user = User(
                username=data.get("username"),
                email=data.get("email"),  # KLP-added email for sign up 1/23/24
                # password_hash = data.get("password")  #KLP - commenting out this line to test alternate password has to correct error when seeding db 1/23/24
            )
            new_user.password_hash = data.get("password")
            db.session.add(new_user)
            db.session.commit()
            session["user_id"] = new_user.id
            return make_response(new_user.to_dict(), 201)
        except ValueError as e:
            return make_response({"error": f"{e}"}, 400)


class Login(Resource):
    def post(self):
        username = request.get_json()["username"]
        password = request.get_json()["password"]

        user = User.query.filter_by(username=username).first()
        if user and user.authenticate(password):
            session["user_id"] = user.id
            return user.to_dict(), 200
        session.clear()
        return {"error": "Incorrect username or password"}, 401


class Logout(Resource):
    def delete(self):
        session.clear()
        return {}, 204


class CheckSession(Resource):
    def get(self):
        user = User.query.get(session.get("user_id"))
        if user:
            return user.to_dict(), 200
        else:
            return {}, 401

            ################################# User #################################


class Users(Resource):
    def get(self):
        try:
            return make_response([user.to_dict() for user in User.query.all()], 200)
        except Exception as e:
            return make_response({"Error": "Could not get data"}, 400)


class UsersById(Resource):
    def get(self, id):
        user = User.query.get(id)
        if user:
            return make_response(user.to_dict(), 200)
        return make_response({"error": "User not found"}, 404)

        ################################# Destination #################################


class Destinations(Resource):
    def get(self):
        destinations = [
            destination.to_dict() for destination in Destination.query.all()
        ]
        if not destinations:
            return make_response({"error": "No destinations found."}, 404)
        return make_response(jsonify(destinations), 200)

    def post(self):
        try:
            data = request.get_json()
            new_destination = Destination(
                name=data.get("name"),
                description=data.get("description"),
                location=data.get("location"),
                image=data.get("image"),
            )
            db.session.add(new_destination)
            db.session.commit()
            return make_response(new_destination.to_dict(), 201)
        except ValueError:
            return make_response({"error": "Invalid input data."}, 400)


class DestinationId(Resource):
    def get(self, id):
        destination = Destination.query.get(id)
        if destination:
            return make_response(destination.to_dict(), 200)
        return make_response({"error": "Destination not found."}, 404)

    def patch(self, id):
        destination = Destination.query.get(id)
        if not destination:
            return make_response({"error": "Destination not found."}, 404)
        else:
            data = request.get_json()
            try:
                for attr, value in data.items():
                    setattr(destination, attr, value)
                    db.session.commit()
                    return make_response(destination.to_dict(), 202)
            except ValueError:
                return make_response(
                    {"error": "An error occurred while updating the destination."}, 400
                )

    def delete(self, id):
        destination = Destination.query.get(id)
        if not destination:
            return make_response({"error": "Destination not found."}, 404)
        else:
            db.session.delete(destination)
            db.session.commit()
            return make_response({"message": "Destination deleted successfully."}, 204)

            ################################# Trip #################################


class Trips(Resource):
    def get(self):
        user = User.query.get(session.get("user_id"))

        if user:
            trips = [trip.to_dict() for trip in user.trips]

            return make_response(jsonify(trips), 200)
        return make_response({"error": "Must be logged in to view your trips."}, 401)


    def post(self):
        try:
            data = request.get_json()

            print(data)

            start_date = data.get("startDate")
            end_date = data.get("endDate")

            if start_date is None or end_date is None:
                return make_response({"error": "Missing start_date or end_date."}, 400)

            # check if user exists
            user = User.query.get(session.get("user_id"))
            if user is None:
                return make_response({"error": "User not found."}, 404)

            # Check if destination exists
            destination = Destination.query.filter_by(
                name=data.get("destination")
            ).first()
            if destination is None:
                return make_response({"error": "Destination not found."}, 404)

            new_trip = Trip(
                user_id=user.id,
                occasion=data.get("occasion"),
                destination_id=destination.id,
                start_date=datetime.strptime(start_date, "%Y-%m-%d"),
                end_date=datetime.strptime(end_date, "%Y-%m-%d"),
            )



            db.session.add(new_trip)
            db.session.commit()
            return make_response(new_trip.to_dict(), 201)
        except ValueError as e:
            return make_response({"error": e.__str__()}, 400)
        except KeyError:
            return make_response({"error": "Missing required data."}, 400)


class TripId(Resource):
    def get(self, id):
        trip = Trip.query.get(id)
        if trip:
            return make_response(trip.to_dict(), 200)
        return make_response({"error": "Trip not found."}, 404)

    def patch(self, id):
        trip = Trip.query.get(id)
        if not trip:
            return make_response({"error": "Trip not found."}, 404)
        else:
            data = request.get_json()
            data["start_date"] = datetime.strptime(data["start_date"], "%Y-%m-%d")
            data["end_date"] = datetime.strptime(data["end_date"], "%Y-%m-%d")
            try:
                for attr in data:
                    setattr(trip, attr, data[attr])

                db.session.add(trip)
                db.session.commit()

                return make_response(trip.to_dict(), 202)
            except ValueError as e:
                return make_response({"error": e.__str__()}, 400)

    def delete(self, id):
        trip = Trip.query.get(id)
        if not trip:
            return make_response({"error": "Trip not found."}, 404)
        else:
            db.session.delete(trip)
            db.session.commit()
            return make_response({"message": "Trip deleted successfully."}, 204)


api.add_resource(Signup, "/sign_up")
api.add_resource(Login, "/login")
api.add_resource(Logout, "/logout")
api.add_resource(CheckSession, "/check_session")
api.add_resource(Users, "/user")
api.add_resource(UsersById, "/user/<int:id>")
api.add_resource(Destinations, "/destinations")
api.add_resource(DestinationId, "/destinations/<int:id>")
api.add_resource(Trips, "/trips")
api.add_resource(TripId, "/trips/<int:id>")


if __name__ == "__main__":
    app.run(port=5555, debug=True)
