import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import '../../styles/Signup.css';
import {AuthService} from '../../apis/auth/AuthService';
import {toast} from "../../components/ui/use-toast";
import {Gender, Type, User} from '../../utils/types';

const Signup: React.FC = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState<Omit<User, 'id' | 'events'>>({
        username: '',
        name: '',
        password: '',
        type: Type.Volunteer, // Defaulting to Volunteer
        mail: '',
        phone: '',
        city: '',
        description: '',
        gender: Gender.Male, // Defaulting to Male
    });

    const [errors, setErrors] = useState<Partial<Record<keyof User, string>>>({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setForm((prevForm) => ({...prevForm, [name]: value}));
    };

    const validateForm = () => {
        const newErrors: Partial<Record<keyof User, string>> = {};
        if (!form.username) newErrors.username = 'Username is required';
        if (!form.name) newErrors.name = 'Name is required';
        if (!form.password) newErrors.password = 'Password is required';
        if (!form.mail) newErrors.mail = 'Email is required';
        if (!form.phone) newErrors.phone = 'Phone is required';
        if (!form.city) newErrors.city = 'City is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            setIsLoading(true);
            try {
                const {status, message} = await AuthService.signup(form as User);

                toast({
                    title: status === 200 ? "Success" : "Error",
                    variant: status === 200 ? "default" : "destructive",
                    description: message,
                });

                if (status === 200) {
                    navigate('/login');
                }
            } catch (error) {
                console.error('Signup failed:', error);
                toast({
                    title: "Error",
                    variant: "destructive",
                    description: 'Signup failed. Please try again.',
                });
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit} className="signup-form">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" value={form.username} onChange={handleChange}
                           required/>
                    {errors.username && <span className="error">{errors.username}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" value={form.name} onChange={handleChange} required/>
                    {errors.name && <span className="error">{errors.name}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" value={form.password} onChange={handleChange}
                           required/>
                    {errors.password && <span className="error">{errors.password}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="type">User Type</label>
                    <select id="type" name="type" value={form.type} onChange={handleChange} required>
                        {Object.values(Type).map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="mail">Email</label>
                    <input type="email" id="mail" name="mail" value={form.mail} onChange={handleChange} required/>
                    {errors.mail && <span className="error">{errors.mail}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input type="tel" id="phone" name="phone" value={form.phone} onChange={handleChange} required/>
                    {errors.phone && <span className="error">{errors.phone}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input type="text" id="city" name="city" value={form.city} onChange={handleChange} required/>
                    {errors.city && <span className="error">{errors.city}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea id="description" name="description" value={form.description} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="gender">Gender</label>
                    <select id="gender" name="gender" value={form.gender} onChange={handleChange} required>
                        {Object.values(Gender).map((gender) => (
                            <option key={gender} value={gender}>{gender}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" disabled={isLoading}>{isLoading ? 'Signing up...' : 'Sign Up'}</button>
            </form>
            <p>Already have an account? <Link to="/login" className="login-link">Log in</Link></p>
        </div>
    );
};

export default Signup;
