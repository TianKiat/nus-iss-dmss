from app.datasource.complaint_gateway import ComplaintGateway
from app.datasource.user_gateway import UserGateway
from app.common.complaint_model import Complaint, ComplaintUpdate

class ComplaintService():
    def __init__(self):
        pass

    def create_complaint(self, db, complaint_input: Complaint):
        complaint_status = ComplaintGateway().create_complaint_data(db, complaint_input)
        return {"status": complaint_status}
    
    def get_complaint_list(self, db):
        complaint_list = []
        profileName = ""
        result = ComplaintGateway().get_complaint_list(db)
        for complaint in result:
            user_profile = UserGateway().retrieve_user_control_by_id(db, complaint.userID)
            if user_profile:
                profileName = user_profile['username']
            else:
                profileName = ""
            temp_list = {}
            temp_list['complaintID'] = complaint.complaintID
            temp_list['title'] = complaint.title
            temp_list['description'] = complaint.description
            temp_list['comment'] = complaint.comment
            temp_list['userID'] = complaint.userID
            temp_list['roleID'] = complaint.roleID
            temp_list['status'] = complaint.status
            temp_list['createdtime'] = complaint.createdtime
            temp_list['profileName'] = profileName
            complaint_list.append(temp_list)  
        return complaint_list
    
    def get_complaint(self, db, complaintID: int):
        complaint_list = []
        profileName = ""
        complaint = ComplaintGateway().get_complaint(db, complaintID)
        user_profile = UserGateway().retrieve_user_control_by_id(db, complaint.userID)
        if user_profile:
            profileName = user_profile['username']
        else:
            profileName = ""
        temp_list = {}
        temp_list['complaintID'] = complaint.complaintID
        temp_list['title'] = complaint.title
        temp_list['description'] = complaint.description
        temp_list['comment'] = complaint.comment
        temp_list['userID'] = complaint.userID
        temp_list['roleID'] = complaint.roleID
        temp_list['status'] = complaint.status
        temp_list['createdtime'] = complaint.createdtime
        temp_list['profileName'] = profileName
        complaint_list.append(temp_list)    
            
        return complaint_list
    
    def update_complaint(self, db, complaintUpdate: ComplaintUpdate):
        return ComplaintGateway().update_complaint(db, complaintUpdate.complaintID, complaintUpdate.status)