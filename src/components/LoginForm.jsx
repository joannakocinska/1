import { useState } from 'react';
import '../App.css';

export const LoginForm = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ login: '', password: '', general: '' });

    const handleLogout = () => {
        document.cookie = 'loggedInUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        window.location.reload();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setErrors({login: '', password: '', general: ''});

        let valid = true;
        if (!login) {
            setErrors((errors) => ({...errors, login: 'Pole login nie może być puste'}));
            valid = false;
        }
        if (!password) {
            setErrors((errors) => ({...errors, password: 'Pole hasło nie może być puste'}));
            valid = false;
        } else if (password.length < 6) {
            setErrors((errors) => ({...errors, password: 'Hasło musi mieć co najmniej 6 znaków'}));
            valid = false;
        }

        if (valid) {
            try {
                const response = await fetch(`http://localhost:3000/users/login?user=${login}&password=${password}`, {
                    method: 'GET'
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                if (result.success) {
                    console.log('Zalogowano :3', {login, password});

                    // Tworzenie ciasteczka po udanym zalogowaniu
                    document.cookie = `loggedInUser=${login}; path=/`;
                    window.location.reload();
                } else {
                    console.log('Błąd logowania: ', result.message);
                    setErrors((errors) => ({...errors, general: result.message}));
                }
            } catch (error) {
                console.error('Error:', error);
                setErrors((errors) => ({...errors, general: 'Wystąpił błąd podczas logowania'}));
            }
        }
    };

    const isLoggedIn = document.cookie.split(';').some((item) => item.trim().startsWith('loggedInUser='));

    return (
        <div className="container mt-5" style={{ width: '100vw' }}>
            {isLoggedIn ? (
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <p className="text-success">Jesteś już zalogowany</p>
                        <button className="btn btn-primary" onClick={handleLogout}>WYJDŹ Z SZAFY :(</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="mb-3" style={{ width: '50vw', margin: "auto" }}>
                        <label htmlFor="login" className="form-label">Login</label>
                        <input
                            type="text"
                            className={`form-control ${errors.login ? 'is-invalid' : ''}`}
                            id="login"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                        />
                        {errors.login && <div className="invalid-feedback">{errors.login}</div>}
                    </div>
                    <div className="mb-3" style={{ width: '50vw', margin: "auto" }}>
                        <label htmlFor="password" className="form-label">Hasło</label>
                        <input
                            type="password"
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>

                    {errors.general && <div className="mb-3 text-danger" style={{ width: '50vw', margin: "auto" }}>{errors.general}</div>}

                    <button type="submit" className="btn btn-primary">WEJDŹ DO SZAFY!!!</button>
                </form>
            )}
        </div>
    );
}
