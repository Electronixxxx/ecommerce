CREATE OR ALTER PROCEDURE UpdateProduct
	@productID VARCHAR(50),
	@productName VARCHAR(50),
	@description VARCHAR(255),
	@longDescription VARCHAR(500),
	@category VARCHAR(50),
	@price DECIMAL(18, 2),
	@stock INT,
	@images VARCHAR(255)
AS
BEGIN
	UPDATE Products
    SET ProductName = @productName, Description = @description, LongDescription = @longDescription, Category = @category, Price = @price, Stock = @stock, Images = @images
    WHERE ProductID = @ProductID
END