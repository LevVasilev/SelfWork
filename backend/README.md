# Freelance

## Setup

### Database: PostgreSQL

docker exec -it <container-name> psql -U <username> -d <database-name>

<details>
   <summary>Use Docker to create a PostgreSQL container:</summary>

   ```bash
   docker run --name <container-name> -p 5432:5432 -e POSTGRES_PASSWORD=<password> -e POSTGRES_DB=<database-name> -e POSTGRES_USER=<username> -d postgres
   ```
Make sure to replace `<container-name>`, `<password>`, `<database-name>`, and `<username>` with your desired values.
- For testing purposes, you can use this command:
  ```bash
  docker run --name Freelance -p 5432:5432 -e POSTGRES_PASSWORD=root -e POSTGRES_DB=freelance -e POSTGRES_USER=postgres -d postgres
  ```
</details>

<details>
   <summary>Configure Spring Boot to Connect to the Database:</summary>

Create a `src/main/resources/env.properties` file with the following content:
   ```properties
   POSTGRES_USER=<username>
   POSTGRES_PASSWORD=<password>
   POSTGRES_DB=<database-name>
   ```
Replace `<username>`, `<password>`, and `<database-name>` with the values you used when creating the PostgreSQL container.
</details>

### Docker Compose

Docker Compose is used to manage multi-container Docker applications. The `docker-compose.yml` file contains the configuration for the PostgreSQL and application services.

<details>
   <summary>Build and run the Docker containers:</summary>

   ```bash
   docker-compose up --build
   ```
This command will build the Docker images and start the containers.

</details>

<details>
   <summary>Stop and remove the Docker containers:</summary>

   ```bash
   docker-compose down
   ```
This command will stop and remove the Docker containers.

   <summary>Note:</summary>

The `src/main/resources/env.properties` file contains environment variables for database configuration. Make sure to update this file with your desired values.
</details>
