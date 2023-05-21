CREATE TABLE Users
(
    id VARCHAR(50) NOT NULL PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    address VARCHAR(75),
    role VARCHAR(15) DEFAULT 'customer',
    isDeleted BIT NOT NULL DEFAULT 0,
    approved BIT NOT NULL DEFAULT 0,
    emailSent BIT NOT NULL DEFAULT 0
);