#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
from faker import Faker
from app import app
from models import db, User, Trip
from custom_provider import CustomProvider
import hashlib

fake = Faker()
fake.add_provider(CustomProvider)

with app.app_context():
    print("Deleting all records...")
    Trip.query.delete()
    User.query.delete()

    print("Creating users...")

    users = []
    #generate unique usernames and emails
    usernames = fake.unique.user_name(nb_elements=20)
    emails = fake.unique.email(nb_elements=20)

    for username, email in zip(usernames, emails):
        password_hash = hashlib.sha256((username + "password").encode()).hexdigest()
        user = User(username=username, email=email, password_hash=password_hash)
        users.append(user)
    db.session.add_all(users)

    print("Creating trips...")
    trips = []
    for i in range(100):
        start_date=fake.date_time_this_decade()
        end_date=fake.date_time_between(start_date=start_date)
        trip = Trip(
            destination=fake.country(),
            start_date=start_date,
            end_date=end_date(),  # need to make sure end date is after start date
            occasion=fake.occasion(),  #custome faker method created for occasions
            user=rc(users) #randomly assigns a user to each trip
        )

        trips.append(trip)
    try:   
        db.session.add_all(trips)
        db.session.commit()
        print("Trips created successfully")
    except Exception as e:
        print(f"An error occured:{e}")


if __name__ == "__main__":
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        
