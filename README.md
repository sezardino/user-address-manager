# User Address Manager

## Overview

User Address Manager is a Next.js application for managing users and their addresses. The project includes a paginated user list, address management, and basic CRUD operations using server actions.

## Features

- Paginated user list with a mock "Create User" button.
- Context menu for each user with "Edit" and "Delete" options (mocked).
- Ability to create new addresses.
- Address forms implemented in modals.
- Real-time address preview while inputting data.
- Server-side validation and error handling.
- Modular and extensible codebase for additional CRUD components.

## Tech Stack

- **Frontend:** Next.js, React, TailwindCSS, Radix UI, React Hook Form, Zod
- **Backend:** Next.js Server Actions, Drizzle ORM, PostgreSQL
- **Validation:** Zod, PostgreSQL constraints

## Setup

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/sezardino/user-address-manager.git
   cd user-address-manager
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

### Database Setup

1. Start the database using Docker:
   ```sh
   docker compose up -d
   ```

### Development

To start the development server:

```sh
npm run dev
```

The application will be available at `http://localhost:3000`.

### Linting & Formatting

Run ESLint to check code quality:

```sh
npm run lint
```

### Building for Production

To build the application:

```sh
npm run build
```

To start the production server:

```sh
npm run start
```

## Deployment

The project is prepared for deployment. You can deploy it using any Next.js-supported environment such as Vercel, Netlify, or a custom server.
