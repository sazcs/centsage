const LoginPage = () => {
	return (
		<div className='flex h-screen w-screen items-center justify-center bg-background'>
			<a
				href='http://localhost:5001/api/auth/google'
				className='rounded-md bg-blue-600 px-6 py-3 font-bold text-white shadow-lg transition hover:bg-blue-700'
			>
				Sign in with Google
			</a>
		</div>
	);
};
export default LoginPage;
