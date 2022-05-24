import { v1 as uuidv1 } from 'uuid';

import * as crypto from 'crypto';

/**
 * UtilityService
 *
 * Service for utility functions
 */
export class UtilityService {
	/**
	 * Hash string with sha256 algorithm
	 *
	 * @param text String to hash
	 * @returns Returns hashed string
	 */
	public static hashString(text: string): string {
		return crypto.createHash('sha256').update(text).digest('hex');
	}

	/**
	 * Generate UUID
	 *
	 * @returns UUID
	 */
	public static generateUuid(): string {
		return uuidv1();
	}
}
