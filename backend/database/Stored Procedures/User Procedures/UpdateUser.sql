CREATE OR ALTER PROCEDURE UpdateUser
    @id VARCHAR(50),
    @firstName VARCHAR(50),
    @lastName VARCHAR(50),
    @email VARCHAR(50),
    @password VARCHAR(50),
    @address VARCHAR(100)
AS
BEGIN
    UPDATE Users
    SET firstName = @firstName, lastName = @lastName, password = @password, email = @email,
        address = @address
    WHERE id = @id
END