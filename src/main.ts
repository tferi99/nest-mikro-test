import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ENTITIES } from './core/orm/orm.module';
import { DatabaseSchemaCreator } from './core/orm/database-schema-creator';

const argv = process.argv.slice(2);

if (argv.includes('createdbschema')) {
  try {
    DatabaseSchemaCreator.create(ENTITIES, true);
  } catch (e) {
    console.log('ERROR:', e);
  }
} else {
  async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(3001);
  }

  bootstrap();
}
