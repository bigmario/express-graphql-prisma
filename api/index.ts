import { createApp } from './app';

(async () => {
  const port = process.env.PORT || 3000;
  const app = await createApp();
  app.listen(port, () => {
    console.log(`Server Running on http://localhost:${port}/graphql`);
  });
})();
