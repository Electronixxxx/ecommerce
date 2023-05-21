CREATE OR ALTER PROCEDURE RegisterUser
    @id VARCHAR(50),
    @firstName VARCHAR(50),
    @lastName VARCHAR(50),
    @email VARCHAR(50),
    @password VARCHAR(100),
    @address VARCHAR(75)
AS
BEGIN
    INSERT INTO Users
    (
        id,
        firstName,
        lastName,
        email,
        password,
        address
    )
    VALUES
    (
        @id,
        @firstName,
        @lastName,
        @email,
        @password,
        @address
    )
END
