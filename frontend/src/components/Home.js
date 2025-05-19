import React from 'react';
import { Link } from 'react-router-dom';
export default function Home() {
    return (
        <div className="homeContainer">
            {/* Hero Section */}
            <div className="heroSection">
                <h1>Добро пожаловать на SelfWork</h1>
                <p>Начните пользоваться нашей фриланс-биржей. Для открытия новых возможностей, заказов и перспектив!</p>
                
                <Link to="/login"><button className="ctaButton">Перейти к заказам</button></Link>
            </div>


            {/* Testimonials Section */}
            <div className="testimonialsSection">
                <h2>Что о нас говорят?</h2>
                <div className="testimonialsList">
                    <div className="testimonial">
                        <p>"SelfWork реализует мечты!"</p>
                        <span>- Счастливый пользователь</span>
                    </div>
                    <div className="testimonial">
                        <p>"Удобно и приятно пользоваться."</p>
                        <span>- Счастливый пользователь</span>
                    </div>
                </div>
            </div>

            {/* Footer Section */}
            <div className="footerSection">
                <p>&copy; 2025 SelfWork. Все права защищены.</p>
            </div>
        </div>
    );
}
