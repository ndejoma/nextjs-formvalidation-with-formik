import isString from '@/utils/isString';

//email regex
export const emailRegex =
	/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function isValidEmail(email = '') {
	if (isString(email)) {
		//returns true is the email is valid
		return emailRegex.test(email);
	}
	return false;
}
