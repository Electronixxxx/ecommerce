CREATE TABLE Orders
(
    OrderID VARCHAR(50) NOT NULL PRIMARY KEY,
    CustomerID VARCHAR(50) NOT NULL,
    OrderDate DATETIME NOT NULL,
    TotalAmount DECIMAL(10, 2) NOT NULL,
    ShippingAddress VARCHAR(100) NOT NULL,
    PaymentMethod VARCHAR(50) NOT NULL,
    OrderStatus VARCHAR(50) DEFAULT 'Pending',
    CONSTRAINT FK_Orders_Customers FOREIGN KEY (CustomerID) REFERENCES Users (UserID)
);
