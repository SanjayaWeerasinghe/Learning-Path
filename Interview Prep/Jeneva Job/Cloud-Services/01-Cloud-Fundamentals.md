# Cloud Services (Azure, AWS, GCP) - Interview Questions & Answers

## Table of Contents
1. [Cloud Computing Basics](#cloud-computing-basics)
2. [Microsoft Azure](#microsoft-azure)
3. [Amazon Web Services (AWS)](#amazon-web-services)
4. [Google Cloud Platform (GCP)](#google-cloud-platform)
5. [Common Cloud Services](#common-cloud-services)
6. [DevOps and CI/CD](#devops-and-cicd)

---

## Cloud Computing Basics

### Question
**What is cloud computing and what are its benefits?**

### Answer

Cloud computing is the delivery of computing services (servers, storage, databases, networking, software) over the internet.

**Service Models:**
- **IaaS (Infrastructure as a Service)**: Virtual machines, storage, networking
- **PaaS (Platform as a Service)**: Application hosting, databases
- **SaaS (Software as a Service)**: Complete applications (Gmail, Office 365)

**Deployment Models:**
- **Public Cloud**: Shared infrastructure (Azure, AWS, GCP)
- **Private Cloud**: Dedicated infrastructure
- **Hybrid Cloud**: Mix of public and private

**Benefits:**
- **Cost-effective**: Pay-as-you-go, no upfront costs
- **Scalable**: Scale up/down based on demand
- **Reliable**: High availability and disaster recovery
- **Fast**: Quick deployment and global reach
- **Secure**: Enterprise-grade security

---

## Microsoft Azure

### Question
**What are the key Azure services?**

### Answer

**Compute Services:**

**1. Azure App Service (Web Apps):**
```bash
# Deploy Node.js web app
az webapp create \
  --resource-group myResourceGroup \
  --plan myAppServicePlan \
  --name myApp \
  --runtime "NODE|18-lts"

# Deploy code
az webapp deployment source config \
  --name myApp \
  --resource-group myResourceGroup \
  --repo-url https://github.com/user/repo \
  --branch main
```

**2. Azure Functions (Serverless):**
```javascript
// JavaScript Azure Function
module.exports = async function (context, req) {
    context.log('HTTP trigger function processed a request');

    const name = req.query.name || (req.body && req.body.name);

    if (name) {
        context.res = {
            status: 200,
            body: `Hello, ${name}!`
        };
    } else {
        context.res = {
            status: 400,
            body: "Please pass a name"
        };
    }
};
```

**3. Azure Container Instances:**
```bash
# Run container
az container create \
  --resource-group myResourceGroup \
  --name mycontainer \
  --image myregistry.azurecr.io/myapp:latest \
  --cpu 1 \
  --memory 1 \
  --ports 80
```

**Storage Services:**

**Azure Blob Storage (Object Storage):**
```javascript
const { BlobServiceClient } = require('@azure/storage-blob');

// Connect to storage
const blobServiceClient = BlobServiceClient.fromConnectionString(
  process.env.AZURE_STORAGE_CONNECTION_STRING
);

// Upload file
async function uploadFile(containerName, fileName, fileContent) {
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(fileName);

  await blockBlobClient.upload(fileContent, fileContent.length);
  console.log('File uploaded successfully');
}

// Download file
async function downloadFile(containerName, fileName) {
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blobClient = containerClient.getBlobClient(fileName);

  const downloadResponse = await blobClient.download();
  const downloaded = await streamToBuffer(downloadResponse.readableStreamBody);

  return downloaded;
}
```

**Database Services:**

**Azure SQL Database:**
```javascript
const sql = require('mssql');

const config = {
  server: 'myserver.database.windows.net',
  database: 'mydb',
  user: 'username',
  password: 'password',
  options: {
    encrypt: true
  }
};

async function queryDatabase() {
  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM Users WHERE age > 18`;
    console.log(result.recordset);
  } catch (err) {
    console.error(err);
  }
}
```

**Azure Cosmos DB (NoSQL):**
```javascript
const { CosmosClient } = require('@azure/cosmos');

const client = new CosmosClient({
  endpoint: process.env.COSMOS_ENDPOINT,
  key: process.env.COSMOS_KEY
});

const database = client.database('mydb');
const container = database.container('users');

// Create item
await container.items.create({
  id: '1',
  name: 'John Doe',
  email: 'john@example.com'
});

// Query items
const { resources: users } = await container.items
  .query('SELECT * FROM c WHERE c.age > 18')
  .fetchAll();
```

**Networking:**
- **Virtual Networks**: Isolated networks
- **Load Balancer**: Distribute traffic
- **Application Gateway**: Web traffic load balancer
- **Azure CDN**: Content delivery network

**Security:**
- **Azure Key Vault**: Store secrets, keys, certificates
- **Azure AD**: Identity and access management
- **Security Center**: Unified security management

---

## Amazon Web Services

### Question
**What are the key AWS services?**

### Answer

**Compute:**

**1. EC2 (Virtual Machines):**
```bash
# Launch EC2 instance
aws ec2 run-instances \
  --image-id ami-0c55b159cbfafe1f0 \
  --instance-type t2.micro \
  --key-name MyKeyPair \
  --security-groups MySecurityGroup
```

**2. Lambda (Serverless):**
```javascript
// Node.js Lambda function
exports.handler = async (event) => {
    console.log('Event:', JSON.stringify(event));

    const response = {
        statusCode: 200,
        body: JSON.stringify({ message: 'Hello from Lambda!' })
    };

    return response;
};
```

**3. ECS/EKS (Containers):**
```yaml
# ECS Task Definition
{
  "family": "my-app",
  "containerDefinitions": [
    {
      "name": "my-container",
      "image": "my-image:latest",
      "memory": 512,
      "cpu": 256,
      "essential": true,
      "portMappings": [
        {
          "containerPort": 3000,
          "protocol": "tcp"
        }
      ]
    }
  ]
}
```

**Storage:**

**S3 (Object Storage):**
```javascript
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

// Upload file
async function uploadFile(bucket, key, body) {
  const params = {
    Bucket: bucket,
    Key: key,
    Body: body
  };

  const result = await s3.upload(params).promise();
  return result.Location;
}

// Download file
async function downloadFile(bucket, key) {
  const params = {
    Bucket: bucket,
    Key: key
  };

  const data = await s3.getObject(params).promise();
  return data.Body;
}

// Generate presigned URL
function getSignedUrl(bucket, key, expiresIn = 3600) {
  const params = {
    Bucket: bucket,
    Key: key,
    Expires: expiresIn
  };

  return s3.getSignedUrl('getObject', params);
}
```

**Database:**

**RDS (Relational Database):**
```javascript
const mysql = require('mysql2/promise');

const connection = await mysql.createConnection({
  host: 'mydb.cluster-abc.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'password',
  database: 'mydb'
});

const [rows] = await connection.execute(
  'SELECT * FROM users WHERE age > ?',
  [18]
);
```

**DynamoDB (NoSQL):**
```javascript
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

// Put item
await dynamodb.put({
  TableName: 'Users',
  Item: {
    userId: '123',
    name: 'John Doe',
    email: 'john@example.com'
  }
}).promise();

// Get item
const result = await dynamodb.get({
  TableName: 'Users',
  Key: { userId: '123' }
}).promise();

// Query
const items = await dynamodb.query({
  TableName: 'Users',
  IndexName: 'EmailIndex',
  KeyConditionExpression: 'email = :email',
  ExpressionAttributeValues: {
    ':email': 'john@example.com'
  }
}).promise();
```

**Other Services:**
- **API Gateway**: RESTful APIs
- **CloudFront**: CDN
- **Route 53**: DNS
- **SNS/SQS**: Messaging
- **CloudWatch**: Monitoring

---

## Google Cloud Platform

### Question
**What are the key GCP services?**

### Answer

**Compute:**

**1. App Engine:**
```yaml
# app.yaml
runtime: nodejs18
instance_class: F1

handlers:
- url: /.*
  script: auto
```

**2. Cloud Functions:**
```javascript
exports.helloWorld = (req, res) => {
  res.send('Hello, World!');
};

exports.processMessage = (message, context) => {
  const data = Buffer.from(message.data, 'base64').toString();
  console.log(`Processing: ${data}`);
};
```

**3. Cloud Run (Containers):**
```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]
```

```bash
# Deploy to Cloud Run
gcloud run deploy my-service \
  --image gcr.io/my-project/my-image \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

**Storage:**

**Cloud Storage:**
```javascript
const { Storage } = require('@google-cloud/storage');
const storage = new Storage();

// Upload file
async function uploadFile(bucketName, filename, fileContent) {
  await storage.bucket(bucketName).file(filename).save(fileContent);
}

// Download file
async function downloadFile(bucketName, filename) {
  const [contents] = await storage.bucket(bucketName).file(filename).download();
  return contents;
}
```

**Database:**

**Cloud SQL:**
```javascript
const mysql = require('mysql2/promise');

const connection = await mysql.createConnection({
  socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
  user: 'root',
  password: 'password',
  database: 'mydb'
});
```

**Firestore (NoSQL):**
```javascript
const { Firestore } = require('@google-cloud/firestore');
const firestore = new Firestore();

// Add document
await firestore.collection('users').doc('123').set({
  name: 'John Doe',
  email: 'john@example.com',
  age: 30
});

// Get document
const doc = await firestore.collection('users').doc('123').get();
const data = doc.data();

// Query
const snapshot = await firestore.collection('users')
  .where('age', '>', 18)
  .orderBy('age', 'desc')
  .limit(10)
  .get();

snapshot.forEach(doc => {
  console.log(doc.id, doc.data());
});
```

---

## Common Cloud Services

### Question
**What are common patterns across all cloud providers?**

### Answer

**1. Authentication & Authorization:**

**Azure:**
```javascript
const { DefaultAzureCredential } = require('@azure/identity');
const credential = new DefaultAzureCredential();
```

**AWS:**
```javascript
const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
// Uses IAM roles automatically when running on AWS
```

**GCP:**
```javascript
const { GoogleAuth } = require('google-auth-library');
const auth = new GoogleAuth();
// Uses service account automatically
```

**2. Environment Variables:**
```javascript
// Configuration
const config = {
  database: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  },
  storage: {
    bucket: process.env.STORAGE_BUCKET
  },
  apiKey: process.env.API_KEY
};
```

**3. Secrets Management:**

**Azure Key Vault:**
```javascript
const { SecretClient } = require('@azure/keyvault-secrets');
const { DefaultAzureCredential } = require('@azure/identity');

const credential = new DefaultAzureCredential();
const client = new SecretClient(vaultUrl, credential);

const secret = await client.getSecret('MySecret');
console.log(secret.value);
```

**AWS Secrets Manager:**
```javascript
const AWS = require('aws-sdk');
const secretsManager = new AWS.SecretsManager();

const secret = await secretsManager.getSecretValue({
  SecretId: 'MySecret'
}).promise();

const secretValue = JSON.parse(secret.SecretString);
```

**GCP Secret Manager:**
```javascript
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
const client = new SecretManagerServiceClient();

const [version] = await client.accessSecretVersion({
  name: 'projects/my-project/secrets/my-secret/versions/latest'
});

const secret = version.payload.data.toString();
```

---

## DevOps and CI/CD

### Question
**How do you set up CI/CD in the cloud?**

### Answer

**GitHub Actions (Works with all clouds):**
```yaml
name: Deploy to Azure

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'

    - name: Install dependencies
      run: npm ci

    - name: Run tests
      run: npm test

    - name: Build
      run: npm run build

    - name: Deploy to Azure
      uses: azure/webapps-deploy@v2
      with:
        app-name: my-app
        publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE }}
        package: ./dist
```

**Azure DevOps Pipeline:**
```yaml
trigger:
- main

pool:
  vmImage: 'ubuntu-latest'

steps:
- task: NodeTool@0
  inputs:
    versionSpec: '18.x'

- script: |
    npm install
    npm run build
    npm test
  displayName: 'Build and Test'

- task: AzureWebApp@1
  inputs:
    azureSubscription: 'MyAzureSubscription'
    appName: 'my-app'
    package: '$(System.DefaultWorkingDirectory)/dist'
```

**AWS CodePipeline:**
```yaml
version: 0.2

phases:
  install:
    runtime-versions:
      nodejs: 18
    commands:
      - npm install

  build:
    commands:
      - npm run build
      - npm test

  post_build:
    commands:
      - aws s3 sync dist/ s3://my-bucket/

artifacts:
  files:
    - '**/*'
  base-directory: dist
```

---

## Key Takeaways for Jeneva Interview

### Cloud Priorities:
1. **Compute**: VMs, serverless functions, containers
2. **Storage**: Object storage (S3/Blob/Cloud Storage)
3. **Databases**: SQL and NoSQL options
4. **Deployment**: CI/CD pipelines
5. **Security**: IAM, secrets management

### Common Questions:
- What is cloud computing?
- Difference between IaaS, PaaS, SaaS?
- Experience with Azure/AWS/GCP?
- How do you deploy applications?
- How do you handle secrets?
- Explain CI/CD pipeline

### Demonstrate:
- Experience with at least one cloud provider
- Understanding of cloud architecture
- Knowledge of deployment strategies
- Security best practices
- Cost optimization awareness

### For Jeneva Specifically:
- They work with **Azure, AWS, and Google Cloud**
- Be familiar with **deployment workflows**
- Understand **containerization** (Docker)
- Know **CI/CD pipelines**
- Experience with **cloud databases**
