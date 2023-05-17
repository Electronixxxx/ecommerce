CREATE OR ALTER PROCEDURE PlaceOrder
	@OrderID VARCHAR(50),
	@CustomerID VARCHAR(50),
	@ShippingAddress VARCHAR(100),
	@PaymentMethod VARCHAR(50)
AS
BEGIN
	DECLARE @OrderDate DATETIME;
	DECLARE @TotalAmount DECIMAL(10, 2);

	BEGIN TRANSACTION;

	-- Insert the order into the Orders table
	INSERT INTO Orders
		(OrderID, CustomerID, OrderDate, TotalAmount, ShippingAddress, PaymentMethod)
	VALUES
		(@OrderID, @CustomerID, GETDATE(), 0, @ShippingAddress, @PaymentMethod);

	-- Calculate the total amount for the order
	SET @TotalAmount = (
		SELECT SUM(UnitPrice * Quantity)
	FROM CartItems
	WHERE CartItems.CartID = (SELECT CartID
	FROM Cart
	WHERE CustomerID = @CustomerID)
	);

	-- Update the TotalAmount in the Orders table
	UPDATE Orders
	SET TotalAmount = @TotalAmount
	WHERE OrderID = @OrderID;

	-- Insert order items into the OrderItems table
	INSERT INTO OrderItems
		(OrderID, ProductID, Quantity, UnitPrice, TotalPrice)
	SELECT @OrderID, ProductID, Quantity, UnitPrice, (UnitPrice * Quantity)
	FROM CartItems
	WHERE CartID = (SELECT CartID
	FROM Cart
	WHERE CustomerID = @CustomerID);

	-- Subtract the quantity from the Products table
	UPDATE Products
	SET Stock = Stock - CI.Quantity
	FROM Products P
		INNER JOIN CartItems CI ON P.ProductID = CI.ProductID
		INNER JOIN Cart C ON CI.CartID = C.CartID
	WHERE C.CustomerID = @CustomerID;

	-- Delete cart items from the CartItems table
	DELETE FROM CartItems
	WHERE CartID = (SELECT CartID
	FROM Cart
	WHERE CustomerID = @CustomerID);

	-- Delete the cart from the Cart table
	DELETE FROM Cart
	WHERE CustomerID = @CustomerID;

	COMMIT;

	SELECT @OrderID AS OrderID;
END
