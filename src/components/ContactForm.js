import { useRef, useEffect, useState } from 'react';
import Spinner from '@/components/icons/Spinner';
import NextLink from '@/components/NextLink';
import cn from 'classnames';

export default function ContactForm() {
	//the ref for the first name input
	const nameInputRef = useRef(null);

	//form states
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [isValidForm, setIsValidForm] = useState(false);

	//focus the name input when the page loads
	useEffect(() => {
		nameInputRef?.current?.focus();
	}, []);

	//function to handle form submission
	function handleFormSubmit(e) {
		e.preventDefault();
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
				Required fields are labelled with{' '}
				<strong>&quot;required&quot;</strong>
			</p>
			<div>
				<label htmlFor='name'>
					<span className='text-base tracking-tight font-medium'>
						Full name <strong>(required)</strong>
					</span>
					<input
						ref={nameInputRef}
						className={cn(
							'block mt-2 w-full font-medium rounded-md py-2.5 placeholder:text-gray-500 focus:border-primary focus-visible:border-primary'
						)}
						type='text'
						name='name'
						id='name'
						placeholder='John Doe'
					/>
				</label>
			</div>
			<div className='mt-5'>
				<label htmlFor='email'>
					<span className='text-base tracking-tight font-medium'>
						Email <strong>(required)</strong>
					</span>
					<input
						className={cn(
							'block mt-2 w-full font-medium rounded-md py-2.5 placeholder:text-gray-500 focus:border-primary focus-visible:border-primary'
						)}
						type='email'
						name='email'
						id='email'
						placeholder='johndoe@gmail.com'
					/>
				</label>
			</div>
			<div className='mt-5'>
				<label htmlFor='subject'>
					<span className='text-base tracking-tight font-medium'>
						Subject <strong>(required)</strong>
					</span>
					<input
						className={cn(
							'block mt-2 w-full font-medium rounded-md py-2.5 placeholder:text-gray-500 focus:border-primary focus-visible:border-primary'
						)}
						type='text'
						name='subject'
						id='subject'
						placeholder='Web development service'
					/>
				</label>
			</div>
			<div className='mt-5'>
				<label htmlFor='message'>
					<span className='text-base tracking-tight font-medium'>
						Message <strong>(required)</strong>
					</span>
					<textarea
						className={cn(
							'block mt-2 w-full font-medium rounded-md py-2.5 placeholder:text-gray-500 focus:border-primary focus-visible:border-primary'
						)}
						type='text'
						name='message'
						id='message'
						rows={4}
						placeholder='Enter your message'
					/>
				</label>
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
			<div className='mt-6'>
				<button
					form='contact-form'
					disabled={isSubmitting || !isValidForm}
					onClick={handleFormSubmit}
					className='w-full inline-flex justify-center items-center gap-3 bg-primary text-white py-4 font-bold rounded-md disabled:bg-primary/50 disabled:cursor-not-allowed'
					type='submit'
				>
					{isSubmitting ? <>
						<Spinner/> <span>Sending</span> 
					</> : <>Send message</>}	
				</button>
			</div>
		</form>
	);
}
