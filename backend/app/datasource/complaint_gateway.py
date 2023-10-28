from sqlalchemy.orm import Session
from app.models import complaint
from app.common.complaint_model import Complaint
from sqlalchemy import update
import datetime

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
                'status': 'pending',
                'createdtime': datetime.datetime.now()
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

    def get_complaint_list(self, db: Session):
        try:
            return db.query(complaint.Complaint).filter().all()
        except Exception as e:
            print(f"Error: {e}")

    def get_complaint(self, db: Session, complaintID: int):
        try:
            complaint_id_object = db.query(complaint.Complaint).filter(complaint.Complaint.complaintID == complaintID).first()
            if complaint_id_object:
                return complaint_id_object
            else:
                return "not found"
        except Exception as e:
            print(f"Error: {e}")

    def update_complaint(self, db: Session, complaintID: int, status: str):
        try:
            db.execute(update(complaint.Complaint).where(complaint.Complaint.complaintID == complaintID).values(status = status))
            db.commit()
            complaint_id_object = db.query(complaint.Complaint).filter(complaint.Complaint.complaintID == complaintID).first()
            return complaint_id_object
        except Exception as e:
            print(f"Error: {e}")