CREATE OR ALTER PROCEDURE GetUserByID
    @id VARCHAR(50)
AS
BEGIN
    SELECT *
    FROM Users
    WHERE id = @id
END