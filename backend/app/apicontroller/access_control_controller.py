from app.service.access_control_service import AccessControlService
from app.service.access_service import AccessService

class AccessControlContoller:
    def __init__ (self):
        pass

    def get_access_control(db, roleID):
        accessControl = AccessControlService.get_access_control(db, roleID)
        if (accessControl is None):
            return []
        access = []
        for acl in accessControl:
            access.append(AccessService.get_access(db, acl.accessID))
        return access