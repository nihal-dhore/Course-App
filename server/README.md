```markdown
# Course App Backend

This repository contains the backend code for the Course App project. The Course App is a web application designed to manage courses, users, and authentication.

## Technologies Used

- Node.js
- npm (Node Package Manager)
- Express.js
- Prisma (Database ORM)
- JWT (JSON Web Tokens for authentication)
- Cloudinary (Cloud-based image and video management)
- Resend Mail Service (For sending verification)

## Installation

1. Clone this repository to your local machine:

```bash
git clone <repository_url>
```

2. Navigate into the project directory:

```bash
cd server
```

3. Install dependencies using npm:

```bash
npm install
```

4. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the necessary environment variables such as database connection URI, Cloudinary API keys, JWT secret, also add resend account email Id for demo mail etc.

5. Run the application:

```bash
node index.js
```
