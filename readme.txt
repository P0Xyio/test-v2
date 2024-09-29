### STARTING THE BACKEND
    - Navigate to the `backend` directory
    - Open a terminal inside the `backend` directory.

    To run in Docker:
    - Use the following command to start the backend in Docker:

    docker-compose up --build

    Note: The application may fail to connect to the database immediately after the first build. 
    If this happens, it should automatically attempt to reconnect after a few seconds.
    It will print out "Nest application successfully started" when it's ready.

    To run locally (without Docker):
    - Copy `.env.example` and rename it to `.env`.
    - Set your database connection details in the `.env` file.
    - Run the following commands:
    
    npm install
    npm run build
    npm run start:prod

    backend should be accessible on `http://localhost:3000`

    Available endpoints:
    POST /user/login
    POST /user/register
    GET /user

### STARTING THE FRONTEND
    - Navigate to the `frontend` directory.
    - Open a terminal inside the `frontend` directory.
    - Run the following commands:

    npm install
    npm run build
    npm run preview

    website should be accessible on `http://localhost:4173/`
