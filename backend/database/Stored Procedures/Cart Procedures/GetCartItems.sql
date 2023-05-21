CREATE OR ALTER PROCEDURE GetCartItems
    @customerID VARCHAR(50)
AS
BEGIN
    SELECT * FROM Cart WHERE customerID = @customerID
END
