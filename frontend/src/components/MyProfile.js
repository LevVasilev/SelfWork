import React, { useEffect, useState } from 'react';
import axiosClient from '../utils/AxiosClient';
import './Profile.css';
import { useAuth } from '../contexts/AuthContext';



const MyProfile = () => {
    const { user } = useAuth();
    const userId = user.id;
    const [profile, setProfile] = useState(null);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfileAndApplications = async () => {
            try {
                // Fetch profile data
                const profileResponse = await axiosClient.get('http://localhost:8080/api/users/me');
                setProfile(profileResponse.data);

                // Fetch applications for the user
                const applicationsResponse = await axiosClient.get('http://localhost:8080/api/applications/user/'+userId); // Replace 52 with dynamic userId if needed
                setApplications(applicationsResponse.data);
            } catch (error) {
                console.error('Error fetching profile and applications:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfileAndApplications();
    }, [userId]);


    const calculateTimeSinceRegistration = (createdAt) => {
        const registrationDate = new Date(createdAt);
        const now = new Date();
        const diffInMs = now - registrationDate;
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        
        if (diffInDays < 1) {
            const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
            return `Зарегистрирован ${diffInHours} час(а/ов) назад`;
        } else if (diffInDays < 30) {
            return `Зарегистрирован ${diffInDays} день/дней назад`;
        } else if (diffInDays < 365) {
            const diffInMonths = Math.floor(diffInDays / 30);
            return `Зарегистрирован ${diffInMonths} месяц(ев) назад`;
        } else {
            const diffInYears = Math.floor(diffInDays / 365);
            const remainingMonths = Math.floor((diffInDays % 365) / 30);
            return `Зарегистрирован ${diffInYears} год/лет и ${remainingMonths} месяц(ев) назад`;
        }
    };

    const translateStatus = (status) => {
        switch(status) {
            case 'APPLIED': return 'Отправлено';
            case 'REJECTED': return 'Отклонено';
            case 'HIRED': return 'Принято';
            default: return status;
        }
    };
    const [statusFilter, setStatusFilter] = useState('ALL');
    const filteredApplications = applications.filter(app => 
        statusFilter === 'ALL' || app.status === statusFilter
    );


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="profile-container">
            <h1>Мой профиль</h1>
            <div className="profile-card">
                <h2>{profile.name}</h2>
                <p><strong>E-mail:</strong> {profile.email}</p>
                <p><strong>Телефон:</strong> {profile.mobile}</p>
                <p><strong>Профессия:</strong> {profile.skills}</p>
                <p><strong>Статус:</strong> {profile.enabled ? 'Зарегистрирован' : 'Заблокирован'}</p>
                <p><strong>Дата присоединения:</strong> {new Date(profile.createdAt).toLocaleDateString()}</p>
                <p><strong>На платформе:</strong> {calculateTimeSinceRegistration(profile.createdAt)}</p>
            </div>

<div className="status-filters">
    <button 
        className={statusFilter === 'ALL' ? 'active' : ''}
        onClick={() => setStatusFilter('ALL')}
    >
        Все
    </button>
    <button 
        className={statusFilter === 'APPLIED' ? 'active' : ''}
        onClick={() => setStatusFilter('APPLIED')}
    >
        Отправленные ({applications.filter(a => a.status === 'APPLIED').length})
    </button>
    <button 
        className={statusFilter === 'REJECTED' ? 'active' : ''}
        onClick={() => setStatusFilter('REJECTED')}
    >
        Отклоненные ({applications.filter(a => a.status === 'REJECTED').length})
    </button>
    <button 
        className={statusFilter === 'HIRED' ? 'active' : ''}
        onClick={() => setStatusFilter('HIRED')}
    >
        Исполнитель ({applications.filter(a => a.status === 'HIRED').length})
    </button>
</div>


            <h2>Мой заказы</h2>
            {filteredApplications.length > 0 ? (
                <table className="applications-table">
                    <thead>
                        <tr>
                            <th>Заказ</th>
                            <th>Категория</th>
                            <th>Статус</th>
                            <th>Дата отклика</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredApplications.map((application) => (
                            <tr key={application.id}>
                                <td>{application.job.title}</td>
                                <td>{application.job.companyName}</td>
                                <td>{translateStatus(application.status)}</td>
                                <td>{new Date(application.appliedAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Ничего нету.</p>
            )}
        </div>
    );
};

export default MyProfile;
