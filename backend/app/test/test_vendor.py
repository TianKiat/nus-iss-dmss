import unittest
from app.apicontroller.vendor_controller import VendorController
from app.helper.test_fixtures import setup_test_fixtures
from app.models import user
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.common.user_model import VendorProfile
from app.models import user_profile, vendor_profile

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

    def test_vendor_profile(self):
        # Mocking customer data
        mock_id = "2"
        # Call the method
        result = VendorController.get_vendor_profile_id(self.session, mock_id)
        # Assert that the result is as expected
        self.assertEqual(result.profileName, 'Amy ABC')
        self.assertEqual(result.address, 'Road 1, Singapore 123456')
        self.assertEqual(result.email, 'amy@example.com')
        self.assertEqual(result.phone, '90123456')
        self.assertEqual(result.status, True)
        self.assertEqual(result.userID, 2)
        self.assertEqual(result.shopDesc, 'Some short description')

    def test_save_vendor_profile(self):
        # Mocking vendor data
        mock_vendor_profile = VendorProfile(
            vendorProfileID=1,
            profileName='Amy ABC2',
            address='Road 1, Singapore 123457',
            email='amy2@example.com',
            phone='90123455',
            status=True,
            userID=2,
            shopDesc='Some short description2',
        )
        # Call the method
        result = VendorController.save_vendor_profile(self, self.session, mock_vendor_profile)

        vendor_profile_query = self.session.query(vendor_profile.VendorProfile).filter(vendor_profile.VendorProfile.vendorProfileID == 1).first()

        # Assert that the result is as expected
        self.assertEqual(result, True)
        self.assertEqual(vendor_profile_query.profileName, mock_vendor_profile.profileName)
        self.assertEqual(vendor_profile_query.address, mock_vendor_profile.address)
        self.assertEqual(vendor_profile_query.email, mock_vendor_profile.email)
        self.assertEqual(vendor_profile_query.phone, mock_vendor_profile.phone)
        self.assertEqual(vendor_profile_query.shopDesc, mock_vendor_profile.shopDesc)


    
 
