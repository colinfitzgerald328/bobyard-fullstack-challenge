### Bobyard Full Stack Challenge - Colin FitzGerald



### Setting up the backend 

The Backend was written using PostgreSQL with CockroachDB, SQLAlchemy and Flask.

**Python Environment**

The local python environment I used to develop the project was 3.11.6. 

**CockroachDB Certificate**

```
curl --create-dirs -o $HOME/.postgresql/root.crt 'https://cockroachlabs.cloud/clusters/11ff4534-2e25-454c-84dd-34546f9a248b/cert'
```

This will create a certificate that CockroachDB can then use to verify security via SSL when connecting to the database. 
Once you have the certificate installed, you can navigate to the backend. 



**Navigate to the backend**

```
cd challenge-backend
```

The requirements to run the backend are in requirements.txt.

```
pip install -r requirements.txt
```

If you're running into any issues with getting this set up, let me know or there is also more information at https://github.com/cockroachdb/sqlalchemy-cockroachdb

Once you've gotten these dependencies set up, you can run the backend. 



```
python main.py 
```

This should start the server on http://127.0.0.1:8080

### Running the frontend 

### `npm install`

This will install all of the required dependencies. 
### `npm start`

This will run the app in development mode. 

Open [http://localhost:3000](http://localhost:3000/) where you can view it in your browser! 

