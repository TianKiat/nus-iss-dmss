/* Create database */
DROP DATABASE IF EXISTS FOOD_ORDERING;
CREATE DATABASE FOOD_ORDERING;
USE FOOD_ORDERING;

/* Create ROLES table */
DROP TABLE IF EXISTS ROLES;
CREATE TABLE ROLES (
	roleID		INTEGER			NOT NULL,
    roleName	VARCHAR(50)		NOT NULL,
    PRIMARY KEY (roleID)
);

INSERT INTO ROLES VALUES
(1, 'ADMIN'),
(2, 'VENDOR'),
(3, 'CUSTOMER');

/* Create USER_PROFILES table */
DROP TABLE IF EXISTS USER_PROFILES;
CREATE TABLE USER_PROFILES (
	profileID		INTEGER			NOT NULL 	AUTO_INCREMENT,
    profileName		VARCHAR(100)	NOT NULL,
    PRIMARY KEY (profileID)
);

INSERT INTO USER_PROFILES (profileName) VALUES
('Moses'),
('Amy'),
('Joe');

/* Create USERS table */
DROP TABLE IF EXISTS USERS;
CREATE TABLE USERS (
	userID			INTEGER			NOT NULL	AUTO_INCREMENT,
    username		VARCHAR(25)		NOT NULL,
    userPassword	VARCHAR(50)		NOT NULL,
    roleID			INTEGER			NOT NULL,
    profileID		INTEGER			NOT NULL,
    PRIMARY KEY (userID),
    UNIQUE (username),
    FOREIGN KEY (roleID) REFERENCES ROLES (roleID),
    FOREIGN KEY (profileID) REFERENCES USER_PROFILES (profileID)
);

INSERT INTO USERS (username, userPassword, roleID, profileID) VALUES
('moses', '123', 1, 1),
('amy', '123',  2, 2),
('joe', '123', 3, 3);

/* See all records */
SELECT userID, username, userPassword, R.roleID, roleName, P.profileID, profileName
FROM USERS U JOIN ROLES R ON U.roleID = R.roleID
			 JOIN USER_PROFILES P ON U.profileID = P.profileID;