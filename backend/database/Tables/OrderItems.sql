CREATE TABLE OrderItems
(
	itemID VARCHAR(50) PRIMARY KEY,
	orderID VARCHAR(50),
	productID VARCHAR(50),
	quantity INT,
	unitPrice INT,
	totalPrice INT,
	FOREIGN KEY (orderID) REFERENCES Orders(id),
	FOREIGN KEY (productID) REFERENCES Products(id)
);

