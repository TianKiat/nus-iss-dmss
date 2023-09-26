from app.models import access, access_control, role, user, user_profile, vendor_profile, menuitem, invoice, order, promotion

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
    setup_user_table(session)
    setup_user_profile_table(session)
    setup_vendor_profile_table(session)
    setup_menuitem_table(session)
    setup_invoice_table(session)
    setup_order_table(session)
    setup_promotion_table(session)

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

def setup_user_table(session):
    values = [
        {'userID': 1, 'username': 'moses', 'userPassword': '123', 'roleID': 1},
        {'userID': 2, 'username': 'amy', 'userPassword': '123', 'roleID': 2},
        {'userID': 3, 'username': 'joe', 'userPassword': '123', 'roleID': 3}
    ]
    add_multiple_row_to_table(session, user.User, values)

def setup_user_profile_table(session):
    values = [
        {'userProfileID': 1, 'profileName': 'Moses', 'email': 'moses@example.com', 'phone': '12345678', 'userID': 1},
        {'userProfileID': 2, 'profileName': 'Joe', 'email': 'joe@example.com', 'phone': '78901234', 'userID': 3}
    ]
    add_multiple_row_to_table(session, user_profile.UserProfile, values)

def setup_vendor_profile_table(session):
    value = {'vendorProfileID': 1, 'profileName': 'Amy ABC', 'address': 'Road 1, Singapore 123456', 'email': 'amy@example.com', 'phone': '90123456', 'status': False, 'userID': 2, 'shopDesc': 'Some short description'}
    add_single_row_to_table(session, vendor_profile.VendorProfile, value)

def setup_menuitem_table(session):
    values = [
        {'menuItemID': 1, 'menuItemName': 'Eggplant Mala', 'price': 1.20, 'menuItemImage': None, 'menuItemDesc': 'veggie', 'isValid': True, 'vendorProfileID': 1},
        {'menuItemID': 2, 'menuItemName': 'Steam Egg', 'price': 1, 'menuItemImage': 'steamegg.png', 'menuItemDesc': None, 'isValid': False, 'vendorProfileID': 1},
        {'menuItemID': 3, 'menuItemName': 'Sweet and Sour Pork', 'price': 2, 'menuItemImage': 'pork.jpg', 'menuItemDesc': 'meat', 'isValid': True, 'vendorProfileID': 1}
    ]
    add_multiple_row_to_table(session, menuitem.MenuItem, values)

def setup_invoice_table(session):
    values = [
        {'invoiceID': 1, 'date': '2023-10-15', 'totalPrice': 20.5, 'discount': 10, 'status': 'PENDING', 'isFavorite': False, 'customerProfileID': 1, 'vendorProfileID': 1},
        {'invoiceID': 2, 'date': '2023-01-12', 'totalPrice': 15, 'discount': 0, 'status': 'DONE', 'isFavorite': True, 'customerProfileID': 2, 'vendorProfileID': 1}
    ]
    add_multiple_row_to_table(session, invoice.Invoice, values)

def setup_order_table(session):
    values = [
        {'orderID': 1, 'menuItemID': 1, 'foodName': 'Eggplant Mala', 'quantity': 2, 'price': 2.40, 'invoiceID': 1},
        {'orderID': 2, 'menuItemID': 2, 'foodName': 'Steam Egg', 'quantity': 5, 'price': 5.00, 'invoiceID': 1}
    ]
    add_multiple_row_to_table(session, order.Order, values)

def setup_promotion_table(session):
    values = [
        {'promotionID': 1, 'promoCode': 'CNY2023', 'discount': 5, 'minimumSpending': 10, 'isValid': False},
        {'promotionID': 2, 'promoCode': 'NDP2023', 'discount': 25, 'minimumSpending': 75, 'isValid': True}
    ]
    add_multiple_row_to_table(session, promotion.Promotion, values)