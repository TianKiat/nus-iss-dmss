import unittest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.common.complaint_model import Complaint,ComplaintUpdate
from app.models import base, complaint
from app.apicontroller.complaint_controller import ComplaintController
from app.helper import test_fixtures
import datetime

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
            description = 'Customer Complaint',
            comment = 'ok',
            userID = 3,
            roleID = 3,
            status = 'pending',
            createdtime = datetime.datetime.now(),
        )
        
        result = ComplaintController.create_complaint(self, self.session, mock_complaint)
        complaint_query = self.session.query(complaint.Complaint).filter(complaint.Complaint.title == 'Test New Complaint').first()

        self.assertIsNotNone(complaint_query)
        self.assertEqual(complaint_query.title, 'Test New Complaint')
        self.assertEqual(complaint_query.description, 'Customer Complaint')
        self.assertEqual(complaint_query.comment, 'ok')
        self.assertEqual(complaint_query.userID, 3)
        self.assertEqual(complaint_query.roleID, 3)
        self.assertEqual(complaint_query.status, 'pending')

    def test_retrieve_complaint(self):
        result = ComplaintController.get_complaint_list(self, self.session)
        self.assertIsNotNone(result)

    def test_update_complaint(self):
        complaint_query = self.session.query(complaint.Complaint).first()
        print(complaint_query.complaintID)

        complaintUpdate = ComplaintUpdate(
            complaintID = complaint_query.complaintID,
            status='done'
        )
        result = ComplaintController.update_complaint(self, self.session, complaintUpdate)
        self.assertEqual(result.status, 'done')