Here's the updated section of your README file that includes the Docker Compose setup:

---

## Docker Compose Setup

This project includes a Docker Compose setup that allows you to run the entire stack—frontend, backend, and MongoDB—using Docker containers.

### Docker Compose Configuration

The `docker-compose.yml` file is configured as follows:

```yaml
version: '3'
services:
  front:
    build: 
      context: './frontend'
      dockerfile: 'Dockerfile'
    ports:
      - "5173:5173"
    container_name: 'front'
    environment:
      - WATCHPACK_POLLING=true
    networks:
      - mern-stack-network
    volumes:
      - ./frontend:/app
    depends_on:
      - backend  

  backend:   
    build: 
      context: './backend'
      dockerfile: 'Dockerfile' 
    ports:  
      - "6001:6001"
    container_name: 'express-container'  
    networks:
      - mern-stack-network
    volumes:
      - ./backend:/app
    depends_on:
      - mongo
    restart: always

  mongo:  
    image: mongo
    ports:
      - "27017:27017"
    container_name: 'mongo'
    networks:
      - mern-stack-network
    volumes:
      - mongoData:/data/db
    environment:
      MONGO_INITDB_ROOT_USERNAME: vanshjain
      MONGO_INITDB_ROOT_PASSWORD: vansh%402002
      MONGO_INIT_DATABASE: coursebundler

networks:
  mern-stack-network:

volumes:
  mongoData:
```

### Services

- **Front (React.js)**
  - **Build Context:** `./frontend`
  - **Dockerfile:** `Dockerfile` (located in the `frontend` directory)
  - **Ports:** `5173:5173` (local:container)
  - **Volumes:** Maps the `./frontend` directory to `/app` inside the container.
  - **Environment Variables:** `WATCHPACK_POLLING=true` to ensure proper file watching in Docker.
  - **Depends on:** The `backend` service.

- **Backend (Node.js + Express)**
  - **Build Context:** `./backend`
  - **Dockerfile:** `Dockerfile` (located in the `backend` directory)
  - **Ports:** `60001:6001` (local:container)
  - **Volumes:** Maps the `./backend` directory to `/app` inside the container.
  - **Depends on:** The `mongo` service.
  - **Restart Policy:** Always restart the container if it crashes.

- **MongoDB**
  - **Image:** Uses the official `mongo` image.
  - **Ports:** `27017:27017` (local:container)
  - **Volumes:** Stores MongoDB data in the `mongoData` volume to persist data between container restarts.
  - **Environment Variables:** Initializes MongoDB with a root username, password, and database.

### Networks and Volumes

- **Network:** All services are connected through the `mern-stack-network` Docker network to allow communication between the frontend, backend, and database containers.
- **Volumes:** The `mongoData` volume is used to persist MongoDB data.

### How to Run the Application

1. Ensure Docker and Docker Compose are installed on your machine.
2. Navigate to the project directory containing the `docker-compose.yml` file.
3. Run the following command to build and start the services:
   ```bash
   docker-compose up --build
   ```
4. The application will be accessible at:
   - **Frontend:** [http://localhost:5173](http://localhost:5173)
   - **Backend API:** [http://localhost:6001](http://localhost:6001)

### Stopping the Application

To stop the running containers, use:
```bash
docker-compose down
```

### Additional Notes

- **Volume Persistence:** MongoDB data is persisted in the `mongoData` volume. This ensures that your data is not lost even if the container is stopped or removed.
- **Environment Variables:** Make sure to replace the MongoDB username, password, and database name with your own secure credentials.

This Docker setup simplifies the process of getting the application up and running without needing to manually install and configure each component on your local machine.
