import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 5000
  const app = await NestFactory.create(AppModule);

  app.enableCors({credentials: true, origin: "http://95.163.223.141:3000/"});

  await app.listen(PORT, () => console.log(`server start on ${PORT} port`));
}
bootstrap();
