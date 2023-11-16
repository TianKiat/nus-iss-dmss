class OtherComplaint:
    def __init__(self, details):
        self.details = details

    def getDetails(self):
        return self.details

class CustomerComplaint:
    def __init__(self, details):
        self.details = details

    def getDetails(self):
        return self.details

class VendorComplaint:
    def __init__(self, details):
        self.details = details

    def getDetails(self):
        return self.details

def ComplaintFactory(type = 'Others', list = {}):
    complaintType = {
        'Others': OtherComplaint,
        'Customer': CustomerComplaint,
        'Vendor': VendorComplaint,
    }
    return complaintType[type](list)

customer = ComplaintFactory('Customer',{'title':'a','user':'user1'})
print(customer.getDetails())