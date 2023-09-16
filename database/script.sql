/* ===== Database ===== */
DROP DATABASE IF EXISTS FOOD_ORDERING;
CREATE DATABASE FOOD_ORDERING;
USE FOOD_ORDERING;


/* ===== ACCESS table ===== */
DROP TABLE IF EXISTS ACCESS;
CREATE TABLE ACCESS (
    accessID    INTEGER         NOT NULL    AUTO_INCREMENT,
    accessName  VARCHAR(64)     NOT NULL,
    accessURL   VARCHAR(128)    NOT NULL,
    PRIMARY KEY(accessID)
);

INSERT INTO ACCESS (accessName, accessURL) VALUES
('ACCESS 1', 'frontend/src/pages/viewAccounts'),
('ACCESS 2', 'frontend/src/pages/viewMenuItems'),
('ACCESS 3', 'frontend/src/pages/addOrder');


/* ===== ROLE table ===== */
DROP TABLE IF EXISTS ROLE;
CREATE TABLE ROLE (
	roleID		INTEGER			NOT NULL,
    roleName	VARCHAR(50)		NOT NULL,
    PRIMARY KEY (roleID)
);

INSERT INTO ROLE VALUES
(1, 'ADMIN'),
(2, 'VENDOR'),
(3, 'CUSTOMER');


/* ===== ACCESS_CONTROL table ===== */
DROP TABLE IF EXISTS ACCESS_CONTROL;
CREATE TABLE ACCESS_CONTROL (
    accessControlID     INTEGER     NOT NULL    AUTO_INCREMENT,
    accessID            INTEGER     NOT NULL,
    roleID              INTEGER     NOT NULL,
    PRIMARY KEY (accessControlID),
    FOREIGN KEY (accessID) REFERENCES ACCESS (accessID),
    FOREIGN KEY (roleID) REFERENCES ROLE (roleID)
);

INSERT INTO ACCESS_CONTROL (accessID, roleID) VALUES
(1, 1),
(2, 2),
(3, 3);

SELECT AC.accessID, accessName, accessURL, AC.roleID, roleName
FROM ACCESS A JOIN ACCESS_CONTROL AC ON A.accessID = AC.accessID
              JOIN ROLE R ON AC.roleID = R.roleID;


/* ===== USER table ===== */
DROP TABLE IF EXISTS USER;
CREATE TABLE USER (
    userID          INTEGER         NOT NULL    AUTO_INCREMENT,
    username        VARCHAR(32)     NOT NULL,
    userPassword    VARCHAR(255)    NOT NULL,
    roleID          INTEGER         NOT NULL,
    PRIMARY KEY (userID),
    UNIQUE (username),
    FOREIGN KEY (roleID) REFERENCES ROLE (roleID)
);

INSERT INTO USER (username, userPassword, roleID) VALUES
('moses', '123', 1),
('amy', '123', 2),
('joe', '123', 3);


/* ===== USER_PROFILE table ===== */
DROP TABLE IF EXISTS USER_PROFILE;
CREATE TABLE USER_PROFILE (
    userProfileID   INTEGER         NOT NULL    AUTO_INCREMENT,
    profileName     VARCHAR(100)    NOT NULL,
    email           VARCHAR(64)     NOT NULL,
    phone           CHAR(8)         NOT NULL,
    userID          INTEGER         NOT NULL,
    PRIMARY KEY (userProfileID),
    UNIQUE (email),
    UNIQUE (phone),
    UNIQUE (userID),
    FOREIGN KEY (userID) REFERENCES USER (userID)
);

INSERT INTO USER_PROFILE (profileName, email, phone, userID) VALUES
('Moses', 'moses@example.com', '12345678', 1),
('Joe', 'joe@example.com', '78901234', 3);


/* ===== VENDOR_PROFILE table ===== */
DROP TABLE IF EXISTS VENDOR_PROFILE;
CREATE TABLE VENDOR_PROFILE (
    vendorProfileID     INTEGER         NOT NULL    AUTO_INCREMENT,
    profileName         VARCHAR(100)    NOT NULL,
    address             VARCHAR(255)    NOT NULL,
    email               VARCHAR(64)     NOT NULL,
    phone               CHAR(8)         NOT NULL,
    status              BOOLEAN         NOT NULL,
    userID              INTEGER         NOT NULL,
    PRIMARY KEY (vendorProfileID),
    UNIQUE (address),
    UNIQUE (phone),
    UNIQUE (email),
    UNIQUE (userID),
    FOREIGN KEY (userID) REFERENCES USER (userID)
);

INSERT INTO VENDOR_PROFILE (profileName, address, email, phone, status, userID) VALUES
('Amy ABC', 'Road 1, Singapore 123456', 'amy@example.com', '90123456', FALSE, 2);


/* ===== ALL_USER_PROFILE VIEW ===== */
CREATE VIEW ALL_USER_PROFILE AS
SELECT userProfileID, profileName, email, phone, NULL, U.userID, username, userPassword, R.roleID, roleName
FROM USER_PROFILE UP JOIN USER U ON UP.userID = U.userID
                     JOIN ROLE R ON U.roleID = R.roleID
