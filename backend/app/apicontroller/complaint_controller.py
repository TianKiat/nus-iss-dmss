from app.service.complaint_service import ComplaintService
from app.common.complaint_model import Complaint, ComplaintUpdate

class ComplaintController():
    def __init__(self):
        pass

    def create_complaint(self, db, complaint_input: Complaint):
        return ComplaintService().create_complaint(db, complaint_input)
    
    def get_complaint_list(self, db):
        return ComplaintService().get_complaint_list(db)
    
    def get_complaint(self, db, complaintID: int):
        return ComplaintService().get_complaint(db, complaintID)
    
    def update_complaint(self, db, complaintUpdate: ComplaintUpdate):
        return ComplaintService().update_complaint(db, complaintUpdate)