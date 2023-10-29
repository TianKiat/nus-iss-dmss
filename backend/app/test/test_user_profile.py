import unittest
from app.apicontroller.user_profile_controller import UserProfileController
from app.helper.test_fixtures import setup_test_fixtures
from app.models import user
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.common.user_model import UserProfile
from app.models import user_profile

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
        mock_id = "1"
        # Call the method
        result = UserProfileController.get_user_profile(self, self.session, mock_id)
        # Assert that the result is as expected
        self.assertEqual(result.profileName, 'Moses')
        self.assertEqual(result.email, 'moses@example.com')
        self.assertEqual(result.phone, '12345678')
        self.assertEqual(result.userID, 1)

    def test_user_data(self):
        # Mocking customer data
        mock_id = "1"
        # Call the method
        result = UserProfileController.get_user_data(self, self.session, mock_id)
        # Assert that the result is as expected
        self.assertEqual(result.username, 'moses')
        self.assertEqual(result.userPassword, '123')
        self.assertEqual(result.userID, 1)

    def test_check_password(self):
        # Mocking customer data
        mock_id = "7"
        mock_password = '123'
        # Call the method
        result = UserProfileController.check_password(self, self.session, mock_id, mock_password)
        # Assert that the result is as expected
        self.assertEqual(result, True)

    def test_save_user_profile(self):
        # Mocking customer data
        mock_user_profile = UserProfile(
            userProfileID=1,
            profileName='Moses2',
            email='moses2@example.com',
            phone='12345679',
            userID=1,
        )
        # Call the method
        result = UserProfileController.save_user_profile(self, self.session, mock_user_profile)

        user_profile_query = self.session.query(user_profile.UserProfile).filter(user_profile.UserProfile.userProfileID == 1).first()

        # Assert that the result is as expected
        self.assertEqual(result, True)
        self.assertEqual(user_profile_query.profileName, mock_user_profile.profileName)
        self.assertEqual(user_profile_query.email, mock_user_profile.email)
        self.assertEqual(user_profile_query.phone, mock_user_profile.phone)

    def test_save_username(self):
        # Mocking customer data
        mock_id = 1
        mock_username = 'test'
        # Call the method
        result = UserProfileController.save_username(self, self.session, mock_username, mock_id)

        user_query = self.session.query(user_profile.User).filter(user_profile.User.userID == 1).first()

        # Assert that the result is as expected
        self.assertEqual(result, True)
        self.assertEqual(user_query.username, mock_username)
 
