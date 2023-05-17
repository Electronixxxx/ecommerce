CREATE OR ALTER PROCEDURE GetOrderByID
    @OrderID VARCHAR(50)
AS
BEGIN
    SELECT OrderID, CustomerID, OrderDate, TotalAmount, ShippingAddress, PaymentMethod
    FROM Orders
    WHERE OrderID = @OrderID;
END
