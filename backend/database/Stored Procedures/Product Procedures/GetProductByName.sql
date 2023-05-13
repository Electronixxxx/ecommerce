CREATE PROCEDURE GetProductByName
	@productName VARCHAR(50)
AS
BEGIN
	SELECT *
	FROM Products
	WHERE ProductName LIKE '%' + @productName + '%'
END