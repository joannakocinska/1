import { useState } from 'react';
import '../App.css';
export const Wyszukiwarka = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim() !== '') {
            console.log('Szukane hasło:', searchTerm);
            setError('');
        } else {
            setError('Pole wyszukiwania nie może być puste!');
        }
    };

    return (
        <div className="container-fluid mt-3 mb-3">
            <div className="row justify-content-center">
                <div className="col-md-8 custom-border p-3">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="searchInput" className="form-label">Czego szukasz?</label>
                            <input
                                type="text"
                                className="form-control"
                                id="searchInput"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                            {error && <div className="text-danger">{error}</div>}
                        </div>
                        <button type="submit" className="btn btn-custom">Szukaj!</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
