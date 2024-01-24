from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates

from config import *

import bcrypt  # KLP - importing bcrypt 1/23/24


class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    email = db.Column(
        db.String, nullable=False, unique=True
    )  # KLP - added email field to user class 1/23/24
    _password_hash = db.Column(db.String, nullable=False)

    # Relationship
    trips = db.relationship("Trip", back_populates="user", cascade="all, delete-orphan")
    destinations = association_proxy("trips", "destination")

    # Serialization rules
    serialize_rules = "-_password_hash"

    # Validation

    @validates("username")
    def validate_username(self, key, username):
        if not isinstance(username, str):
            raise ValueError("Username must be a string.")
        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            raise ValueError("Username must be unique.")
        return username

    @validates("email")  # added email validation 1/23/24
    def validate_email(self, key, email):
        if not isinstance(email, str):
            raise ValueError("Email must be a string.")
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            raise ValueError("Email must be unique")
        return email

    @hybrid_property
    def password_hash(self):
        raise AttributeError("Password hashes are private.")

    @password_hash.setter
    def password_hash(self, password):
        # password_hash = bcrypt.generate_password_hash(password.encode("utf-8"))
        hashed = bcrypt.hashpw(
            password.encode("utf-8"), bcrypt.gensalt()
        )  # KLP adjusted this line for bcrypt
        # self._password_hash = password_hash.decode("utf-8")
        self._password_hash = hashed.decode("utf-8")

    def authenticate(self, password):
        # return bcrypt.check_password_hash(self._password_hash, password.encode("utf-8"))
        return bcrypt.checkpw(
            password.encode("utf-8"), self._password_hash.encode("utf-8")
        )  # KLP - adjusted this line for checking passwords

    def __repr__(self):
        return f"User {self.username}"


class Destination(db.Model, SerializerMixin):
    __tablename__ = "destinations"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.Text, nullable=False)
    location = db.Column(db.String, nullable=False)
    image = db.Column(db.String, nullable=False)

    # Relationship
    trips = db.relationship(
        "Trip", back_populates="destination", cascade="all, delete-orphan"
    )
    users = association_proxy("trips", "user")

    # Serialization rules
    serialize_rules = "-trips"

    # Validation

    @validates(
        "name"
    )  # KLP - modified name validation to eliminate the error of double validation while testing the seed file  1/23/24
    def validates_name(self, key, value):
        if not isinstance(value, str):
            raise ValueError(f"{key} must be a string.")
        if not value or len(value) < 1:
            raise ValueError("Destination must have a name.")
        return value

    @validates(
        "description", "location", "image"
    )  # KLP - removed name from validation since it's being validated above  1/23/24
    def validate_string(self, key, value):
        if not isinstance(value, str):
            raise ValueError(f"{key} must be a string.")
        return value

    def __repr__(self):
        return f"Destination #{self.id} : {self.name}"


class Trip(db.Model, SerializerMixin):
    __tablename__ = "trips"

    id = db.Column(db.Integer, primary_key=True)
    notes = db.Column(db.Text)
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=False)
    occasion = db.Column(db.String, nullable=False)  #KLP - added occasion to trips 1/23/24

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    destination_id = db.Column(db.Integer, db.ForeignKey("destinations.id"))

    # Relationship
    user = db.relationship("User", back_populates="trips")
    destination = db.relationship("Destination", back_populates="trips")

    # Add serialization rules
    serialize_rules = "-user"

    # Validation

    @validates("notes")
    def validate_notes(self, key, notes):
        if not isinstance(notes, str):
            raise ValueError("Notes must be a string.")
        return notes

    @validates("user_id", "destination_id")
    def validate_ids(self, key, id):
        if not isinstance(id, int):
            raise ValueError(f"{key} must be an integer.")
        return id

    def __repr__(self):
        return f"Trip #{self.id} | User #{self.user_id}"
