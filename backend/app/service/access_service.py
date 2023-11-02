from app.datasource.access_gateway import AccessGateway

class AccessService():
    def __init__(self):
        pass

    def get_access(db, accessID):
        return AccessGateway.get_access(db, accessID)
    
    def get_full_access_list(db):
        return AccessGateway.get_full_access_list(db)