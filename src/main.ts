import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = 4000;
  await app.listen(port, () => {
    console.log(`App is listening to port ${port}`);
  });
}
bootstrap();
