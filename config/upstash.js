import { Client } from '@upstash/workflow';
import { QSTASH_TOKEN, QSTASH_URL } from './env.js';

export const workflowClient = new Client({
  url: QSTASH_URL,     // Use 'url', not 'baseUrl'
  token: QSTASH_TOKEN, // Your QStash token
});
