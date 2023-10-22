import unittest, uuid, bcrypt
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models import base
from app.helper import test_fixtures
from app.apicontroller.login_user_controller import LoginUserController
from app.models.user import User
from app.models.user_profile import UserProfile
from app.models.vendor_profile import VendorProfile
from app.models.access_control import AccessControl
from app.common.user_model import Login

class TestLoginController(unittest.TestCase):

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

    def test_successful_login_user(self):
        Login.username = "bob"
        Login.password = "123"
        expected_user_session_data = {}
        checkpw = False

        expected_user = self.session.query(User).filter(User.username == Login.username).first()
        if expected_user:
            checkpw = bcrypt.checkpw(Login.password.encode('utf-8'), (expected_user.userPassword).encode('utf-8'))
        if expected_user and checkpw:
            expected_user_session_data['userID'] = expected_user.userID
            expected_user_session_data['roleID'] = expected_user.roleID
            expected_user_profile = self.session.query(UserProfile).filter(UserProfile.userID == expected_user_session_data['userID'] ).first()
            expected_user_session_data['profileName'] = expected_user_profile.profileName
            expected_access_control = self.session.query(AccessControl).filter(AccessControl.roleID == expected_user_session_data['roleID']).all()
            access_list = []
            if expected_access_control:
                for item in expected_access_control:
                    access_list.append(item.accessControlID)

            expected_user_session_data['access'] = access_list

        result = LoginUserController.login_user(self, self.session, Login)

        self.assertEqual(result, expected_user_session_data)

    def test_successful_login_vendor(self):
        Login.username = "alan"
        Login.password = "123"
        expected_user_session_data = {}
        checkpw = False

        expected_user = self.session.query(User).filter(User.username == Login.username).first()
        if expected_user:
            checkpw = bcrypt.checkpw(Login.password.encode('utf-8'), (expected_user.userPassword).encode('utf-8'))
        if expected_user and checkpw:
            expected_user_session_data['userID'] = expected_user.userID
            expected_user_session_data['roleID'] = expected_user.roleID
            expected_user_profile = self.session.query(VendorProfile).filter(VendorProfile.userID == expected_user_session_data['userID'] ).first()
            expected_user_session_data['profileName'] = expected_user_profile.profileName
            expected_access_control = self.session.query(AccessControl).filter(AccessControl.roleID == expected_user_session_data['roleID']).all()
            access_list = []
            if expected_access_control:
                for item in expected_access_control:
                    access_list.append(item.accessControlID)

            expected_user_session_data['access'] = access_list

        result = LoginUserController.login_user(self, self.session, Login)

        self.assertEqual(result, expected_user_session_data)

    def test_successful_login_admin(self):
        Login.username = "ken"
        Login.password = "$2b$12$BcMr6jrz2wH2rbFRXAKFoe4FkkjcsVxoiVHHpU98F.Dt.a1IGhDjG"
        expected_user_session_data = {}
        checkpw = False

        expected_user = self.session.query(User).filter(User.username == Login.username).first()
        if expected_user:
            checkpw = bcrypt.checkpw(Login.password.encode('utf-8'), (expected_user.userPassword).encode('utf-8'))
        if expected_user and checkpw:
            expected_user_session_data['userID'] = expected_user.userID
            expected_user_session_data['roleID'] = expected_user.roleID
            expected_user_profile = self.session.query(UserProfile).filter(UserProfile.userID == expected_user_session_data['userID'] ).first()
            expected_user_session_data['profileName'] = expected_user_profile.profileName
            expected_access_control = self.session.query(AccessControl).filter(AccessControl.roleID == expected_user_session_data['roleID']).all()
            access_list = []
            if expected_access_control:
                for item in expected_access_control:
                    access_list.append(item.accessControlID)

            expected_user_session_data['access'] = access_list

        result = LoginUserController.login_user(self, self.session, Login)

        self.assertEqual(result, expected_user_session_data)

    def test_unsuccessful_login_user(self):
        Login.username = "bobzz"
        Login.password = "123"
        expected_user_session_data = {}
        checkpw = False

        expected_user = self.session.query(User).filter(User.username == Login.username).first()
        if expected_user:
            checkpw = bcrypt.checkpw(Login.password.encode('utf-8'), (expected_user.userPassword).encode('utf-8'))
        if expected_user and checkpw:
            expected_user_session_data['userID'] = expected_user.userID
            expected_user_session_data['roleID'] = expected_user.roleID
            expected_user_profile = self.session.query(UserProfile).filter(UserProfile.userID == expected_user_session_data['userID'] ).first()
            expected_user_session_data['profileName'] = expected_user_profile.profileName
            expected_access_control = self.session.query(AccessControl).filter(AccessControl.roleID == expected_user_session_data['roleID']).all()
            access_list = []
            if expected_access_control:
                for item in expected_access_control:
                    access_list.append(item.accessControlID)

            expected_user_session_data['access'] = access_list

        result = LoginUserController.login_user(self, self.session, Login)

        self.assertEqual(result, expected_user_session_data)

    def test_unsuccessful_login_vendor(self):
        Login.username = "alan"
        Login.password = "1234"
        expected_user_session_data = {}
        checkpw = False

        expected_user = self.session.query(User).filter(User.username == Login.username).first()
        if expected_user:
            checkpw = bcrypt.checkpw(Login.password.encode('utf-8'), (expected_user.userPassword).encode('utf-8'))
        if expected_user and checkpw:
            expected_user_session_data['userID'] = expected_user.userID
            expected_user_session_data['roleID'] = expected_user.roleID
            expected_user_profile = self.session.query(VendorProfile).filter(VendorProfile.userID == expected_user_session_data['userID'] ).first()
            expected_user_session_data['profileName'] = expected_user_profile.profileName
            expected_access_control = self.session.query(AccessControl).filter(AccessControl.roleID == expected_user_session_data['roleID']).all()
            access_list = []
            if expected_access_control:
                for item in expected_access_control:
                    access_list.append(item.accessControlID)

            expected_user_session_data['access'] = access_list

        result = LoginUserController.login_user(self, self.session, Login)

        self.assertEqual(result, expected_user_session_data)

    def test_unsuccessful_login_admin(self):
        Login.username = "bobzz"
        Login.password = "123"
        expected_user_session_data = {}
        checkpw = False

        expected_user = self.session.query(User).filter(User.username == Login.username).first()
        if expected_user:
            checkpw = bcrypt.checkpw(Login.password.encode('utf-8'), (expected_user.userPassword).encode('utf-8'))
        if expected_user and checkpw:
            expected_user_session_data['userID'] = expected_user.userID
            expected_user_session_data['roleID'] = expected_user.roleID
            expected_user_profile = self.session.query(UserProfile).filter(UserProfile.userID == expected_user_session_data['userID'] ).first()
            expected_user_session_data['profileName'] = expected_user_profile.profileName
            expected_access_control = self.session.query(AccessControl).filter(AccessControl.roleID == expected_user_session_data['roleID']).all()
            access_list = []
            if expected_access_control:
                for item in expected_access_control:
                    access_list.append(item.accessControlID)

            expected_user_session_data['access'] = access_list

        result = LoginUserController.login_user(self, self.session, Login)

        self.assertEqual(result, expected_user_session_data)