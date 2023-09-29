import unittest
from unittest.mock import MagicMock
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models import user, user_profile
from app.apicontroller.user_profile_controller import UserProfileController
import bcrypt

class TestRegisterController(unittest.TestCase):

    def setUp(self):
        # Set up an in-memory SQLite database
        self.engine = create_engine('sqlite:///:memory:')
        Session = sessionmaker(bind=self.engine)
        self.session = Session()

        # Create the tables
        user.Base.metadata.create_all(bind=self.engine)

    def tearDown(self):
        # Clean up resources
        self.session.close()

    def test_register_profile(self):
        # Mocking customer data
        mock_id = '1'
        # Call the method
        result = UserProfileController.get_user_profile(self, self.session, mock_id)

        # Assert that the result is as expected
        self.assertEqual(result, {'profileName': 'Moses', 'email': 'moses@example.com', 'phone': '12345678', 'userID': 1})

