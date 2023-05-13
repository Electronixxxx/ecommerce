CREATE OR ALTER PROCEDURE LoginUser
    @username VARCHAR(50),
    @password VARCHAR(50)
AS
BEGIN
    SELECT *
    FROM Users
    WHERE Username = @username AND Password = @password
END