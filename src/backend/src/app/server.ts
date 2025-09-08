import http from 'http';
import { loadEnv } from '../config/env';
import { createApp } from './setupApp';

async function main() {
  const env = loadEnv();
  const app = createApp(env);

  const server = http.createServer(app);
  server.listen(env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`API listening on http://localhost:${env.PORT}`);
  });
}

main().catch((error) => {
  // eslint-disable-next-line no-console
  console.error('Fatal startup error:', error);
  process.exit(1);
});
