#!/usr/bin/env python3

# Remote library imports
from flask import Flask, request, make_response, session, jsonify
from flask_restful import Resource,  Api
# from flask_bcrypt import Bcrypt

# Local imports
from config import app, db, api

# Add your model imports
from models import User, Destination, Trip

api = Api(app)

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
                username = data.get("username"),
                email=data.get("email"), # KLP-added email for sign up 1/23/24
                # password_hash = data.get("password")  #KLP - commenting out this line to test alternate password has to correct error when seeding db 1/23/24
            )
            new_user.password.hash = data.get("password")  #KLP added this line to has passwords 1/23/24
            db.session.add(new_user)
            db.session.commit()
            session["user_id"] = new_user.id 
            return make_response(new_user.to_dict(), 201)
        except ValueError as e:
            return make_response({"error": f"{e}"}, 400)
       

class SignIn(Resource):
   def post(self):
      username = request.get_json()["username"]
      password = request.get_json()["password"]
      
      user = User.query.filter_by(username = username).first()
      if user and user.authenticate(password):
         session["user_id"] = user.id
         return user.to_dict(), 200
      session.clear()
      return {"error": "Incorrect username or password"}, 401
  
  
class SignOut(Resource):
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
     
class User(Resource):
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
        try:
            destinations = Destination.query.all()
            if not destinations:
                return make_response({"message": "No destinations found."}, 404)
            return make_response([destination.to_dict() for destination in destinations], 200)
        except Exception:
            return make_response({"Error": "Could not get data"}, 400)
        
        
    def post(self):
        try:
            data = request.get_json()
            new_destination = Destination(
                name = data.get('name'),
                description = data.get('description'),
                location = data.get('location'),
                image = data.get('image')
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
                return make_response({"error": "An error occurred while updating the destination."}, 400)
        
   
    def delete(self, id):
        destination = Destination.query.get(id)
        if not destination:
            return make_response({"error": "Destination not found."}, 404)
        else:
            db.session.delete(destination)
            db.session.commit()
            return make_response({"message": "Destination deleted successfully."}, 204)
        
        
                                        ################################# Destination #################################
        
class Trips(Resource):
    def post(self):
        try:
            data = request.get_json()
            new_trip = Trip(**data)
            db.session.add(new_trip)
            db.session.commit()
            return make_response(mission.to_dict(rules=("user", "destination")), 201)
        except ValueError:
            return make_response({"error": "Missing required data."}, 400)


api.add_resource(Signup, "/sign_up")
api.add_resource(SignIn, "/sign_in")
api.add_resource(SignOut, "/sign_out")
api.add_resource(CheckSession, "/check_session")
api.add_resource(Destinations, '/destination')
api.add_resource(DestinationId, '/destinations/<int:id>')
api.add_resource(Trips, "/trips")


if __name__ == "__main__":
    app.run(port=5555, debug=True)

