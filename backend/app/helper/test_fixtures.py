import datetime
from app.models import access, access_control, role, user, user_profile, vendor_profile, menu_item, invoice, order, promotion, otp, complaint

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
    setup_otp_table(session)
    setup_complaint_table(session)

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
        {'username': 'moses', 'userPassword': '123', 'roleID': 1, 'isDisabled': 0},
        {'username': 'amy', 'userPassword': '123', 'roleID': 2, 'isDisabled': 0},
        {'username': 'joe', 'userPassword': '123', 'roleID': 3, 'isDisabled': 0},
        {'username': 'bob', 'userPassword': '$2b$12$GtUEo1bfqtP11Osbq8iRSOiv5vqNmVFc0eCsdYRDuUGect2HISix6', 'roleID': 3, 'isDisabled': 0},
        {'username': 'alan', 'userPassword': '$2b$12$lZlqdlnbKF2sUSS7S0AwQe6Sf7V.td7fYJmik4PTzaMjWhCEDWUzS', 'roleID': 2, 'isDisabled': 0},
        {'username': 'ken', 'userPassword': '$2b$12$BcMr6jrz2wH2rbFRXAKFoe4FkkjcsVxoiVHHpU98F.Dt.a1IGhDjG', 'roleID': 1, 'isDisabled': 0},
        {'username': 'tim', 'userPassword': '$2b$12$BydwhkBUqC9z36JPOjzJdu/x/1tgpR111NfI4fxMkrgvnXYhHirn6', 'roleID': 3, 'isDisabled': 0},
        
    ]
    add_multiple_row_to_table(session, user.User, values)

def setup_user_profile_table(session):
    values = [
        {'profileName': 'Moses', 'email': 'moses@example.com', 'phone': '12345678', 'userID': 1},
        {'profileName': 'Joe', 'email': 'joe@example.com', 'phone': '78901234', 'userID': 3},
        {'profileName': 'bob', 'email': 'bob@asd.com', 'phone': '98767654', 'userID': 4},
        {'profileName': 'ken', 'email': 'ken@merrr.com', 'phone': '87776333', 'userID': 6}
    ]
    add_multiple_row_to_table(session, user_profile.UserProfile, values)

def setup_vendor_profile_table(session):
    value = [
        {'profileName': 'Amy ABC', 'address': 'Road 1, Singapore 123456', 'email': 'amy@example.com', 'phone': '90123456', 'status': True, 'userID': 2, 'shopDesc': 'Some short description'},
        {'profileName': "Alan's Drink Store", 'address': "alan@aa.com", 'email': 'alan@aa.com', 'phone': '88776655', 'status': False, 'userID': 5, 'shopDesc': "At Alan's Drink Store we sell all sorts of drinks"}
    ]
    add_multiple_row_to_table(session, vendor_profile.VendorProfile, value)

def setup_menuitem_table(session):
    values = [
        {'menuItemName': 'Eggplant Mala', 'price': 1.20, 'menuItemImage': None, 'menuItemDesc': 'veggie', 'isValid': True, 'vendorProfileID': 1},
        {'menuItemName': 'Steam Egg', 'price': 1, 'menuItemImage': None, 'menuItemDesc': None, 'isValid': False, 'vendorProfileID': 1},
        {'menuItemName': 'Sweet and Sour Pork', 'price': 2, 'menuItemImage': None, 'menuItemDesc': 'meat', 'isValid': True, 'vendorProfileID': 1},
        {'menuItemName': 'Potato', 'price': 0.5, 'menuItemImage': None, 'menuItemDesc': None, 'isValid': False, 'vendorProfileID': 1},
    ]
    add_multiple_row_to_table(session, menu_item.MenuItem, values)

def setup_invoice_table(session):
    values = [
        {'date': datetime.datetime(2023, 10, 15), 'totalPrice': 20.5, 'discount': 10, 'status': 'DONE', 'isFavorite': False, 'customerProfileID': 2, 'vendorProfileID': 1},
        {'date': datetime.datetime(2023, 1, 12), 'totalPrice': 15, 'discount': 0, 'status': 'DRAFT', 'isFavorite': False, 'customerProfileID': 2, 'vendorProfileID': 1}
    ]
    add_multiple_row_to_table(session, invoice.Invoice, values)

def setup_order_table(session):
    values = [
        {'menuItemID': 1, 'foodName': 'Eggplant Mala', 'quantity': 2, 'price': 2.40, 'invoiceID': 1},
        {'menuItemID': 2, 'foodName': 'Steam Egg', 'quantity': 5, 'price': 5.00, 'invoiceID': 1},
        {'menuItemID': 1, 'foodName': 'Eggplant Mala', 'quantity': 2, 'price': 2.40, 'invoiceID': 2},
        {'menuItemID': 2, 'foodName': 'Steam Egg', 'quantity': 5, 'price': 5.00, 'invoiceID': 2}
    ]
    add_multiple_row_to_table(session, order.Order, values)

def setup_promotion_table(session):
    values = [
        {'promoCode': 'CNY2023', 'discount': 5, 'discountType': 'FIXEDVALUE', 'minimumSpending': 10, 'isValid': False, 'vendorProfileID': 1},
        {'promoCode': 'NDP2023', 'discount': 25, 'discountType': 'PERCENTAGE', 'minimumSpending': 75, 'isValid': True, 'vendorProfileID': 1},
        {'promoCode': 'BLACKFRIDAY23', 'discount': 0, 'discountType': 'ONEFORONE', 'minimumSpending': 75, 'isValid': True, 'vendorProfileID': 1}
    ]
    add_multiple_row_to_table(session, promotion.Promotion, values)

def setup_otp_table(session):
    values = [
        {'otp': '$2b$12$qv/EDAIrMDCiDEv8b4j2yu0mcbwxqVtoLsbrgSSrYxL4P2VfCzoUG', 'email': 'test@example.com'},
        {'otp': '$2b$12$qv/EDAIrMDCiDEv8b4j2yu0mcbwxqVtoLsbrgSSrYxL4P2VfCzoUG', 'email': 'vendor@test.com'},
    ]
    add_multiple_row_to_table(session, otp.Otp, values)

def setup_complaint_table(session):
    values = [
        {'title': 'Test Complaint', 'description': 'Found a Bug', 'comment': 'Bug Found', 'userID': 2, 'roleID': 2, 'status': 'pending', 'createdtime': datetime.datetime.now()},
        {'title': 'Test Complaint 2', 'description': 'Other Reason', 'comment': 'No issue', 'userID': 3, 'roleID': 3, 'status': 'pending', 'createdtime': datetime.datetime.now()},
    ]
    add_multiple_row_to_table(session, complaint.Complaint, values)