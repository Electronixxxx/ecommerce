CREATE OR ALTER PROCEDURE CreateProduct
    @productID VARCHAR(50),
    @productName VARCHAR(50),
    @description VARCHAR(255),
    @longDescription VARCHAR(500),
    @Price DECIMAL(18, 2),
    @category VARCHAR(50),
    @stock INT,
    @images VARCHAR(255)
AS
BEGIN
    INSERT INTO Products
        (ProductID, ProductName, Description, LongDescription, Price, Category, Stock, Images)
    VALUES
        (@productID, @productName, @description, @longDescription, @price, @category, @stock, @images)
END