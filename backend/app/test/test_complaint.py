import unittest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.common.complaint_model import Complaint
from app.models import base, complaint
from app.apicontroller.complaint_controller import ComplaintController
from app.helper import test_fixtures

class TestComplaintController(unittest.TestCase):

    def setUp(self):
        # Set up an in-memory SQLite database
        self.engine = create_engine('sqlite:///:memory:')
        Session = sessionmaker(bind=self.engine)
        self.session = Session()

        # Create the tables
        base.Base.metadata.create_all(bind=self.engine)

        # Set up fixtures for common tables
        test_fixtures.setup_test_fixtures(self.session)
    
    def tearDown(self):
        self.session.close()

    def test_create_complaint(self):
        mock_complaint = Complaint(
            title = 'Test New Complaint',
            description = 'To test complaint',
            comment = 'ok',
            userID = 2,
            roleID = 2,
            status = 'pending',
        )
        
        result = ComplaintController.create_complaint(self, self.session, mock_complaint)
        complaint_query = self.session.query(complaint.Complaint).filter(complaint.Complaint.title == 'Test New Complaint').first()

        self.assertIsNotNone(complaint_query)
        self.assertEqual(complaint_query.title, 'Test New Complaint')
        self.assertEqual(complaint_query.description, 'To test complaint')
        self.assertEqual(complaint_query.comment, 'ok')
        self.assertEqual(complaint_query.userID, 2)
        self.assertEqual(complaint_query.roleID, 2)
        self.assertEqual(complaint_query.status, 'pending')