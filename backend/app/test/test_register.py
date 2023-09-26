import unittest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.common.user_model import User, Vendor
from app.models import base, user, user_profile, vendor_profile
from app.apicontroller.register_user_controller import RegisterUserController
import bcrypt

class TestRegisterController(unittest.TestCase):

    def setUp(self):
        # Set up an in-memory SQLite database
        self.engine = create_engine('sqlite:///:memory:')
        Session = sessionmaker(bind=self.engine)
        self.session = Session()

        # Create the tables
        base.Base.metadata.create_all(bind=self.engine)

    def tearDown(self):
        # Clean up resources
        self.session.close()

    def test_register_customer(self):
        # Mocking customer data
        mock_customer = User(
            username='testuser',
            password='testpassword',
            role=3,
            name="Test User",
            email="test@example.com",
            phone="12345678",
        )

        # Call the method
        result = RegisterUserController.register(self, self.session, mock_customer)

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
        self.assertEqual(user_query.roleID, 3)

        self.assertEqual(user_profile_query.profileName, 'Test User')
        self.assertEqual(user_profile_query.email, 'test@example.com')
        self.assertEqual(user_profile_query.phone, '12345678')
        self.assertEqual(user_profile_query.userID, 1)

    def test_register_vendor(self):
        # Mocking vendor data
        mock_vendor = Vendor(
            username = 'testvendor',
            password = 'testpassword',
            email = 'vendor@test.com',
            phone = '555-555-5555',
            role = 2,
            shopName = 'Test Vendor',
            shopAddr = '123 Main St',
            shopDesc = 'Nice Food',
            status = 0,
        )

        # Call the method
        result = RegisterUserController.register(self, self.session, mock_vendor)

        # Assert that the result is as expected
        self.assertEqual(result, {"id": 1, 'username': 0, 'email': 0, 'shopName': 0})

        # Query the database to check if the records were inserted correctly
        user_query = self.session.query(user.User).filter(user.User.username == 'testvendor').first()
        vendor_profile_query = self.session.query(vendor_profile.VendorProfile).filter(vendor_profile.VendorProfile.profileName == 'Test Vendor').first()

        self.assertIsNotNone(user_query)
        self.assertIsNotNone(vendor_profile_query)

        # Assert that the data in the database matches the expected data
        self.assertEqual(user_query.username, 'testvendor')
        self.assertTrue(bcrypt.checkpw('testpassword'.encode('utf-8'), user_query.userPassword))
        self.assertEqual(user_query.roleID, 2)

        self.assertEqual(vendor_profile_query.profileName, 'Test Vendor')
        self.assertEqual(vendor_profile_query.address, '123 Main St')
        self.assertEqual(vendor_profile_query.email, 'vendor@test.com')
        self.assertEqual(vendor_profile_query.phone, '555-555-5555')
        self.assertEqual(vendor_profile_query.status, 0)
        self.assertEqual(vendor_profile_query.userID, 1)
