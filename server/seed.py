#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
from faker import Faker
from app import app
from models import db, User, Trip
import hashlib




fake = Faker()

with app.app_context():
    print("Deleting all records...")
    Trip.query.delete()
    Destination.query.delete()
    User.query.delete()

    print("Creating users...")

    users = []
    usernames = set()
    emails = set()

    for i in range(20):
        username = fake.user_name()
        while username in usernames:
            username = fake.user_name()
        usernames.add(username)

        email = fake.email()
        while email in emails:
            email = fake.email()
        emails.add(email)

        password_hash = hashlib.sha256((username + "password").encode()).hexdigest()

        user = User(username=username, email=email, password_has=password_hash)

        users.append(user)
    db.session.add_all(users)

    print("Creating trips...")
    trips = []
    for i in range(100):
        trip = Trip(
            destination=fake.destination(),
            start_date=fake.start_date(),
            end_date=fake.end_date(),
            occasion=fake.occasion(),
        )

        trips.append(trip)

    db.session.add_all(trips)
    db.session.commit()
    print("Complete.")


if __name__ == "__main__":
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
