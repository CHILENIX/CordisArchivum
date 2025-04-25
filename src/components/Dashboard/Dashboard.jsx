// src/components/Dashboard/Dashboard.jsx
import { Link } from 'react-router-dom';
import AddFriendForm from './AddFriendForm';
import './Dashboard.css';

function Dashboard({ friends, updateLastContact, addFriend, showAddForm, setShowAddForm }) {
  
  // Ordenar amigos por urgencia (los que están más cerca o pasados de la fecha de contacto)
  const sortedFriends = [...friends].sort((a, b) => {
    return new Date(a.nextContactDue) - new Date(b.nextContactDue);
  });

  // Calcular días desde el último contacto
  const getDaysSinceLastContact = (lastContactDate) => {
    const lastContact = new Date(lastContactDate);
    const today = new Date();
    const diffTime = Math.abs(today - lastContact);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Determinar el estado (atrasado, pronto, ok)
  const getStatus = (nextDue) => {
    const today = new Date();
    const dueDate = new Date(nextDue);
    
    if (dueDate < today) {
      return "atrasado";
    } else if ((dueDate - today) / (1000 * 60 * 60 * 24) < 3) {
      return "pronto";
    }
    return "ok";
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>CordisArchivum</h1>
        <button 
          className="add-friend-btn" 
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? "Cancelar" : "Añadir amigo"}
        </button>
      </div>

      {showAddForm && <AddFriendForm addFriend={addFriend} onClose={() => setShowAddForm(false)} />}

      <div className="friends-container">
        <h2>Recordatorios de contacto</h2>
        {sortedFriends.length === 0 ? (
          <p className="no-friends">No has añadido ningún amigo aún. ¡Comienza añadiendo uno!</p>
        ) : (
          <div className="friends-list">
            {sortedFriends.map(friend => {
              const status = getStatus(friend.nextContactDue);
              return (
                <div key={friend.id} className={`friend-card ${status}`}>
                  <div className="friend-info">
                    <h3>{friend.name}</h3>
                    <p className="days-count">
                      {getDaysSinceLastContact(friend.lastContact)} días desde el último contacto
                    </p>
                    <p className="frequency">
                      Frecuencia deseada: cada {friend.contactFrequency} días
                    </p>
                  </div>
                  <div className="friend-actions">
                    <button onClick={() => updateLastContact(friend.id)}>
                      Registrar contacto
                    </button>
                    <Link to={`/friend/${friend.id}`} className="view-profile">
                      Ver perfil
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
