# Backend Application

This is a Node.js backend application using Express and TypeScript, with a MySQL database managed through Docker Compose.

## Prerequisites

- [Node.js 20](https://nodejs.org/en/download/) (use the **Prebuilt Installer** & select **v20**)
- [Docker](https://docs.docker.com/get-docker/) (ensure Docker is running)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/ervnjmsdnts/philhealth-be.git
cd philhealth-be
```

### 2. Install Dependencies

To run the application locally, install the dependencies:

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory based on the \`.env.example\` file:

#### macOS/Linux

```bash
cp .env.example .env
```

#### Windows (Command Prompt)

```cmd
copy .env.example .env
```

#### Windows (PowerShell)

```powershell
Copy-Item .env.example .env
```

After copying, update the environment variables in the `.env` file to match your setup.

### 4. Docker Compose Setup

Docker Compose will create the following service:

- **db** - MySQL 9.1.0 database with data persistence and an internal network for secure access.

### 5. Build and Run the Database Service

To start the MySQL database with Docker Compose, run:

```bash
docker-compose up -d
```

This command will:

1. Pull the MySQL 9.1.0 image (if not already downloaded).
2. Set up the MySQL service with:
   - Port **3309** exposed on the host system and mapped to **3306** inside the container.
   - A persistent volume for database storage in `db_data`.
   - Environment variables for root password and initial database name.
3. Attach the service to an internal network named `internalnet`.

### 6. Verify the Database Connection

Once the container is running, you can access the MySQL database at:

```
Host: localhost
Port: 3309
Database: philhealth
User: root
Password: password
```

### 6. Before running the Development Server

To create the tables needed for the application, use:

```bash
npx prisma db push
```

### 8. Start the Development Server

To run the development server for the backend application, use:

```bash
npm run dev
```

This will start the application in development mode, allowing you to make changes and see updates in real-time.

### 9. Stopping the Database Service

To stop and remove the database container, network, and volume:

```bash
docker-compose down
```

This command stops and removes the `db` container, the `internalnet` network, and the `db_data` volume.
