CREATE TABLE Orders
(
	id VARCHAR(50) PRIMARY KEY,
	customerID VARCHAR(50),
	totalAmount INT,
	orderDate DATE,
	address VARCHAR(150),
	paymentMethod VARCHAR(50),
	orderStatus VARCHAR(50) DEFAULT 'pending',
	FOREIGN KEY (customerID) REFERENCES Users(id)
);