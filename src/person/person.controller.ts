import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { Person } from './model/person.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { PersonRepository } from './person.repository';
import { OrmCrudControllerBase } from 'src/core/orm/controller/orm-crud-controller.base';

@Controller('person')
/*@EnabledFeatures({
  get: true,
  getAll: true,
  insert: true,
  update: false,
  nativeUpdate: true,
  delete: true,
  nativeDelete: true,
  nativeDeleteAll: true,
})*/
export class PersonController extends OrmCrudControllerBase<Person> {
  constructor(@InjectRepository(Person) private personRepository: PersonRepository) {
    super({ repository: personRepository, defaultGetAllOptions: { orderBy: { name: 'ASC' } } });
  }

  /**
   * Inserting for a parent already supported by {@link CrudEntityRepository}
   * if you specify parents in {@link CrudEntityRepository.config()}
   *
   * @param data
   * @param companyId
   */
  @Post('company/:companyId')
  async insertForCompany(@Body() data: Person): Promise<Person> {
    const obj = await this._repo.crud.insert(data);
    await this._repo.flush();
    return obj;
  }
}
