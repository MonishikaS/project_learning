import React, { useEffect, useState, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../contexts/AuthContext';
import QuizPlayer from '../components/QuizPlayer/QuizPlayer';

export default function StudentDashboard(){
  const { user } = useContext(AuthContext);
  const [quiz, setQuiz] = useState(null);

  useEffect(()=> {
    // auto-generate a small formative quiz when dashboard loads
    async function gen(){
      if (!user) return;
      const res = await api.post('/quiz/generate', { learnerId: user.id, size: 5, mode: 'formative' });
      setQuiz(res.data);
    }
    gen();
  }, [user]);

  return (
    <div style={{display:'grid', gridTemplateColumns: '1fr 1fr', gap:20, padding:20}}>
      <div>
        <h1>Welcome{user ? ', ' + user.name : ''}</h1>
        <div style={{background:'#fff', padding:12, borderRadius:8}}>
          <h3>Start Quiz</h3>
          <p>Auto-generated quiz below</p>
        </div>
      </div>
      <div>
        {quiz ? <QuizPlayer quiz={quiz} /> : <div>Loading quiz...</div>}
      </div>
    </div>
  );
}
