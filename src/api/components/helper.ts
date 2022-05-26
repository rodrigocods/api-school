import { Router } from 'express';
import { Repository, FindManyOptions, FindOneOptions } from 'typeorm';

export interface IComponentRoutes<T> {
	readonly name: string;
	readonly controller: T;
	readonly router: Router;

	initRoutes(): void;
	initChildRoutes?(): void;
}