UNION
SELECT vendorProfileID, profileName, email, phone, status, U.userID, username, userPassword, R.roleID, roleName
FROM VENDOR_PROFILE VP JOIN USER U ON VP.userID = U.userID
                       JOIN ROLE R ON U.roleID = R.roleID;

SELECT *
FROM ALL_USER_PROFILE;


/* ===== MENUITEM table ===== */
DROP TABLE IF EXISTS MENUITEM;
CREATE TABLE MENUITEM (
    menuItemID      INTEGER         NOT NULL    AUTO_INCREMENT,
    menuItemName    VARCHAR(50)     NOT NULL,
    price           DOUBLE          NOT NULL,
    menuItemImage   BLOB(500)       NULL,
    menuItemDesc    VARCHAR(250)    NULL,
    isValid         BOOLEAN         NOT NULL,
    vendorProfileID INTEGER         NOT NULL,
    PRIMARY KEY (menuItemID),
    UNIQUE (menuItemName, vendorProfileID),
    FOREIGN KEY (vendorProfileID) REFERENCES VENDOR_PROFILE (vendorProfileID)
);

INSERT INTO MENUITEM (menuItemName, price, menuItemImage, menuItemDesc, isValid, vendorProfileID) VALUES
('Eggplant Mala', 1.20, NULL, 'veggie', TRUE, 1),
('Steam Egg', 1, 'steamegg.png', NULL, FALSE, 1),
('Sweet and Sour Pork', 2, 'pork.jpg', 'meat', TRUE, 1);

SELECT menuItemID, menuItemName, price, menuItemImage, menuItemDesc, isValid, VP.vendorProfileID, profileName, email, phone
FROM MENUITEM F JOIN VENDOR_PROFILE VP ON F.vendorProfileID = VP.vendorProfileID;


/* ===== INVOICE table ===== */
DROP TABLE IF EXISTS INVOICE;
CREATE TABLE INVOICE (
    invoiceID           INTEGER     NOT NULL    AUTO_INCREMENT,
    date                DATE        NOT NULL,
    totalPrice          DOUBLE      NOT NULL,
    discount            DOUBLE      NOT NULL,
    status              VARCHAR(16) NOT NULL,
    isFavorite          BOOLEAN     NOT NULL,
    customerProfileID   INTEGER     NOT NULL,
    vendorProfileID     INTEGER     NOT NULL,
    PRIMARY KEY (invoiceID),
    FOREIGN KEY (customerProfileID) REFERENCES USER_PROFILE (userProfileID),
    FOREIGN KEY (vendorProfileID) REFERENCES VENDOR_PROFILE (vendorProfileID)
);

INSERT INTO INVOICE (date, totalPrice, discount, status, isFavorite, customerProfileID, vendorProfileID) VALUES
('2023-10-15', 20.5, 10, 'PENDING', FALSE, 1, 1),
('2023-01-12', 15, 0, 'DONE', TRUE, 2, 1);


/* ===== ORDER table ===== */
DROP TABLE IF EXISTS FOOD_ORDERING.ORDER;
CREATE TABLE FOOD_ORDERING.ORDER (
    orderID     INTEGER     NOT NULL    AUTO_INCREMENT,
    menuItemID  INTEGER     NOT NULL,
    foodName    VARCHAR(50) NOT NULL,
    quantity    INTEGER     NOT NULL,
    price       DOUBLE      NOT NULL,
    invoiceID   INTEGER     NOT NULL,
    PRIMARY KEY (orderID),
    UNIQUE (invoiceID, menuItemID),
    FOREIGN KEY (invoiceID) REFERENCES INVOICE (invoiceID)
);

INSERT INTO FOOD_ORDERING.ORDER (menuItemID, foodName, quantity, price, invoiceID)
SELECT 1, menuItemName, 2, (2 * price), 1
FROM MENUITEM
WHERE menuItemID = 1;

INSERT INTO FOOD_ORDERING.ORDER (menuItemID, foodName, quantity, price, invoiceID)
SELECT 2, menuItemName, 5, (5 * price), 1
FROM MENUITEM
WHERE menuItemID = 2;

SELECT orderID, menuItemID, foodName, quantity, price, I.invoiceID, date, totalPrice, discount, I.status, isFavorite, I.customerProfileID, UP.profileName AS 'customerProfileName', I.vendorProfileID, VP.profileName AS 'vendorProfileName'
FROM FOOD_ORDERING.ORDER O JOIN INVOICE I ON O.invoiceID = I.invoiceID
                           JOIN USER_PROFILE UP ON I.customerProfileID = UP.userProfileID
                           JOIN VENDOR_PROFILE VP ON I.vendorProfileID = VP.vendorProfileID;

/* ===== PROMOTION table ===== */
DROP TABLE IF EXISTS PROMOTION;
CREATE TABLE PROMOTION (
    promotionID     INTEGER     NOT NULL    AUTO_INCREMENT,
    promoCode       VARCHAR(16) NOT NULL,
    discount        DOUBLE,
    minimumSpending DOUBLE,
    isValid         BOOLEAN,
    PRIMARY KEY (promotionID),
    UNIQUE (promoCode)
);

INSERT INTO PROMOTION (promoCode, discount, minimumSpending, isValid) VALUES
('CNY2023', 5, 10, FALSE),
('NDP2023', 25, 75, TRUE);

SELECT *
FROM PROMOTION;