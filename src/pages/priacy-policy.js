import NextHead from 'next/head';

export default function PrivacyPolicy() {
	return (
		<>
			<NextHead>
				<title>Privacy Policy</title>
			</NextHead>
			<main className='py-12 max-w-screen-xl mx-auto px-6'>
				<h1 className='font-bold text-3xl md:text-4xl text-center tracking-tight'>
					Privacy Policy
				</h1>
			</main>
		</>
	);
}
