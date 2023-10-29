from sqlalchemy.orm import Session
from sqlalchemy import insert, update, delete, DateTime, Boolean
from app.models.opening_hours import OpeningHours

class OpeningHoursGateway():
    def __init__():
        pass
    def get_opening_hours(db: Session, _day : int, _vendorProfileId : int):
        try:
            return db.query(OpeningHours).filter(OpeningHours.vendorProfileID == _vendorProfileId, OpeningHours.day == _day).first()
        except Exception as e:
            print(f"Error: {e}")
    def insert_opening_hours(db: Session, _day : int, _openTime : DateTime, _closingTime : DateTime, _vendorProfileId : int, _isOpen : Boolean):
        try:
            db.execute(
                insert(OpeningHours).values(
                    vendorProfileID=_vendorProfileId,
                    day=_day,
                    openTime=_openTime,
                    closingtTime=_closingTime,
                    isOpen=_isOpen
                )
            )
            db.commit()

            return db.query(OpeningHours).filter(OpeningHours.vendorProfileID == _vendorProfileId, OpeningHours.day == _day).first()
        except Exception as e:
            print(f"Error: {e}")
    def update_opening_hours(db: Session, _day : int, _openTime : DateTime, _closingTime : DateTime, _vendorProfileId : int, _isOpen : Boolean):
        try:
            db.query(OpeningHours).filter(OpeningHours.vendorProfileID == _vendorProfileId, OpeningHours.day == _day).first()
            db.execute(
                update(OpeningHours)
                .where(OpeningHours.day == _day, OpeningHours.vendorProfileID == _vendorProfileId)
                .values(
                    openTime=_openTime,
                    closingtTime=_closingTime,
                    isOpen=_isOpen
                )
            )
            db.commit()

            return db.query(OpeningHours).filter(OpeningHours.vendorProfileID == _vendorProfileId, OpeningHours.day == _day).first()
        except Exception as e:
            print(f"Error: {e}")
    def delete_opening_hours(db: Session, _day : int, _vendorProfileId : int):
        try:
            db.query(OpeningHours).filter(OpeningHours.vendorProfileID == _vendorProfileId, OpeningHours.day == _day).first()
            db.execute(
                update(OpeningHours)
                .where(OpeningHours.day == _day, OpeningHours.vendorProfileID == _vendorProfileId)
                .values(
                    isOpen=False
                )
            )
            db.commit()

            return db.query(OpeningHours).filter(OpeningHours.vendorProfileID == _vendorProfileId, OpeningHours.day == _day).first()
        except Exception as e:
            print(f"Error: {e}")