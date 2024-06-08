import { useState, useEffect } from 'react';

export const Polki = () => {
    const [shoes, setShoes] = useState([]);

    useEffect(() => {
        fetchShoes();
    }, []);

    const fetchShoes = async () => {
        try {
            const response = await fetch('http://localhost:3000/shoes/szafa');
            if (!response.ok) {
                throw new Error('Nie udało się pobrać danych o butach');
            }
            const data = await response.json();

            setShoes(data.shoes); // Ustawienie tablicy butów jako stan komponentu
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>Moje buty:</h2>
            <ul>
                {shoes.map((shoe, index) => (
                    <li key={index}>
                        Nazwa: {shoe.name}, Kolor: {shoe.color}
                    </li>
                ))}
            </ul>
        </div>
    );
};
