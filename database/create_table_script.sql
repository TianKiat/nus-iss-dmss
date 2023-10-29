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

/* ===== ROLE table ===== */
DROP TABLE IF EXISTS ROLE;
CREATE TABLE ROLE (
	roleID		INTEGER			NOT NULL,
    roleName	VARCHAR(50)		NOT NULL,
    PRIMARY KEY (roleID)
);

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