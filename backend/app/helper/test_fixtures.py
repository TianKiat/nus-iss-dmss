from app.models import access, access_control, role

def add_single_row_to_table(session, table_cls, values):
    new_row = table_cls(**values)
    session.add(new_row)
    session.commit()
    return new_row

def add_multiple_row_to_table(session, table_cls, values_list):
    new_rows = []

    for values in values_list:
        new_row = table_cls(**values)
        session.add(new_row)
        new_rows.append(new_row)

    session.commit()
    return new_rows

def setup_test_fixtures(session):
    setup_access_table(session)
    setup_role_table(session)
    setup_access_control_table(session)

def setup_access_table(session):
    values = [
        {'accessName': 'ACCESS 1', 'accessURL': 'frontend/src/pages/viewAccounts'},
        {'accessName': 'ACCESS 2', 'accessURL': 'frontend/src/pages/viewMenuItems'},
        {'accessName': 'ACCESS 3', 'accessURL': 'frontend/src/pages/addOrder'}
    ]
    add_multiple_row_to_table(session, access.Access, values)

def setup_role_table(session):
    values = [
        {'roleID': 1, 'roleName': 'ADMIN'},
        {'roleID': 2, 'roleName': 'VENDOR'},
        {'roleID': 3, 'roleName': 'CUSTOMER'}
    ]
    add_multiple_row_to_table(session, role.Role, values)

def setup_access_control_table(session):
    values = [
        {'accessID': 1, 'roleID': 1},
        {'accessID': 2, 'roleID': 2},
        {'accessID': 3, 'roleID': 3}
    ]
    add_multiple_row_to_table(session, access_control.AccessControl, values)
