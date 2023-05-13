CREATE OR ALTER PROCEDURE UpdateUser
    @userID VARCHAR(50),
    @username VARCHAR(50),
    @password VARCHAR(50),
    @email VARCHAR(50),
    @first_name VARCHAR(50),
    @last_name VARCHAR(50),
    @address VARCHAR(100),
    @city VARCHAR(50)
AS
BEGIN
    UPDATE Users
    SET Username = @username, Password = @password, Email = @email, FirstName = @first_name, LastName = @last_name,
        Address = @address, City = @city
    WHERE UserID = @userID
END