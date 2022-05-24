import { AppDataSource } from '../../../../database/data-source';

import { AbsRepository } from '../helper';

import { School } from './model';

export class SchoolRepository extends AbsRepository<School> {
	constructor() {
		super('school', AppDataSource.manager.getRepository(School));
	}
}
