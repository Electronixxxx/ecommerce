CREATE OR ALTER PROCEDURE UpdateProduct
	@id VARCHAR(50),
	@productName VARCHAR(50),
	@description VARCHAR(50),
	@longDescription VARCHAR(250),
	@unitPrice INT,
	@discount INT,
	@category VARCHAR(50),
	@stock INT
AS
BEGIN
	UPDATE Products
    SET productName = @productName, description = @description, longDescription = @longDescription, category = @category, unitPrice = @unitPrice, discount = @discount, stock = @stock
    WHERE id = @id
END