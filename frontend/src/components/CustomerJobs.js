import React, { useState, useEffect } from 'react';
import axiosClient from '../utils/AxiosClient';
import './CustomerJobs.css';

const CustomerJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [applications, setApplications] = useState({}); // { jobId: [applications] }
  const [expandedJobId, setExpandedJobId] = useState(null);

  const [newJob, setNewJob] = useState({
    title: '',
    description: '',
    companyName: '',
    salary: ''
  });

  // Fetch jobs for customer
  const fetchJobs = async () => {
    try {
      const response = await axiosClient.get('http://localhost:8080/api/jobs');
      setJobs(response.data);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // TODO: сделать обработку заявок на закы
  const fetchApplications = async (jobId) => {
    try {
      const response = await axiosClient.get(`/api/jobs/${jobId}/applications`);
      setApplications(prev => ({
        ...prev,
        [jobId]: response.data
      }));
    } catch (error) {
      console.error(`Error ${jobId}:`, error);
    }
  };

  const handleStatusChange = async (jobId, applicationId, newStatus) => {
    try {
      await axiosClient.patch(`/api/applications/${applicationId}/status`, {
        status: newStatus
      });
      
      fetchApplications(jobId);
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Ошибка при обновлении статуса');
    }
  };

  const toggleJobExpansion = (jobId) => {
    if (expandedJobId === jobId) {
      setExpandedJobId(null);
    } else {
      setExpandedJobId(jobId);
      if (!applications[jobId]) {
        fetchApplications(jobId);
      }
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob((prevJob) => ({
      ...prevJob,
      [name]: value
    }));
  };

  const handleJobSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.post('http://localhost:8080/api/jobs', newJob);
      setNewJob({ title: '', description: '', companyName: '', salary: '' });
      alert('Заказ добавлен!');
      fetchJobs();
    } catch (error) {
      console.error('Error', error);
      alert('Ошибка');
    }
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="customer-jobs-container">
      <h1>Заказы</h1>

      
      <div className="cards-container">
        {jobs.map((job) => (
          <div className="job-card" key={job.id}>
            <div className="job-header" onClick={() => toggleJobExpansion(job.id)}>
              <h2>{job.title}</h2>
              <span>{expandedJobId === job.id ? '▲' : '▼'}</span>
            </div>
            <p>{job.description}</p>
            <p><strong>Категория:</strong> {job.companyName}</p>
            <p><strong>Бюджет:</strong> {job.salary}</p>
            <p><strong>Дата создания:</strong> {new Date(job.createdAt).toLocaleDateString()}</p>

            {expandedJobId === job.id && (
              <div className="applications-section">
                <h3>Заявки на этот заказ:</h3>
                {applications[job.id]?.length > 0 ? (
                  <ul className="applications-list">
                    {applications[job.id].map((app) => (
                      <li key={app.id} className="application-item">
                        <div className="application-info">
                          <p><strong>Фрилансер:</strong> {app.seeker.username || app.seeker.email}</p>
                          <p><strong>Статус:</strong> {app.status}</p>
                          <p><strong>Дата подачи:</strong> {new Date(app.appliedAt).toLocaleString()}</p>
                        </div>
                        <div className="status-actions">
                          <select
                            value={app.status}
                            onChange={(e) => handleStatusChange(job.id, app.id, e.target.value)}
                          >
                            <option value="APPLIED">Подана</option>
                            <option value="ACCEPTED">Принята</option>
                            <option value="REJECTED">Отклонена</option>
                            <option value="HIRED">Нанята</option>
                            <option value="COMPLETED">Завершена</option>
                          </select>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Нет заявок на этот заказ</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="add-job-form-container">
        <h2>Добавить новый заказ</h2>
        <form onSubmit={handleJobSubmit}>
          <label>Заголовок</label>
          <input
            type="text"
            name="title"
            value={newJob.title}
            onChange={handleInputChange}
            required
          />
          <label>Описание</label>
          <textarea
            name="description"
            value={newJob.description}
            onChange={handleInputChange}
            required
          />
          <label>Категория</label>
          <input
            type="text"
            name="companyName"
            value={newJob.companyName}
            onChange={handleInputChange}
            required
          />
          <label>Бюджет</label>
          <input
            type="text"
            name="salary"
            value={newJob.salary}
            onChange={handleInputChange}
            required
          />
          <br></br>
          <button type="submit">Добавить заказ</button>
        </form>
      </div>
    </div>
  );
};

export default CustomerJobs;
