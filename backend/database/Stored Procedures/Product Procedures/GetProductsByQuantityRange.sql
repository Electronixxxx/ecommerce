CREATE OR ALTER PROCEDURE GetProductsByQuantityRange
	@minQuantity INT,
	@maxQuantity INT
AS
BEGIN
	SELECT *
	FROM Products
	WHERE Stock BETWEEN @minQuantity AND @maxQuantity
END