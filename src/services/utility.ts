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

	/**
	 * Verify if the string has only numbers
	 * 
	 * @param text String to verify
	 * @returns Result of validation
	 */
	 public static isJustNumber(text: string): boolean {
		const regExp = /\D/g;

		// search for any other character than a decimal digit in string
		if(regExp.test(text)) {
			return false;
		}

		// is empty string?
		if(text.length === 0) {
			return false;
		}

		return true;
	}

	public static convDoisDigitos(number: string): string
	{
		return (("0"+(number)).slice(-2));
	}
}
