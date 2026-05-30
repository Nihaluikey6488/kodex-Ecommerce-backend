# API Documentation

## Project Structure

```
e-commerceCart/
├── .gitignore
├── package.json
├── package-lock.json
├── server.js                 # Server entry point
├── src/
│   ├── app.js                # Express app setup
│   ├── config/
│   │   └── imageKit.js       # ImageKit configuration
│   ├── controllers/
│   │   ├── auth.controller.js      # Authentication controllers
│   │   └── product.controller.js   # Product controllers
│   ├── middlewares/
│   │   ├── auth.middleware.js       # Authentication middleware
│   │   └── multer.middleware.js     # File upload middleware
│   ├── models/
│   │   ├── products.model.js       # Product schema model
│   │   └── users.model.js          # User schema model
│   ├── routes/
│   │   ├── auth.routes.js          # Authentication routes
│   │   └── product.routes.js       # Product routes
│   ├── services/
│   │   └── auth.service.js         # Authentication service
│   └── utils/
│       ├── apiError.js             # Custom error class
│       ├── apiResponse.js          # Standard response class
│       ├── asyncHandler.js         # Async error wrapper
│       └── token.js                # JWT token utility
```

---

## Product Management Endpoints

### 1. Create a New Product
- **Route**: `/products`
- **Method**: `POST`
- **Required Fields**: `name`, `description`, `price`, `category`
- **Request Body**:
  ```json
  {
    "name": "string",
    "description": "string",
    "price": number,
    "category": "string",
    "images": [file1, file2, ...] (up to 5 files)
  }
  ```
- **Response Format**:
  ```json
  {
    "message": "Product created successfully",
    "product": {
      "name": "string",
      "description": "string",
      "price": number,
      "category": "string",
      "images": ["url1", "url2", ...],
      "user": "email"
    }
  }
  ```
- **Authentication Requirement**: Yes (requires authentication)
- **Example Request**:
  ```bash
  curl -X POST http://localhost:3000/products \
    -H "Authorization: Bearer <token>" \
    -F "name=New Product" \
    -F "description=This is a new product" \
    -F "price=100.50" \
    -F "category=Electronics" \
    -F "images=@image1.jpg" \
    -F "images=@image2.jpg"
  ```
- **Example Response**:
  ```json
  {
    "message": "Product created successfully",
    "product": {
      "name": "New Product",
      "description": "This is a new product",
      "price": 100.50,
      "category": "Electronics",
      "images": ["https://imagekit.io/new-product1.jpg", "https://imagekit.io/new-product2.jpg"],
      "user": "user@example.com"
    }
  }
  ```
- **Error Response**:
  ```json
  {
    "status": 400,
    "message": "Name is required"
  }
  ```

### 2. Get All Products
- **Route**: `/products`
- **Method**: `GET`
- **Required Fields**: None
- **Request Body**: None
- **Response Format**:
  ```json
  {
    "message": "Products fetched successfully",
    "products": [
      {
        "name": "string",
        "description": "string",
        "price": number,
        "category": "string",
        "images": ["url1", "url2", ...],
        "user": "email"
      },
      ...
    ]
  }
  ```
- **Authentication Requirement**: Yes (requires authentication)
- **Example Request**:
  ```bash
  curl -X GET http://localhost:3000/products \
    -H "Authorization: Bearer <token>"
  ```
- **Example Response**:
  ```json
  {
    "message": "Products fetched successfully",
    "products": [
      {
        "name": "Product 1",
        "description": "This is product 1",
        "price": 100.50,
        "category": "Electronics",
        "images": ["https://imagekit.io/product1.jpg"],
        "user": "user@example.com"
      },
      ...
    ]
  }
  ```
- **Error Response**:
  ```json
  {
    "status": 400,
    "message": "No products added"
  }
  ```

### 3. Get Product by ID
- **Route**: `/products/:id`
- **Method**: `GET`
- **Required Fields**: `id`
- **Request Body**: None
- **Response Format**:
  ```json
  {
    "message": "Product fetched successfully",
    "product": {
      "name": "string",
      "description": "string",
      "price": number,
      "category": "string",
      "images": ["url1", "url2", ...],
      "user": "email"
    }
  }
  ```
- **Authentication Requirement**: Yes (requires authentication)
- **Example Request**:
  ```bash
  curl -X GET http://localhost:3000/products/648891f260977361cbd7413c87eea307d7abfb8d \
    -H "Authorization: Bearer <token>"
  ```
