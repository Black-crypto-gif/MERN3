import { useState } from 'react';
import { useSignup } from '../hooks/useSignup';
import Swal from 'sweetalert2';

const Signup = () =>{
	const [email, setEmail ] = useState('');
	const [password, setPassword] = useState('');
	const {signup, error, isLoading } = useSignup()

	const handleSubmit = async (e) =>{
		e.preventDefault();
		await signup(email, password);
		if(!signup.ok){
			const Toast = Swal.mixin({
				toast: true,
				position: 'top-end',
				showConfirmButton: false,
				timer: 3000,
				timerProgressBar: true,
				didOpen: (toast) => {
				toast.addEventListener('mouseenter', Swal.stopTimer)
				toast.addEventListener('mouseleave', Swal.resumeTimer)
				}
			})
			
			Toast.fire({
				icon: 'error',
				title: `${error}`
			})
		}
			var str= email;
			var nameMatch = str.match(/^([^@]*)@/);
			var username = nameMatch ? nameMatch[1] : null;
			const Toast = Swal.mixin({
				toast: true,
				position: 'top-end',
				showConfirmButton: false,
				timer: 3000,
				timerProgressBar: true,
				didOpen: (toast) => {
				toast.addEventListener('mouseenter', Swal.stopTimer)
				toast.addEventListener('mouseleave', Swal.resumeTimer)
				}
			})
			
			Toast.fire({
				icon: 'success',
				title: `${username} Sign up to the data base `
			})
	}
 
	return(
		<form className='signup' onSubmit={handleSubmit}>
			<h3>Sign up</h3>
			<label>Email :</label>
			<input type="email" onChange={(e) => setEmail(e.target.value)} value={email}/>
			<label>Password :</label>
			<input type="password" onChange={(e) => setPassword(e.target.value)} value={password}/>
			<button disabled={isLoading}> Sign up</button>
			{ error && <div className='error'>{error}</div>}
		</form>
	)
}

export default Signup;