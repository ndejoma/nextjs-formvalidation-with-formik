import { createContext, useContext } from 'react';
import { useFormik } from 'formik';
import isValidEmail from '@/lib/isValidEmail';
import useSessionStorage from '@/hooks/useSessionStorage';

const ContactFormikContext = createContext(null);
//THe display name for React Dev tools
ContactFormikContext.displayName = 'ContactFormikProvider';
const SaveFormToSessionContext = createContext(null);
SaveFormToSessionContext.displayName = 'SaveFormToSessionContext';

//the initial values for the form
export const initialContactFormValues = {
	name: '',
	email: '',
	subject: '',
	message: '',
	acceptTerms: false,
};
//function to validate the form values
function validateContactFormValues(values = initialContactFormValues) {
	const errors = {};
	//validate the name input value
	const name = values?.name?.trim();
	if (!name) {
		errors.name = 'Please enter your name';
	} else if (name?.split(' ')?.length < 2 || name?.split(' ').length > 3) {
		errors.name = 'Please enter atleast 2 names and max 3';
	}
	//validate the email
	const email = values?.email.trim();
	if (!email) {
		errors.email = 'Please enter your email';
	} else if (!isValidEmail(email)) {
		errors.email = 'Please enter a valid email';
	}
	//validate the subject
	const subject = values?.subject.trim();
	if (!subject) {
		errors.subject = 'Please enter your email subject';
	}
	//validate the message
	const message = values?.message;
	if (!message) {
		errors.message = 'Please enter your message';
	}
	//validate the checkbox for acceptTerms
	if (!values?.acceptTerms) {
		errors.acceptTerms = 'Please accept our terms and privacy policy';
	}
	return errors;
}

export default function ContactFormProvider({ children }) {
	const [contactFormValues, setContactFormValues] = useSessionStorage(
		'contactFormValues',
		initialContactFormValues
	);
	//the formik object
	const formik = useFormik({
		initialValues: contactFormValues,
		validate: validateContactFormValues,
		// validateOnMount: true
	});

	return (
		<ContactFormikContext.Provider value={formik}>
			<SaveFormToSessionContext.Provider value={setContactFormValues}>
				{children}
			</SaveFormToSessionContext.Provider>
		</ContactFormikContext.Provider>
	);
}

/**
 *
 * @returns ContactFormikContext value
 * This function consumes the context of formik value from the ContactFormikConext
 * You can only call this function inside a function component which is a child of
 * the ContactFormikProvider
 */
export const useContactFormik = () => useContext(ContactFormikContext);
export const useSaveContactFormToSessionStorage = () =>
	useContext(SaveFormToSessionContext);
