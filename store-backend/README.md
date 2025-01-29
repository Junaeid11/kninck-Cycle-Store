# Bi-Cycle-Store

## Project Live Link
[Bi-Cycle-Store](https://bi-cycle-stores.vercel.app/)

## Project Features
1. MongoDB
2. TypeScript
3. Mongoose
4. ESLint
5. Vercel Hosting

## Project Description
This is a full backend project for a bicycle store. The store allows users to view a list of products, add new bicycles, and delete existing ones. The project utilizes MongoDB for the database, TypeScript for type checking, Mongoose for database connection, and ESLint for code formatting. The project is hosted on Vercel.

### API Endpoints
- **Products**
    - `GET /api/products` - Retrieve all products
    - `POST /api/products` - Add a new product
    - `DELETE /api/products/:id` - Delete a product by ID
    - `GET /api/products/:id` - Retrieve a product by ID
    - `PUT /api/products/:id` - Update a product by ID

- **Orders**
    - `GET /api/orders` - Retrieve all orders
    - `POST /api/orders` - Add a new order

- **Revenue**
    - `GET /api/revenue` - Retrieve total revenue

### Personal Experience
I spent almost two days creating this project. I tried my best to achieve all the desired results. Thank you, Programming Hero, for this project. I have learned a lot from this experience.

## Project Structure
```
src
├── app.ts
├── config
│   └── index.ts
├── modules
│   ├── Order
│   │   ├── order.controller.ts
│   │   ├── order.model.ts
│   │   ├── order.route.ts
│   │   ├── order.service.ts
│   │   └── order.interface.ts
│   └── Product
│       ├── product.controller.ts
│       ├── product.model.ts
│       ├── product.route.ts
│       ├── product.service.ts
│       └── product.interface.ts
├── app.ts
└── server.ts
.env
.eslintrc.json
.gitignore
package-lock.json
package.json
README.md
tsconfig.json
```

## Project Author
Junaeid Ahmed Tanim
