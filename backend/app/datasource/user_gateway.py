import mysql.connector
import uuid
import os

from common.constants import db_host, db_user, db_password, db_name

sqldb = mysql.connector.connect(host = db_host, user = db_user, password = db_password, database = db_name)

class UserGateway():
    def __init__(self):
        pass

    def get_data():
        return {"message": "retrieve from db"}
    
    def insert_data():
        return {"message":"insert into db"}
    
    def update_data():
        return {"message":"update db"}
    
    def delete_data():
        return {"message":"delete from db"}
    
    def insert_user_data(new_user):
        print(new_user)
        dbcursor = sqldb.cursor()
        sql_statement_1 = ("INSERT INTO USER_PROFILES (profileID, profileName) VALUES (%s, %s)")
        value_1 = (uuid.uuid4().hex, new_user["username"])
        dbcursor.execute(sql_statement_1, value_1)

        sqldb.commit()
        
        sql_statement_2 = "INSERT INTO USERS SELECT %s, %s, %s, %s, profileID FROM USER_PROFILES WHERE profileName = %s;"
        value_2 = (uuid.uuid4().hex,new_user["username"], new_user["password"], new_user["role"], new_user["username"])
        dbcursor.execute(sql_statement_2, value_2)
        sqldb.commit()

        #dbcursor.execute("Select * From USERS")
        #result = dbcursor.fetchall()
        #for row in result:
        #    print(row)

        return {"message":"Insert user data called"}