import { useState } from 'react';
import  { useLogin } from '../hooks/useLogin'
import Swal from 'sweetalert2'

const Login= () =>{
	const [email, setEmail ] = useState('');
	const [password, setPassword] = useState('');
	const {login, error, isLoading } = useLogin();
	const handleSubmit = async (e) =>{
		e.preventDefault();
		await login(email, password);
		if(!login){
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
		}else{
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
			title: `${username} Log in  `
		})
		}
	}

	return(
		<form className='login' onSubmit={handleSubmit}>
			<h3>Log in</h3>
			<label>Email :</label>
			<input type="email" onChange={(e) => setEmail(e.target.value)} value={email}/>
			<label>Password :</label>
			<input type="password" onChange={(e) => setPassword(e.target.value)} value={password}/>
			<button disabled={isLoading}> Login </button>
			{ error && <div className='error'>{error}</div>}
		</form>
	)
}

export default Login;