CREATE PROCEDURE RemoveFromCart
    @CustomerID VARCHAR(50),
    @ProductID VARCHAR(50)
AS
BEGIN
    DELETE CI
    FROM CartItems CI
    INNER JOIN Cart C ON CI.CartID = C.CartID
    WHERE C.CustomerID = @CustomerID
    AND CI.ProductID = @ProductID;
END
