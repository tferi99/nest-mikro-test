import { Injectable, Logger } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { Person } from '../person/model/person.entity';
import { PersonRepository } from '../person/person.repository';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Timeout } from '@nestjs/schedule';

/**
 * Initialization service. It started as a task during startup.
 * If initialization completed it emits event.
 */
@Injectable()
export class InitService {
  private readonly logger = new Logger(InitService.name);

  constructor(
    private em: EntityManager,
    @InjectRepository(Person)
    private personRepository: PersonRepository,
  ) {}

  @Timeout(500)
  async initApplication() {
    this.logger.log('============================ Application initialization ============================');
    this.initDbContent();
  }

  async clean() {
    this.logger.log('============================ Application clean ============================');
    //OrmUtils.dumpUnitOfWork(this.em, '>>>>>>>>>>>>>>>>>>>>> CLEAN');
    this.em.transactional(async (em) => {
      await this.personRepository.nativeDelete({});
    });
  }

  /**
   * It creates 2 default users if no user created yet.
   */
  async initDbContent() {
    await this.em.transactional(async (em) => {
      // unemployed
      const p1 = new Person({ name: 'Tim Cook', email: 'tc@test.org', birth: new Date(1957, 3, 12), rank: 1 });
      const p2 = new Person({ name: 'Mary Teresa Barra', email: 'mtb@test.org', birth: new Date(1975, 4, 24), rank: 1 });
      em.persist(p1);
      em.persist(p2);
    });
  }
}
