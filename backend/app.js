const { v4: uuidv4 } = require('uuid');
const mssql = require('mssql');
const sqlConfig = require('./dist/config')

// Sample data for 5 products
const products = [
    {
        ProductName: 'Product 1',
        Description: 'This is product 1',
        LongDescription: 'A long description for product 1',
        Price: 1000,
        Category: 'Category 1',
        Stock: 10,
        Images: 'https://example.com/product1.jpg'
    },
    {
        ProductName: 'Product 2',
        Description: 'This is product 2',
        LongDescription: 'A long description for product 2',
        Price: 2000,
        Category: 'Category 2',
        Stock: 20,
        Images: 'https://example.com/product2.jpg'
    },
    {
        ProductName: 'Product 3',
        Description: 'This is product 3',
        LongDescription: 'A long description for product 3',
        Price: 3000,
        Category: 'Category 2',
        Stock: 30,
        Images: 'https://example.com/product3.jpg'
    },
    {
        ProductName: 'Product 4',
        Description: 'This is product 4',
        LongDescription: 'A long description for product 4',
        Price: 4000,
        Category: 'Category 1',
        Stock: 40,
        Images: 'https://example.com/product4.jpg'
    },
    {
        ProductName: 'Product 5',
        Description: 'This is product 5',
        LongDescription: 'A long description for product 5',
        Price: 5000,
        Category: 'Category 2',
        Stock: 50,
        Images: 'https://example.com/product5.jpg'
    }
];

// Function to insert the products into the database
async function insertProducts() {
    try {
        // Connect to the database
        const pool = await mssql.connect(sqlConfig);

        // Loop through each product and insert it into the database
        for (const product of products) {
            // Generate a UUID v4 for the ProductID
            const productId = uuidv4();

           

            // Insert the product into the database
            await pool.request().query`
                INSERT INTO [dbo].[Products] (ProductID, ProductName, Description, LongDescription, Price, Category, Stock, Images)
                VALUES (${productId}, ${product.ProductName}, ${product.Description}, ${product.LongDescription}, ${product.Price}, ${product.Category}, ${product.Stock}, ${product.Images});
            `;
        }

        console.log('Products inserted successfully');
    } catch (err) {
        console.error(err);
    }
}

// Call the insertProducts function to insert the products into the database
insertProducts();
