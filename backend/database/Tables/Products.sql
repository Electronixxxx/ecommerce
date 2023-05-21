CREATE TABLE Products
(
	id VARCHAR(50) NOT NULL PRIMARY KEY,
	productName VARCHAR(50) NOT NULL UNIQUE,
	description VARCHAR(50),
	longDescription VARCHAR(250),
	unitPrice INT,
	discount INT,
	category VARCHAR(50),
	stock INT,
	addedOn DATE DEFAULT GETDATE()
);