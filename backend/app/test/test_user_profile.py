import unittest
from unittest.mock import MagicMock
from app.helper.test_fixtures import setup_test_fixtures
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models import user, user_profile
from app.apicontroller.user_profile_controller import UserProfileController
class TestRegisterController(unittest.TestCase):

    def setUp(self):
        # Set up an in-memory SQLite database
        self.engine = create_engine('sqlite:///:memory:')
        Session = sessionmaker(bind=self.engine)
        self.session = Session()

        # Create the tables
        user.Base.metadata.create_all(bind=self.engine)

        # Set up test fixtures (populate the database)
        setup_test_fixtures(self.session)

    def tearDown(self):
        # Clean up resources
        self.session.close()

    def test_user_profile(self):
        # Mocking customer data
        mock_id = '1'
        # Call the method
        result = UserProfileController.get_user_profile(self.session, mock_id)
        # Assert that the result is as expected
        self.assertEqual(result.profileName, 'Moses')
        self.assertEqual(result.email, 'moses@example.com')
        self.assertEqual(result.phone, '12345678')
        self.assertEqual(result.userID, 1)
