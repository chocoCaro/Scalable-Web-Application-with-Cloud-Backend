import AWS from 'aws-sdk';
import dotenv from 'dotenv';

// Load .env file for local development
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

// Check if the code is running on EC2 or locally
if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
  // Use credentials from .env (local development)
  AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });
} else {
  // If running on EC2, use the IAM role (no need for accessKeyId and secretAccessKey)
  AWS.config.update({
    region: process.env.AWS_REGION || 'ap-southeast-1',
  });
}

// Initialize DynamoDB client
const db = new AWS.DynamoDB.DocumentClient();
const Table = 'cloud-intro-proj1';

export {
  db,
  Table,
};

