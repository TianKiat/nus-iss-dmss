from app.datasource.complaint_gateway import ComplaintGateway
from app.common.complaint_model import Complaint, ComplaintUpdate

class ComplaintService():
    def __init__(self):
        pass

    def create_complaint(self, db, complaint_input: Complaint):
        complaint_status = ComplaintGateway().create_complaint_data(db, complaint_input)
        return {"status": complaint_status}
    
    def get_complaint_list(self, db):
        return ComplaintGateway().get_complaint_list(db)
    
    def get_complaint(self, db, complaintID: int):
        return ComplaintGateway().get_complaint(db, complaintID)
    
    def update_complaint(self, db, complaintUpdate: ComplaintUpdate):
        return ComplaintGateway().update_complaint(db, complaintUpdate.complaintID, complaintUpdate.status)