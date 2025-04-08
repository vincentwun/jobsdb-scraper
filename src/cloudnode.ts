import { CloudNode } from '@ulixee/cloud';
import NoSandboxPlugin from './NoSandboxPlugin';

async function startCloudNode() {
  const cloudNode = new CloudNode();
  cloudNode.heroCore.use(NoSandboxPlugin);

  try {
    await cloudNode.listen();
    console.log(await cloudNode.port);
  } catch (error) {
    console.error('ERROR starting Ulixee CloudNode', error);
    process.exit(1);
  }

  // Graceful shutdown handler
  const shutdown = async () => {
    try {
      await cloudNode.close();
      console.log('CloudNode shut down gracefully...');
      process.exit(0);
    } catch (err) {
      console.error('Error during CloudNode shutdown', err);
      process.exit(1);
    }
  };
  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

startCloudNode();
