CREATE OR ALTER PROCEDURE GetProductsByQuantityRange
	@minQuantity INT,
	@maxQuantity INT
AS
BEGIN
	SELECT *
	FROM Products
	WHERE stock BETWEEN @minQuantity AND @maxQuantity
END