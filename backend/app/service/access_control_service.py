from app.datasource.access_control_gateway import AccessControlGateway

class AccessControlService():
    def __init__(self):
        pass
    
    def get_access_control(db, roleID):
        return AccessControlGateway.get_access_control(db, roleID)
    
    def get_access_control_list(db, roleID):
        return AccessControlGateway.get_access_control_list(db, roleID)
    
    def update_access_list(db, roleID, access_list):
        original_list = AccessControlGateway.get_access_control_list(db,roleID)
        add_list = []
        remove_list = []
        # print(access_list)
        # print(original_list)

        # if(len(access_list)>len(original_list)):
        #     for item in access_list:
                
        #         if item in original_list==False:
        #             print(item)
        #             add_list.append(item)

        # elif(len(original_list)>len(access_list)):
        #     for item in original_list:
                
        #         if item in access_list==False:
        #             print(item)
        #             remove_list.append(item)
        
        # elif(len(original_list)==len(access_list)):
        #     add_list = access_list.copy()
        #     remove_list = original_list.copy()
        # print("final")
        # print(add_list,remove_list)

        add_list = access_list.copy()
        remove_list = original_list.copy()
        print(add_list,remove_list)
        return add_list,remove_list