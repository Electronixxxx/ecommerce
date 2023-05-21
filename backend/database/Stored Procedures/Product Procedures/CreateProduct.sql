CREATE OR ALTER PROCEDURE CreateProduct
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
    INSERT INTO Products
        (id, productName, description, longDescription, unitPrice, discount, category, stock)
    VALUES
        (@id, @productName, @description, @longDescription, @unitPrice, @discount, @category, @stock)
END