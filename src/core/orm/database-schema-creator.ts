import { AnyEntity, EntityName, MikroORM } from '@mikro-orm/core';
import { BASE_ENTITIES, MIKRO_ORM_OPTIONS } from './orm.module';

export class DatabaseSchemaCreator {
  static async create(entities: EntityName<AnyEntity<any>>[], exitOnError: boolean) {
    try {
      const options = MIKRO_ORM_OPTIONS;
      options.entities = [...BASE_ENTITIES, ...entities];

      const orm = await MikroORM.init(options);

      const generator = orm.getSchemaGenerator();

      const dropDump = await generator.getDropSchemaSQL();
      console.log(dropDump);

      const createDump = await generator.getCreateSchemaSQL();
      console.log(createDump);

      const updateDump = await generator.getUpdateSchemaSQL();
      console.log(updateDump);

      // there is also `generate()` method that returns drop + create queries
      const dropAndCreateDump = await generator.generate();
      console.log(dropAndCreateDump);

      // or you can run those queries directly, but be sure to check them first!
      await generator.dropSchema();
      await generator.createSchema();
      await generator.updateSchema();

      await orm.close(true);
    } catch (e) {
      console.log('');
      console.log('');
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      console.error('Error during creating DB schema', e);
      process.exit(1);
    }
  }
}
