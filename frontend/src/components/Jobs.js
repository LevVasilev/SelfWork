import React, { useEffect, useState } from 'react';
import axiosClient from '../utils/AxiosClient';
import { useAuth } from '../contexts/AuthContext';
import './Jobs.css';

const Jobs = () => {
    const { user, logout } = useAuth();
    console.log(user);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axiosClient.get('http://localhost:8080/api/jobs');
                console.log(response.data);
                setJobs(response.data);
            } catch (error) {
                console.log(error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    const handleApply = async (job) => {
        try {
            const seekerId = 52; // Replace with the current logged-in user's ID
            const sendData = {
                job: job,
                seeker: user,
            }
            console.log(sendData)
            const response = await axiosClient.post('http://localhost:8080/api/applications', sendData);
            console.log(sendData)
            alert(`Отклик добавлен: ${job.id}`);
            console.log(response.data);
        } catch (error) {
            console.error('Error applying for job:', error);
            alert('Ошибка отклика.');
        }
    };

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="jobs-container">
            <h1>Поиск заказов</h1>

            <div className="search-container">
                <input
                    type="text"
                    placeholder="Поиск заказов..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>

            <div className="cards-container">
                {jobs
                .filter(job => job.title.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((job) => (
                    <div className="job-card" key={job.id}>
                        <h2>{job.title}</h2>
                        <p>{job.description}</p>
                        <p><strong>Категория:</strong> {job.companyName}</p>
                        <p><strong>Бюджет:</strong> {job.salary}</p>
                        <p><strong>Дата публикации:</strong> {new Date(job.createdAt).toLocaleDateString()}</p>
                        <p><strong>Срок:</strong> </p>
                        <button 
                            className="apply-button" 
                            onClick={() => handleApply(job)}
                        >
                            Откликнуться
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Jobs;
