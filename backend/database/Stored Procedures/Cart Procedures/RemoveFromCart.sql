CREATE OR ALTER PROCEDURE RemoveFromCart
    @itemID VARCHAR(50),
    @customerID VARCHAR(50)
AS
BEGIN
    DELETE FROM Cart WHERE itemID = @itemID AND customerID = @customerID
END
