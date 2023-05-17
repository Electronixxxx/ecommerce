CREATE PROCEDURE UpdateOrderStatus
    @OrderID VARCHAR(50),
    @OrderStatus VARCHAR(50)
AS
BEGIN
    UPDATE Orders
    SET OrderStatus = @OrderStatus
    WHERE OrderID = @OrderID;
END
