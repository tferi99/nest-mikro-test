import { Module } from '@nestjs/common';
import { logger, MikroOrmModule, MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';
import { Person } from '../../person/model/person.entity';
import { AnyEntity, EntityName, UnderscoreNamingStrategy } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { OrmBaseEntity, OrmIntEntity, OrmIntTimestampEntity, OrmTimestampEntity } from './entity';

export const ENTITIES: EntityName<AnyEntity<any>>[] = [Person];

export const BASE_ENTITIES: EntityName<AnyEntity<any>>[] = [OrmBaseEntity, OrmTimestampEntity, OrmIntEntity, OrmIntTimestampEntity];

export const MIKRO_ORM_OPTIONS: MikroOrmModuleSyncOptions = {
  entities: [...BASE_ENTITIES, ...ENTITIES],
  type: 'postgresql',
  dbName: 'nestmikrotest',
  namingStrategy: UnderscoreNamingStrategy,
  highlighter: new SqlHighlighter(),
  debug: true,
  logger: logger.log.bind(logger),
};

@Module({
  imports: [MikroOrmModule.forRoot(MIKRO_ORM_OPTIONS), MikroOrmModule.forFeature({ entities: [...ENTITIES] })],
  exports: [MikroOrmModule],
})
export class OrmModule {}
