CREATE OR ALTER PROCEDURE GetAllOrders
AS
BEGIN
    SELECT OrderID, CustomerID, OrderDate, TotalAmount, ShippingAddress, PaymentMethod
    FROM Orders;
END
