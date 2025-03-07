// src/App.jsx
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import FriendProfile from './components/FriendProfile/FriendProfile';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import ErrorBoundary from './components/ErrorBoundary';
import './styles/App.css';

function App() {
  const [friends, setFriends] = useState(() => {
    try {
      const savedFriends = localStorage.getItem('friends');
      return savedFriends ? JSON.parse(savedFriends) : [];
    } catch (error) {
      console.error("Error loading friends from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('friends', JSON.stringify(friends));
    } catch (error) {
      console.error("Error saving friends to localStorage:", error);
    }
  }, [friends]);

  const addFriend = (newFriend) => {
    setFriends([...friends, { 
      ...newFriend, 
      id: Date.now(), 
      lastContact: new Date().toISOString(),
      nextContactDue: calculateNextContact(newFriend.contactFrequency)
    }]);
  };

  const updateLastContact = (friendId) => {
    setFriends(friends.map(friend => {
      if (friend.id === friendId) {
        const now = new Date().toISOString();
        return {
          ...friend,
          lastContact: now,
          nextContactDue: calculateNextContact(friend.contactFrequency, now)
        };
      }
      return friend;
    }));
  };

  const calculateNextContact = (frequency, startDate = new Date()) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + parseInt(frequency));
    return date.toISOString();
  };

  // Add delete functionality
  const deleteFriend = (friendId) => {
    setFriends(friends.filter(friend => friend.id !== friendId));
  };

  // Add update functionality
  const updateFriend = (updatedFriend) => {
    setFriends(friends.map(friend => 
      friend.id === updatedFriend.id ? updatedFriend : friend
    ));
  };

  return (
    <Router>
      <ErrorBoundary>
        <div className="app">
          <Header />
          <div className="main-container">
            <Sidebar friends={friends} />
            <main className="content">
              <Routes>
                <Route path="/" element={<Dashboard friends={friends} updateLastContact={updateLastContact} addFriend={addFriend} />} />
                <Route path="/friend/:id" element={<FriendProfile 
                  friends={friends} 
                  updateLastContact={updateLastContact}
                  deleteFriend={deleteFriend}
                  updateFriend={updateFriend}
                />} />
              </Routes>
            </main>
          </div>
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
