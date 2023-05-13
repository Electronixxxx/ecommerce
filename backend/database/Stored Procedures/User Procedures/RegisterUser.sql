CREATE OR ALTER PROC RegisterUser
    @id VARCHAR(50),
    @username VARCHAR(50),
    @password VARCHAR(100),
    @email VARCHAR(50),
    @first_name VARCHAR(50),
    @last_name VARCHAR(50),
    @address VARCHAR(100),
    @city VARCHAR(50)
AS
BEGIN
    INSERT INTO Users
        (
        id,
        Username,
        Password,
        Email,
        FirstName,
        LastName,
        Address,
        City
        )

    VALUES
        (
            @id,
            @username,
            @password,
            @email,
            @first_name,
            @last_name,
            @address,
            @city)
END
