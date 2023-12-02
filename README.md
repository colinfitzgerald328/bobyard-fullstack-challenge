### Bobyard Full Stack Challenge - Colin FitzGerald

### Setting up the Backend

The Backend was built with PostgreSQL along with CockroachDB, SQLAlchemy, and Flask.

**Python Environment**

The project was developed using Python 3.11.6.

**CockroachDB Certificate**

A CockroachDB certificate is required for SSL verification when connecting to the database. You can execute the following command to obtain the certificate:

`curl --create-dirs -o $HOME/.postgresql/root.crt 'https://cockroachlabs.cloud/clusters/11ff4534-2e25-454c-84dd-34546f9a248b/cert'`

Once the certificate is installed, navigate to the backend directory:

`cd challenge-backend`

**Backend Dependencies**

Install the necessary dependencies by executing:

`pip install -r requirements.txt`

If you encounter any challenges during this process, feel free to reach out to me! Additional information is also available at [https://github.com/cockroachdb/sqlalchemy-cockroachdb](https://github.com/cockroachdb/sqlalchemy-cockroachdb).

After setting up the dependencies, initiate the backend server:

`python main.py`

The server should be accessible at [http://127.0.0.1:8080](http://127.0.0.1:8080/).

### Running the Frontend

#### `npm install`

Install the required frontend dependencies with the following command:

`npm install`

#### `npm start`

Launch the application in development mode:

`npm start`

Access the application in your browser at [http://localhost:3000](http://localhost:3000/).

If you need any further clarification or assistance, don't hesitate to reach out!
