from app.datasource.opening_hours_gateway import OpeningHoursGateway
class OpeningHoursService:
    def __init__(self):
        pass

    def get_opening_hours_for_vendor(db, vendorProfileId : int):
        opening_hours = []
        for i in range(1, 8) :
            opening_hours.append(OpeningHoursGateway.get_opening_hours(db=db,_day=i, _vendorProfileId=vendorProfileId))
        return opening_hours
    
    def update_opening_hours_for_vendor(db, openingHours):
        results = []
        # openingHours is a list of OpeningHours
        for x in openingHours :
            value = OpeningHoursGateway.get_opening_hours(db=db,_day=x.day, _vendorProfileId=x.vendorProfileID)
            if value is None:
                value = OpeningHoursGateway.insert_opening_hours(db=db,_day=x.day, _openTime=x.openTime, _closingTime=x.closingtTime, _vendorProfileId=x.vendorProfileID, _isOpen=x.isOpen)
            else:
                 value = OpeningHoursGateway.update_opening_hours(db=db,_day=x.day, _openTime=x.openTime, _closingTime=x.closingtTime, _vendorProfileId=x.vendorProfileID, _isOpen=x.isOpen)
            results.append(value)
        return results