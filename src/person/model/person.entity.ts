import { assign, Entity, EntityData, Property } from '@mikro-orm/core';
import { OrmIntTimestampEntity } from '../../core/orm/entity';
import { PersonRepository } from '../person.repository';

@Entity({ customRepository: () => PersonRepository })
export class Person extends OrmIntTimestampEntity {
  @Property({ length: 64 })
  name: string;

  @Property({ length: 256 })
  email: string;

  @Property()
  birth: Date;

  @Property()
  rank: number;

  @Property({ default: true })
  active: boolean;

  @Property({ length: 1024, nullable: true })
  note?: string;

  constructor(obj?: EntityData<Person>) {
    super();
    this.active = true;
    assign(this, obj);
  }
}
