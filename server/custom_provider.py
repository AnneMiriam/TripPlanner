

from faker.providers import BaseProvider

class CustomProvider(BaseProvider):
    def occasion(self):
        occasions = ["Wedding", "Birthday", "Conference", "Meeting", "Graduation", "Vacation", "Funeral", "Family Reunion", "Anniversary", "Graduation", "Honeymoon", "Cruise"]
        return self.random_element(occasions)