from sqlalchemy.orm import Session
from app.models import complaint
from app.common.complaint_model import Complaint

class ComplaintGateway():
    def __init__(self):
        pass

    def create_complaint_data(self, db: Session, complaint_input: Complaint):
        try:
            complaint_data = {
                'title': complaint_input.title,
                'description': complaint_input.description,
                'comment': complaint_input.comment,
                'userID': complaint_input.userID,
                'roleID': complaint_input.roleID,
                'status': 'pending'
            }
            complaint_table = complaint.Complaint(**complaint_data)
            db.add(complaint_table)
            db.commit()

            complaint_id_object = db.query(complaint.Complaint).filter(complaint.Complaint.title == complaint_input.title).first()
            if complaint_id_object:
                return True
            else:
                return False

        except Exception as e:
            print(f"Error: {e}")