- **Example Response**:
  ```json
  {
    "message": "Product fetched successfully",
    "product": {
      "name": "Product 1",
      "description": "This is product 1",
      "price": 100.50,
      "category": "Electronics",
      "images": ["https://imagekit.io/product1.jpg"],
      "user": "user@example.com"
    }
  }
  ```
- **Error Response**:
  ```json
  {
    "status": 404,
    "message": "Product not found"
  }
  ```

### 4. Delete Product by ID
- **Route**: `/products/:id`
- **Method**: `DELETE`
- **Required Fields**: `id`
- **Request Body**: None
- **Response Format**:
  ```json
  {
    "message": "Product deleted successfully"
  }
  ```
- **Authentication Requirement**: Yes (requires authentication)
- **Example Request**:
  ```bash
  curl -X DELETE http://localhost:3000/products/648891f260977361cbd7413c87eea307d7abfb8d \
    -H "Authorization: Bearer <token>"
  ```
- **Example Response**:
  ```json
  {
    "message": "Product deleted successfully"
  }
  ```
- **Error Response**:
  ```json
  {
    "status": 404,
    "message": "Product not found"
  }
  ```

### 5. Update Product by ID
- **Route**: `/products/:id`
- **Method**: `PUT`
- **Required Fields**: `id`, `name`, `description`, `price`, `category`
- **Request Body**:
  ```json
  {
    "name": "string",
    "description": "string",
    "price": number,
    "category": "string",
    "images": [file1, file2, ...] (up to 5 files)
  }
  ```
- **Response Format**:
  ```json
  {
    "message": "Product updated successfully"
  }
  ```
- **Authentication Requirement**: Yes (requires authentication)
- **Example Request**:
  ```bash
  curl -X PUT http://localhost:3000/products/648891f260977361cbd7413c87eea307d7abfb8d \
    -H "Authorization: Bearer <token>" \
    -F "name=Updated Product" \
    -F "description=This is an updated product" \
    -F "price=150.50" \
    -F "category=Electronics" \
    -F "images=@image1.jpg" \
    -F "images=@image2.jpg"
  ```
- **Example Response**:
  ```json
  {
    "message": "Product updated successfully"
  }
  ```
- **Error Response**:
  ```json
  {
    "status": 400,
    "message": "Name is required"
  }
  ```

## Authentication Endpoints

### 1. Register User
- **Route**: `/register`
- **Method**: `POST`
- **Required Fields**: `name`, `email`, `password`
- **Request Body**:
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response Format**:
  ```json
  {
    "message": "User registered successfully",
    "user": {
      "name": "string",
      "email": "string",
      "password": "string"
    }
  }
  ```
- **Authentication Requirement**: No
- **Example Request**:
  ```bash
  curl -X POST http://localhost:3000/register \
    -H "Content-Type: application/json" \
    -d '{
      "name": "John Doe",
      "email": "john.doe@example.com",
      "password": "securepassword123"
    }'
  ```
- **Example Response**:
  ```json
  {
    "message": "User registered successfully",
    "user": {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "password": "securepassword123"
    }
  }
  ```
- **Error Response**:
  ```json
  {
    "status": 400,
    "message": "All fields are required"
  }
  ```

### 2. Login User
- **Route**: `/login`
- **Method**: `POST`
- **Required Fields**: `email`, `password`
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response Format**:
  ```json
  {
    "message": "User logged in successfully"
  }
  ```
- **Authentication Requirement**: No
- **Example Request**:
  ```bash
  curl -X POST http://localhost:3000/login \
    -H "Content-Type: application/json" \
    -d '{
      "email": "john.doe@example.com",
      "password": "securepassword123"
    }'
  ```
- **Example Response**:
  ```json
  {
    "message": "User logged in successfully"
  }
  ```
- **Error Response**:
  ```json
  {
    "status": 401,
    "message": "Invalid Credentials"
  }
  ```

## Environment Variables
- **PORT**: Port number for the server to listen on (default: 3000)
- **MONGO_URI**: MongoDB connection string
- **JWT_SECRET**: Secret key for JWT token generation
- **IMAGEKIT_PUBLIC_KEY**: Public key for ImageKit
- **IMAGEKIT_PRIVATE_KEY**: Private key for ImageKit
- **IMAGEKIT_URL_ENDPOINT**: URL endpoint for ImageKit