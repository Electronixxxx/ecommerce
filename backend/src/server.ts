import express, { Request, Response } from 'express';
import { UserRoutes } from './Routes/UserRoutes';
import { ProductRoutes } from './Routes/ProductRoutes';

const app = express();
app.use(express.json());
app.use('/users', UserRoutes);
app.use('/products', ProductRoutes);

app.listen(6900, () => {
    console.log('Server running...');
});
