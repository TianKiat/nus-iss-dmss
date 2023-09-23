import unittest
from unittest.mock import MagicMock
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models import user, user_profile, vendor_profile
from app.apicontroller.register_user_controller import RegisterUserController
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

    def test_register_customer(self):
        # Mocking customer data
        mock_customer = MagicMock()
        mock_customer.username = 'testuser'
        mock_customer.password = 'testpassword'
        mock_customer.role = 0
        mock_customer.name = 'Test User'
        mock_customer.email = 'test@example.com'
        mock_customer.phone = '555-555-5555'

        # Call the method
        result = RegisterUserController.register_customer(self, self.session, mock_customer)

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

    def test_register_vendor(self):
        # Mocking vendor data
        mock_vendor = MagicMock()
        mock_vendor.username = 'testvendor'
        mock_vendor.password = 'testpassword'
        mock_vendor.role = 1
        mock_vendor.name = 'Test Vendor'
        mock_vendor.address = '123 Main St'
        mock_vendor.email = 'vendor@test.com'
        mock_vendor.phone = '555-555-5555'
        mock_vendor.status = 1

        # Call the method
        result = RegisterUserController.register_vendor(self, self.session, mock_vendor)

        # Assert that the result is as expected
        self.assertEqual(result, {"id": 1, 'username': 0, 'email': 0})

        # Query the database to check if the records were inserted correctly
        user_query = self.session.query(user.User).filter(user.User.username == 'testvendor').first()
        vendor_profile_query = self.session.query(vendor_profile.VendorProfile).filter(vendor_profile.VendorProfile.profileName == 'Test Vendor').first()

        self.assertIsNotNone(user_query)
        self.assertIsNotNone(vendor_profile_query)

        # Assert that the data in the database matches the expected data
        self.assertEqual(user_query.username, 'testvendor')
        self.assertTrue(bcrypt.checkpw('testpassword'.encode('utf-8'), user_query.userPassword))
        self.assertEqual(user_query.roleID, 1)

        self.assertEqual(vendor_profile_query.profileName, 'Test Vendor')
        self.assertEqual(vendor_profile_query.address, '123 Main St')
        self.assertEqual(vendor_profile_query.email, 'vendor@test.com')
        self.assertEqual(vendor_profile_query.phone, '555-555-5555')
        self.assertEqual(vendor_profile_query.status, 1)
        self.assertEqual(vendor_profile_query.userID, 1)
