import { useRef, useEffect, useState } from 'react';
import Spinner from '@/components/icons/Spinner';
import NextLink from '@/components/NextLink';
import cn from 'classnames';
import {
	initialContactFormValues,
	useContactFormik,
} from '@/context/ContactFormProvider';

export default function ContactForm() {
	//consume the formik  value for this form
	const formik = useContactFormik();

	//the ref for the first name input
	const nameInputRef = useRef(null);

	//form states
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isValidForm, setIsValidForm] = useState(false);

	//focus the name input when the page loads (ie  when the component first mounts)
	useEffect(() => {
		nameInputRef?.current?.focus();
	}, []);

	//check the state if the form is valid when the components first mounts
	//You also check if the form is valid during render,but it causes a weird bug since formik?.isValid is true
	//You can prevent that by adding validateOnMount: true to your useFormik({...config, validateOnMount: true})
	//See below in states calculated from existing states
	useEffect(() => {
		setIsValidForm(Boolean(formik?.isValid && formik?.values?.name));
	}, [formik]);

	//function to handle form submission
	function handleFormSubmit(e) {
		e.preventDefault();
		//validate the form again
		formik.validateForm();

		if (isValidForm) {
			setIsSubmitting(true);
			//mimic form submission to the server runs after 3s
			//In reality you will send the form values to your backend
			//make sure to validate the form values on the server again
			window.setTimeout(() => {
				window.alert('The form was submitted successfully');
				//by now the form has been submitted
				setIsSubmitting(false);
				//reset the form
				formik.resetForm({
					values: initialContactFormValues,
					touched: {},
					errors: {},
				});
			}, 3000);
		}
	}

	return (
		<form
			action=''
			className='text-gray-700 max-w-xl mx-auto px-6 lg:px-8 py-12 rounded-lg border shadow-xl drop-shadow-sm border-gray-100 bg-white'
		>
			<h1 className='text-3xl md:text-3xl tracking-tight font-semibold text-center mb-3'>
				Contact Form
			</h1>
			<p className='text-center mb-10 font-medium'>
				Required fields are labelled with <strong>(required)</strong>
			</p>
			<div>
				<label htmlFor='name'>
					<span className='text-base tracking-tight font-medium'>
						Name <strong>(required)</strong>
					</span>
					<input
						ref={nameInputRef}
						className={cn(
							'block mt-2 w-full font-medium rounded-md py-2.5 placeholder:text-gray-500 focus:border-primary focus-visible:border-primary',
							formik?.errors?.name && formik?.touched?.name
								? 'error focus:ring-red-500 placeholder:text-red-500'
								: ''
						)}
						type='text'
						name='name'
						id='name'
						placeholder='John Doe'
						onChange={formik?.handleChange}
						onBlur={formik?.handleBlur}
						value={formik?.values?.name}
					/>
				</label>
				{formik?.errors?.name && formik?.touched?.name ? (
					<small
						aria-describedby='name input error'
						className='text-red-500 font-medium'
					>
						{formik?.errors?.name}
					</small>
				) : null}
			</div>
			<div className='mt-5'>
				<label htmlFor='email'>
					<span className='text-base tracking-tight font-medium'>
						Email <strong>(required)</strong>
					</span>
					<input
						className={cn(
							'block mt-2 w-full font-medium rounded-md py-2.5 placeholder:text-gray-500 focus:border-primary focus-visible:border-primary',
							formik?.errors?.email && formik?.touched?.email
								? 'error focus:ring-red-500 placeholder:text-red-500'
								: ''
						)}
						type='email'
						name='email'
						id='email'
						placeholder='johndoe@gmail.com'
						onChange={formik?.handleChange}
						onBlur={formik?.handleBlur}
						value={formik?.values?.email}
					/>
				</label>
				{formik?.errors?.email && formik?.touched?.email ? (
					<small
						aria-describedby='email input error'
						className='text-red-500 font-medium'
					>
						{formik?.errors?.email}
					</small>
				) : null}
			</div>
			<div className='mt-5'>
				<label htmlFor='subject'>
					<span className='text-base tracking-tight font-medium'>
						Subject <strong>(required)</strong>
					</span>
					<input
						className={cn(
							'block mt-2 w-full font-medium rounded-md py-2.5 placeholder:text-gray-500 focus:border-primary focus-visible:border-primary',
							formik?.errors?.subject && formik?.touched?.subject
								? 'error focus:ring-red-500 placeholder:text-red-500'
								: ''
						)}
						type='text'
						name='subject'
						id='subject'
						placeholder='Web development service'
						onChange={formik?.handleChange}
						onBlur={formik?.handleBlur}
						value={formik?.values?.subject}
					/>
				</label>
				{formik?.errors?.subject && formik?.touched?.subject ? (
					<small
						aria-describedby='subject input error'
						className='text-red-500 font-medium'
					>
						{formik?.errors?.subject}
					</small>
				) : null}
			</div>
			<div className='mt-5'>
				<label htmlFor='message'>
					<span className='text-base tracking-tight font-medium'>
						Message <strong>(required)</strong>
					</span>
					<textarea
						className={cn(
							'block mt-2 w-full font-medium rounded-md py-2.5 placeholder:text-gray-500 focus:border-primary focus-visible:border-primary',
							formik?.errors?.message && formik?.touched?.message
								? 'error focus:ring-red-500 placeholder:text-red-500'
								: ''
						)}
						name='message'
						id='message'
						rows={4}
						placeholder='Enter your message'
						onChange={formik?.handleChange}
						onBlur={formik?.handleBlur}
						value={formik?.values?.message}
					/>
				</label>
				{formik?.errors?.message && formik?.touched?.message ? (
					<small
						aria-describedby='message input error'
						className='text-red-500 font-medium'
					>
						{formik?.errors?.message}
					</small>
				) : null}
			</div>
			<div className='mt-5'>
				<p className='text-sm font-medium'>
					<label
						className='sr-only'
						htmlFor='acceptTerms'
					>
						Accept our Terms of service and Privacy policy
					</label>
					<input
						className='rounded checked:bg-primary mr-1.5 checked:focus:bg-primary checked:hover:bg-primary/90 checked:focus:outline-primary focus:outline-primary'
						type='checkbox'
						name='acceptTerms'
						id='acceptTerms'
						onChange={formik?.handleChange}
						checked={formik?.values?.acceptTerms}
					/>
					<span>
						By sending this email, I agree I have read and accepted
						your{' '}
						<NextLink
							href='/tos'
							className='text-blue-800 underline hover:no-underline'
						>
							Terms of Service
						</NextLink>{' '}
						and{' '}
						<NextLink
							href='/privacy-policy'
							className='text-blue-800 underline hover:no-underline'
						>
							Privacy Policy.
						</NextLink>
					</span>
				</p>
			</div>
			<div className='mt-5'>
				<button
					form='contact-form'
					disabled={isSubmitting || !isValidForm}
					onClick={handleFormSubmit}
					className='w-full inline-flex justify-center items-center gap-3 bg-primary hover:bg-primary/90 text-white py-4 font-bold rounded-md drop-shadow disabled:bg-primary/50 disabled:cursor-not-allowed'
					type='submit'
				>
					{isSubmitting ? (
						<>
							<Spinner /> <span>Sending</span>
						</>
					) : (
						<>Send message</>
					)}
				</button>
				{formik?.errors?.acceptTerms ? (
					<small
						aria-describedby='message input error'
						className='text-red-500 font-medium'
					>
						{formik?.errors?.acceptTerms}
					</small>
				) : null}
			</div>
		</form>
	);
}
