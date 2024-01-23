#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
from datetime import timedelta
from faker import Faker
from app import app
from models import db, User, Trip, Destination
from custom_provider import CustomProvider
import hashlib

fake = Faker()
fake.add_provider(CustomProvider)

with app.app_context():
    print("Deleting all records...")
    Trip.query.delete()
    User.query.delete()
    Destination.query.delete()

    print("Creating destinations...")
    destinations = []
    for _ in range(20):
        destination = Destination(
            name=fake.country(),
            description=fake.text(),
            location=fake.city(),
            image=fake.image_url(),
        )
        destinations.append(destination)
    db.session.add_all(destinations)

    print("Creating users...")

    users = []
    # generate unique usernames and emails
    usernames = set()
    emails = set()

    while len(usernames) < 20:
        usernames.add(fake.user_name())

    while len(emails) < 20:
        emails.add(fake.email())

    for username, email in zip(usernames, emails):
        raw_password = fake.password(
            length=10, special_chars=True, digits=True, upper_case=True, lower_case=True
        )
        user = User(username=username, email=email)
        user.password_hash = raw_password
        users.append(user)
    db.session.add_all(users)

    print("Creating trips...")
    trips = []
    for i in range(100):
        user = rc(users)
        destination = rc(destinations)
        start_date = fake.date_time_this_decade()
        end_date = fake.date_time_between(start_date=start_date, end_date=start_date + timedelta(days=30))
        trip = Trip(
            user = user,
            destination = destination,
            start_date = start_date,
            end_date = end_date,
            occasion=fake.occasion(),  # custome faker method created for occasions
        )

        trips.append(trip)
    try:
        db.session.add_all(trips)
        db.session.commit()
        print("Trips created successfully")
    except Exception as e:
        print(f"An error occured:{e}")

    db.session.commit()

    print("Seed data created successfully.")


if __name__ == "__main__":
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
