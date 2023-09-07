from datasource.user_gateway import UserGateway

# import service class needed
# import gateway class needed

class UserService():
    def __init__(self):
        pass

    def register_user(user_data):
        new_user = {}
        new_user["username"] = user_data.username
        new_user["password"] = user_data.password
        new_user["role"] = user_data.role
        result = UserGateway.insert_user_data(new_user)
        return result
    
    def login_user(user_data):
        pass