CREATE TABLE Cart
(
	itemID VARCHAR(50) PRIMARY KEY,
	customerID VARCHAR(50),
	ProductID VARCHAR(50),
	quantity INT,
	unitPrice DECIMAL (10,2),
	discount DECIMAL (10,2),
	totalPrice DECIMAL (10,2),
	FOREIGN KEY (customerID) REFERENCES Users(id),
	FOREIGN KEY (ProductID) REFERENCES Products(id)
);