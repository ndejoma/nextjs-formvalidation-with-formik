import NextHead from 'next/head';

export default function TermsOfService() {
	return (
		<>
			<NextHead>
				<title>Terms of Service</title>
			</NextHead>
			<main className='py-12 max-w-screen-xl mx-auto px-6'>
				<h1 className='font-bold text-3xl md:text-4xl text-center tracking-tight'>
					Terms of Service
				</h1>
			</main>
		</>
	);
}
