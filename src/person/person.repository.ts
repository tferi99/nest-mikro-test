import { Person } from './model/person.entity';
import { CrudEntityRepository } from '../core/orm/service/crud-entity-repository';

export class PersonRepository extends CrudEntityRepository<Person> {}
