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
        self.assertEqual(result, {"id": 1, 'username': 0, 'email': 0})

        # Query the database to check if the records were inserted correctly
        user_query = self.session.query(user.User).filter(user.User.username == 'testuser').first()
        user_profile_query = self.session.query(user_profile.UserProfile).filter(user_profile.UserProfile.profileName == 'Test User').first()

        self.assertIsNotNone(user_query)
        self.assertIsNotNone(user_profile_query)

        # Assert that the data in the database matches the expected data
        self.assertEqual(user_query.username, 'testuser')
        self.assertTrue(bcrypt.checkpw('testpassword'.encode('utf-8'), user_query.userPassword))
        self.assertEqual(user_query.roleID, 0)

        self.assertEqual(user_profile_query.profileName, 'Test User')
        self.assertEqual(user_profile_query.email, 'test@example.com')
        self.assertEqual(user_profile_query.phone, '555-555-5555')
        self.assertEqual(user_profile_query.userID, 1)

