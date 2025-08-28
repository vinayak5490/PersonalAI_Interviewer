import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UploadResume = () => {
  const [resume, setResume] = useState(null);
  const [jobDesc, setJobDesc] = useState('');
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
    setMessage('');
  };

  const handleJobDescChange = (e) => {
    setJobDesc(e.target.value);
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume || !jobDesc.trim()) {
      setMessage('Please upload your resume and enter the job description.');
      return;
    }
    setUploading(true);
    setMessage('');
    const formData = new FormData();
    formData.append('resume', resume);
    formData.append('jobDesc', jobDesc);

    try {
      const res = await fetch('/api/interview/upload',{
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setUploading(false);
      if(res.ok){
        navigate('/interview', {state : {resumeText: data.resumeText, jobDesc}});
        setMessage('Interview simulation started!');
      }else{
        setMessage(data.message || 'Error simulating interview.');
      }
    } catch (error) {
      setUploading(false);
      setMessage('Network error');
    }
  };

return (
  <div className="flex items-center justify-center min-h-[70vh] bg-gradient-to-br from-white via-indigo-50 to-purple-100">
    {uploading ? (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-500 mb-4"></div>
        <div className="text-xl text-indigo-700 font-semibold">Preparing your interview...</div>
      </div>
    ) : (
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg"
        encType="multipart/form-data"
      >
         <h2 className="text-3xl font-extrabold text-indigo-700 mb-6 text-center">
          Upload <span className="text-pink-500">Resume</span> & <span className="text-pink-500">Job Description</span>
        </h2>
        {message && (
          <div className={`mb-4 rounded px-3 py-2 text-sm text-center ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
            {message}
          </div>
        )}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="resume">
            Resume (PDF)
          </label>
          <input
            id="resume"
            name="resume"
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition bg-white"
            required
          />
          {resume && <span className="text-xs text-gray-600 mt-1 block">{resume.name}</span>}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="jobDesc">
            Job Description (Text)
          </label>
          <textarea
            id="jobDesc"
            name="jobDesc"
            rows={5}
            value={jobDesc}
            onChange={handleJobDescChange}
            className="w-full px-3 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition bg-white resize-none"
            placeholder="Paste or type the job description here..."
            required
          />
        </div>
        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-bold py-3 rounded-lg shadow-md hover:from-indigo-400 hover:to-pink-400 transition"
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    )}
  </div>
);
};

export default UploadResume;