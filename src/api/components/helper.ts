import { Router } from 'express';
import { Repository, FindManyOptions, FindOneOptions } from 'typeorm';

export interface IComponentRoutes<T> {
	readonly name: string;
	readonly controller: T;
	readonly router: Router;

	initRoutes(): void;
	initChildRoutes?(): void;
}

export abstract class AbsRepository<T> {
	protected readonly name: string;
	protected readonly repo: Repository<T>;
	protected readonly defaultRelations: string[];

	constructor(name: string, repo: Repository<T>, defaultRelations: string[] = []) {
		this.name = name;
		this.repo = repo;
		this.defaultRelations = defaultRelations;
	}

	/**
	 * Read all entities from db
	 *
	 * @param options Find options
	 * @param cached Use cache
	 * @returns Entity array
	 */
	readAll(options: FindManyOptions<T> = {}, cached?: boolean): Promise<T[]> {
		try {
			if (Object.keys(options).length) {
				return this.repo.find({
					relations: this.defaultRelations,
					...options
				});
			}

			return this.repo.find({
				relations: this.defaultRelations
			});
		} catch (err) {
			throw new Error(err);
		}
	}

	/**
	 * Read a certain entity from db
	 *
	 * @param options Find options
	 * @returns Entity
	 */
	read(options: FindOneOptions<T>): Promise<T | undefined> {
		try {
			return this.repo.findOne({
				relations: this.defaultRelations,
				...options
			});
		} catch (err) {
			throw new Error(err);
		}
	}

	/**
	 * Save new or updated entity to db
	 *
	 * @param entity Entity to save
	 * @returns Saved entity
	 */
	async save(entity: T): Promise<T> {
		try {
			const saved: T = await this.repo.save(entity);

			return saved;
		} catch (err) {
			throw new Error(err);
		}
	}

	/**
	 * Delete entity from db
	 *
	 * @param entity Entity to delete
	 * @returns Deleted entity
	 */
	async delete(entity: T): Promise<T> {
		try {
			const deleted = await this.repo.remove(entity);

			return deleted;
		} catch (err) {
			throw new Error(err);
		}
	}
}
