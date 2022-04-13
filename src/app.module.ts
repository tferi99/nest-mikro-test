import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrmModule } from './core/orm/orm.module';
import { InitService } from './init/init.service';
import { PersonController } from './person/person.controller';

@Module({
  imports: [OrmModule],
  controllers: [AppController, PersonController],
  providers: [AppService, InitService],
})
export class AppModule {}
