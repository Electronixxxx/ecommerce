CREATE OR ALTER PROCEDURE GetProductsByPriceRange
	@minPrice DECIMAL(18, 2),
	@maxPrice DECIMAL(18, 2)
AS
BEGIN
	SELECT *
	FROM Products
	WHERE unitPrice BETWEEN @minPrice AND @maxPrice
END