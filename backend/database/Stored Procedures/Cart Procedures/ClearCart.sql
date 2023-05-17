CREATE OR ALTER PROCEDURE ClearCart
    @CustomerID VARCHAR(50)
AS
BEGIN
    DELETE CI
    FROM CartItems CI
    INNER JOIN Cart C ON CI.CartID = C.CartID
    WHERE C.CustomerID = @CustomerID;

    DELETE FROM Cart
    WHERE CustomerID = @CustomerID;
END