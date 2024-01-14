# Lattice NodeJS Assignment

We have a platform where psychiatrists can register their patients through a mobile/ web portal. Each psychiatrist belongs to a hospital

## Libraries/Frameworks Used


- **Server:** Node JS, Express JS
- **Database:** MySQL
- **Bcrypt:** Library for hashing passwords
- **Multer:** Middleware for handling multipart/form-data
- **Cors:** Middleware for enabling Cross-Origin Resource Sharing (CORS) in Express apps.
- **Dotenv:** Loads environment variables from a .env file into process.env.
- **AWS SDK Client S3:** Official JavaScript SDK for Amazon S3.
- **AWS SDK S3 Request Presigner:** Library for generating pre-signed URLs for S3 operations.
- **Nodemon:** Utility that monitors for changes in your source code and automatically restarts your server.


## Run Locally

### Clone the project

```bash
git clone https://github.com/RKR0/LatticeNodejs-Assignment.git
```

### Go to the project directory

```bash
cd Lattice_NodeJs
```

### Install dependencies

```bash
npm install
```


### Configure Environment Variables:
- Rename the .env.dummy file to .env:
```bash
mv .env.dummy .env
```
```dotenv
PORT=5000
...
```

### Start the server
```bash
npm start

```

## Postman Collection
- [Postman Collection Link](https://www.postman.com/cryosat-operator-44901243/workspace/lattice-java/collection/28290235-49b22785-1841-48cb-a38a-3ae1d752aa24?action=share&creator=28290235)
