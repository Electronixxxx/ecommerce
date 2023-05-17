CREATE PROCEDURE GetCartItems
	@CustomerID VARCHAR(50)
AS
BEGIN
	SELECT C.CartID, C.CreatedDate, CI.CartItemID, CI.ProductID, CI.Quantity, CI.UnitPrice, CI.TotalPrice
	FROM Cart C
		INNER JOIN CartItems CI ON C.CartID = CI.CartID
	WHERE C.CustomerID = @CustomerID;
END