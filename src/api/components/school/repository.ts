import { getManager } from 'typeorm';

import { AbsRepository } from '../helper';

import { School } from './model';

export class SchoolRepository extends AbsRepository<School> {
	constructor() {
		super('school', getManager().getRepository(School), ['schoolRole']);
	}
}
