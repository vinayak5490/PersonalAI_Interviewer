import React, { useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000'); // Adjust if needed

const InterviewSimulator = ({ resumeText, jobDesc }) => {
  const [conversation, setConversation] = useState([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [aiThinking, setAiThinking] = useState(false);
  const [listening, setListening] = useState(false);
  const videoRef = useRef(null);
  const recognitionRef = useRef(null);

  // Camera setup
  useEffect(() => {
    if (videoRef.current && navigator.mediaDevices?.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        videoRef.current.srcObject = stream;
      });
    }
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  // Socket setup
  useEffect(() => {
    socket.on('aiQuestion', ({ question }) => {
      setConversation(prev => [...prev, { role: 'ai', text: question }]);
      speak(question);
      setAiThinking(false);
    });
    // Cleanup
    return () => {
      socket.off('aiQuestion');
    };
  }, []);

  // Text-to-Speech
  const speak = (text) => {
    if ('speechSynthesis' in window) {
      const utter = new window.SpeechSynthesisUtterance(text);
      utter.lang = 'en-US';
      window.speechSynthesis.speak(utter);
    }
  };

  // Speech-to-Text
  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition not supported in this browser.');
      return;
    }
    setListening(true);
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setUserAnswer(transcript);
      setListening(false);
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    recognition.start();
    recognitionRef.current = recognition;
  };

  // Start interview
  const startInterview = () => {
    setConversation([]);
    setAiThinking(true);
    socket.emit('startInterview', { resumeText, jobDesc });
  };

  // Send answer
  const handleSendAnswer = () => {
    if (!userAnswer.trim()) return;
    const updatedConversation = [...conversation, { role: 'user', text: userAnswer }];
    setConversation(updatedConversation);
    setAiThinking(true);
    socket.emit('userAnswer', {
      answer: userAnswer,
      conversation: updatedConversation,
      jobDesc,
      resumeText,
    });
    setUserAnswer('');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gradient-to-br from-white via-indigo-50 to-purple-100 px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-extrabold text-indigo-700 mb-6 text-center">
          <span className="text-pink-500">AI Interview Simulation</span>
        </h2>
        <div className="flex justify-center mb-6">
          <video ref={videoRef} autoPlay className="rounded-lg w-48 h-36 shadow-lg border-2 border-indigo-200" />
        </div>
        <div className="mb-6 max-h-96 overflow-y-auto">
          {conversation.map((msg, idx) => (
            <div key={idx} className={`mb-4 flex ${msg.role === 'ai' ? 'justify-start' : 'justify-end'}`}>
              <div className={`px-4 py-2 rounded-lg shadow ${msg.role === 'ai' ? 'bg-indigo-100 text-indigo-900' : 'bg-pink-100 text-pink-900'}`}>
                <b>{msg.role === 'ai' ? 'AI:' : 'You:'}</b> {msg.text}
              </div>
            </div>
          ))}
          {aiThinking && (
            <div className="text-indigo-500 text-center">AI is thinking...</div>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <input
            type="text"
            className="flex-1 px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            placeholder="Type your answer or use the mic..."
            value={userAnswer}
            onChange={e => setUserAnswer(e.target.value)}
            disabled={aiThinking}
          />
          <button
            onClick={startListening}
            className={`bg-yellow-400 text-indigo-700 px-4 py-2 rounded-lg font-semibold shadow hover:bg-yellow-300 transition ${listening ? 'animate-pulse' : ''}`}
            disabled={aiThinking}
            title="Speak your answer"
          >
            🎤 {listening ? 'Listening...' : 'Speak'}
          </button>
          <button
            onClick={handleSendAnswer}
            className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-bold px-6 py-2 rounded-lg shadow-md hover:from-indigo-400 hover:to-pink-400 transition"
            disabled={aiThinking || !userAnswer.trim()}
          >
            Send
          </button>
        </div>
        <div className="mt-6 flex justify-center">
          <button
            onClick={startInterview}
            className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:from-indigo-400 hover:to-pink-400 transition"
            disabled={aiThinking}
          >
            Start New Interview
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterviewSimulator;