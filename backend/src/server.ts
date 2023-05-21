import express from 'express';
import { UserRoutes } from './Routes/UserRoutes';
import { ProductRoutes } from './Routes/ProductRoutes';
import { CartRoutes } from './Routes/CartRoutes';
import { OrderRoutes } from './Routes/OrderRoutes';

const app = express();
app.use(express.json());
app.use('/users', UserRoutes);
app.use('/products', ProductRoutes);
app.use('/cart', CartRoutes);
app.use('/orders', OrderRoutes);

// process.on('unhandledRejection', () => {
//     console.log("0opsie Daisy!!");
// })

app.listen(6900, () => {
    console.log('Server running...');
});