CREATE OR ALTER PROCEDURE AddToCart
    @itemID VARCHAR(50),
    @customerID VARCHAR(50),
    @productID VARCHAR(50),
    @quantity DECIMAL (10,2),
    @unitPrice DECIMAL (10,2),
    @discount DECIMAL (10,2),
    @totalPrice INT
AS
BEGIN
    INSERT INTO Cart (itemID, customerID, productID, quantity, unitPrice, discount, totalPrice)
    VALUES (@itemID, @customerID, @productID, @quantity, @unitPrice, @discount, @totalPrice)
END
