CREATE PROCEDURE AddToCart
    @CustomerID VARCHAR(50),
    @ProductID VARCHAR(50),
    @Quantity INT,
    @UnitPrice DECIMAL(10, 2),
    @TotalPrice DECIMAL(10, 2)
AS
BEGIN
    IF NOT EXISTS (SELECT 1
    FROM Cart
    WHERE CustomerID = @CustomerID)
    BEGIN
        INSERT INTO Cart
            (CustomerID, CreatedDate)
        VALUES
            (@CustomerID, GETDATE());
    END;

    DECLARE @CartID INT;
    SET @CartID = (SELECT CartID
    FROM Cart
    WHERE CustomerID = @CustomerID);

    IF EXISTS (SELECT 1
    FROM CartItems
    WHERE CartID = @CartID AND ProductID = @ProductID)
    BEGIN
        UPDATE CartItems
        SET Quantity = @Quantity,
            TotalPrice = @TotalPrice
        WHERE CartID = @CartID
            AND ProductID = @ProductID;
    END
    ELSE
    BEGIN
        INSERT INTO CartItems
            (CartID, ProductID, Quantity, UnitPrice, TotalPrice)
        VALUES
            (@CartID, @ProductID, @Quantity, @UnitPrice, @TotalPrice);
    END;
END;

