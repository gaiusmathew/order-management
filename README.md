# Order Management System

A Node.js/Express application with TypeScript for managing orders and payments.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd order-management
```

2. Install dependencies:

```bash
npm install
```

## Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=3000

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/order_management

```

## Available Scripts

- `npm run dev`: Start the development server with hot-reload
- `npm run build`: Compile TypeScript to JavaScript
- `npm run watch`: Watch for TypeScript changes and compile
- `npm test`: Run all tests
- `npm run test:watch`: Run tests in watch mode

## Development

To start the development server:

```bash
npm run dev
```

The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

## Building for Production

1. Compile the TypeScript code:

```bash
npm run build
```

2. Start the production server:

```bash
npm start
```

## Testing

The project uses Jest for testing. Test files are located in the `tests/` directory.

### Running Tests

- Run all tests:

```bash
npm test
```

- Run tests in watch mode:

```bash
npm run test:watch
```

- Run specific test file:

```bash
npm test -- tests/services/orderService.test.ts
```

### Test Coverage

To generate test coverage report:

```bash
npm test -- --coverage
```

The coverage report will be available in the `coverage/` directory.

## Project Structure

```
├── src/
│   ├── controllers/
│   │   ├── orderController.ts
│   │   └── userController.ts
│   ├── models/
│   │   ├── Order.ts
│   │   └── User.ts
│   ├── repositories/
│   │   └── orderRepository.ts
│   ├── services/
│   │   ├── orderService.ts
│   │   ├── paymentService.ts
│   │   └── userService.ts
│   ├── routes/
│   │   ├── index.ts
│   │   ├── orderRoutes.ts
│   │   └── userRoutes.ts
│   ├── config/
│   │   └── database.ts
│   ├── constants/
│   │   ├── httpStatusCodes.ts
│   │   └── messages.ts
│   ├── interfaces/
│   │   ├── IOrder.ts
│   │   ├── IPaymentProvider.ts
│   │   └── IRequest.ts
│   ├── middleware/
│   │   └── authMiddleware.ts
│   ├── utils/
│   │   └── logger.ts
│   ├── app.ts
│   └── main.ts
├── tests/
│   ├── providers/
│   │   ├── BankTransferProvider.test.ts
│   │   └── StripePaymentProvider.test.ts
│   ├── services/
│   │   ├── orderService.test.ts
│   │   └── paymentService.test.ts
├── .env
├── .gitignore
├── nodemon.json
├── package.json
└── tsconfig.json
```

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Write or update tests
4. Create a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
