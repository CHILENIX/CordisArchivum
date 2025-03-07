// src/components/Layout/Sidebar.jsx
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar({ friends }) {
  // Ordenar amigos alfabéticamente por nombre
  const sortedFriends = [...friends].sort((a, b) => 
    a.name.localeCompare(b.name)
  );

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Mis Contactos</h2>
      </div>
      <div className="friends-list-sidebar">
        {sortedFriends.length === 0 ? (
          <p className="no-friends-sidebar">
            No has añadido ningún amigo todavía
          </p>
        ) : (
          <ul>
            {sortedFriends.map(friend => (
              <li key={friend.id}>
                <Link to={`/friend/${friend.id}`} className="friend-link">
                  {friend.profilePic ? (
                    <img 
                      src={friend.profilePic} 
                      alt={friend.name} 
                      className="friend-avatar"
                    />
                  ) : (
                    <div className="default-avatar-small">
                      {friend.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span>{friend.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="sidebar-footer">
        <Link to="/" className="add-friend-sidebar">
          + Añadir nuevo contacto
        </Link>
      </div>
    </aside>
  );
}

export default Sidebar;
