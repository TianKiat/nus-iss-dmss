import unittest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models import base
from app.helper import test_fixtures
from app.apicontroller.update_user_status_controller import UpdateUserStatusController
from app.models import user

class TestUserStatusController(unittest.TestCase):

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

    # def test_access_control(self):
    #     # test with existing data
    #     roleID = 1
    #     expected_result = [self.session.query(Access).filter(Access.accessID == roleID).first()]
    #     result = AccessControlContoller.get_access_control(self.session, roleID)
    #     self.assertEqual(result, expected_result)

    #     # test with non-existing data
    #     roleID = 0
    #     expected_result = []
    #     result = AccessControlContoller.get_access_control(self.session, roleID)
    #     self.assertEqual(result, expected_result)