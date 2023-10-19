from app.service.complaint_service import ComplaintService
from app.common.complaint_model import Complaint

class ComplaintController():
    def __init__(self):
        pass

    def create_complaint(self, db, complaint_input: Complaint):
        return ComplaintService().create_complaint(db, complaint_input)