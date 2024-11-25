const express = require('express');
const staffRoutes = require('./routes/staff');
const usersRoutes = require('./routes/users');
const productSuppliersRoutes = require('./routes/products_suppliers'); // Importa las rutas de products_suppliers
const productRoutes = require('./routes/products'); // Importa las rutas de products
const suppliersRoutes = require('./routes/suppliers');

class Server {
    constructor() {
        this.app = express();
        this.port = 3000;

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(express.json()); // Permitir JSON en las solicitudes
    }

    routes() {
        // Rutas de los recursos correspondientes
        this.app.use('/staff', staffRoutes); // Rutas de staff
        this.app.use('/users', usersRoutes); // Rutas de users
        this.app.use('/products_suppliers', productSuppliersRoutes); // Rutas de products_suppliers
        this.app.use('/products', productRoutes); // Rutas de products
        this.app.use('/suppliers', suppliersRoutes);//Rutas de suppliers
    }

    start() {
        this.app.listen(this.port, () => {
            console.log('Server listening on port ' + this.port);
        });
    }
}

module.exports = { Server };
