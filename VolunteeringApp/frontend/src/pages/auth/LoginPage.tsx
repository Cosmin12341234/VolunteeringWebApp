import {useState} from 'react';
import '../../styles/Login.css';
import {AuthService} from '../../apis/auth/AuthService';
import {LoginRequest} from '../../utils/types';
import {toast} from "../../components/ui/use-toast";
import {useNavigate} from "react-router-dom";
import {UserService} from "@/apis/user/UserService.tsx";

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
    const [loginMessage, setLoginMessage] = useState<string>('');


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({});
        setLoginMessage('');

        if (validateForm()) {
            const data: LoginRequest = {username, password};
            const {status, message} = await AuthService.login(data);

            toast({
                title: status === 200 ? "Success" : "Error",
                variant: status === 200 ? "default" : "destructive",
                description: message,
            });

            if (status === 200) {
                const response = await UserService.getCurrentUser()
                if (response.type === 'ADMIN')
                    navigate('/admin');
                else
                    navigate('/events');
                setLoginMessage('Login successful!');
                console.log('User Data:', message); // You can log or handle response data if needed
            } else {
                setLoginMessage(message);
            }
        }
    };

    const validateForm = () => {
        const newErrors: { username?: string; password?: string } = {};

        if (!username) {
            newErrors.username = 'Username is required';
        }
        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    {errors.username && <span className="error">{errors.username}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {errors.password && <span className="error">{errors.password}</span>}
                </div>
                <button type="submit">Login</button>
            </form>
            {loginMessage && <p className="login-message">{loginMessage}</p>}
            <p>
                If you don't have an account, <a href="/Signup" className="signup-link">sign up</a> now!
            </p>
        </div>
    );
};

export default Login;
