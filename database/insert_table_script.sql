/* ===== ACCESS table ===== */
INSERT INTO ACCESS (accessName, accessURL) VALUES
('Order', 'Order'),
('Basket', 'Basket'),
('Profile', 'Profile'),
('Create_Complaint', 'Create_Complaint'),
('Complaint', 'Complaint');

/* ===== ROLE table ===== */
INSERT INTO ROLE VALUES
(1, 'ADMIN'),
(2, 'VENDOR'),
(3, 'CUSTOMER');

/* ===== ACCESS_CONTROL table ===== */
INSERT INTO ACCESS_CONTROL (accessID, roleID) VALUES
(1, 1),
(2, 2),
(3, 3);

/* ===== USER table ===== */
INSERT INTO USER (username, userPassword, roleID, isDisabled) VALUES
('moses', '123', 1, 0),
('amy', '123', 2, 0),
('joe', '123', 3, 0);

/* ===== USER_PROFILE table ===== */
INSERT INTO USER_PROFILE (profileName, email, phone, userID) VALUES
('Moses', 'moses@example.com', '12345678', 1),
('Joe', 'joe@example.com', '78901234', 3);

/* ===== VENDOR_PROFILE table ===== */
INSERT INTO VENDOR_PROFILE (profileName, address, email, phone, status, userID, shopDesc) VALUES
('Amy ABC', 'Road 1, Singapore 123456', 'amy@example.com', '90123456', FALSE, 2, 'The only online cai png');

/* ===== MENUITEM table ===== */
INSERT INTO MENUITEM (menuItemName, price, menuItemImage, menuItemDesc, isValid, vendorProfileID) VALUES
('Eggplant Mala', 1.20, NULL, 'veggie', TRUE, 1),
('Steam Egg', 1, 'steamegg.png', NULL, FALSE, 1),
('Sweet and Sour Pork', 2, 'pork.jpg', 'meat', TRUE, 1);

/* ===== INVOICE table ===== */
INSERT INTO INVOICE (date, totalPrice, discount, status, isFavorite, customerProfileID, vendorProfileID) VALUES
('2023-10-15', 20.5, 10, 'PENDING', FALSE, 1, 1),
('2023-01-12', 15, 0, 'DONE', TRUE, 2, 1);

/* ===== ORDER table ===== */
INSERT INTO FOOD_ORDERING.ORDER (menuItemID, foodName, quantity, price, invoiceID)
SELECT 1, menuItemName, 2, (2 * price), 1
FROM MENUITEM
WHERE menuItemID = 1;

INSERT INTO FOOD_ORDERING.ORDER (menuItemID, foodName, quantity, price, invoiceID)
SELECT 2, menuItemName, 5, (5 * price), 1
FROM MENUITEM
WHERE menuItemID = 2;

/* ===== PROMOTION table ===== */
INSERT INTO PROMOTION (promoCode, discount, discountType, minimumSpending, isValid, vendorProfileID) VALUES
('CNY2023', 5, 'FIXEDVALUE', 10, FALSE, 1),
('NDP2023', 25, 'PERCENTAGE', 75, TRUE, 1),
('BLACKFRIDAY2023', 0, 'ONEFORONE', 75, TRUE, 1);