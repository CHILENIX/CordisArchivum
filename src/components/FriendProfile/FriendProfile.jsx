// src/components/FriendProfile/FriendProfile.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './FriendProfile.css';

function FriendProfile({ friends, updateLastContact }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const friendId = parseInt(id);
  const friend = friends.find(f => f.id === friendId);
  
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [formData, setFormData] = useState(friend || {});

  if (!friend) {
    return (
      <div className="profile-not-found">
        <h2>Amigo no encontrado</h2>
        <button onClick={() => navigate('/')}>Volver al Dashboard</button>
      </div>
    );
  }

  // Calcular días desde el último contacto
  const getDaysSinceLastContact = () => {
    const lastContact = new Date(friend.lastContact);
    const today = new Date();
    const diffTime = Math.abs(today - lastContact);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Calcular días hasta el próximo contacto
  const getDaysUntilNextContact = () => {
    const nextContact = new Date(friend.nextContactDue);
    const today = new Date();
    const diffTime = nextContact - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para actualizar el amigo
    // Implementación pendiente
    setShowEditForm(false);
  };

  const handleDelete = () => {
    // Aquí iría la lógica para eliminar el amigo
    // Implementación pendiente
    navigate('/');
  };

  return (
    <div className="friend-profile">
      <div className="profile-header">
        <button className="back-btn" onClick={() => navigate('/')}>
          ← Volver
        </button>
        <h1>{friend.name}</h1>
      </div>

      {!showEditForm ? (
        <div className="profile-content">
          <div className="profile-image">
            {friend.profilePic ? (
              <img src={friend.profilePic} alt={`Foto de ${friend.name}`} />
            ) : (
              <div className="default-avatar">
                {friend.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <div className="contact-status">
            <div className="status-card">
              <h3>Estado de contacto</h3>
              <p className="days-count">
                {getDaysSinceLastContact()} días desde el último contacto
              </p>
              <p className="days-until">
                {getDaysUntilNextContact() <= 0 
                  ? "¡Ya deberías contactar a esta persona!" 
                  : `${getDaysUntilNextContact()} días hasta el próximo contacto`}
              </p>
              <p className="frequency">
                Frecuencia deseada: cada {friend.contactFrequency} días
              </p>
              <button 
                className="contact-btn" 
                onClick={() => updateLastContact(friendId)}
              >
                Registrar contacto ahora
              </button>
            </div>
          </div>

          <div className="friend-details">
            <h3>Información de contacto</h3>
            {friend.email && <p><strong>Email:</strong> {friend.email}</p>}
            {friend.phone && <p><strong>Teléfono:</strong> {friend.phone}</p>}
            {friend.birthday && <p><strong>Cumpleaños:</strong> {new Date(friend.birthday).toLocaleDateString()}</p>}
            
            <h3>Notas</h3>
            <div className="notes-section">
              {friend.notes ? friend.notes : <em>No hay notas añadidas</em>}
            </div>
          </div>

          <div className="profile-actions">
            <button 
              className="edit-btn" 
              onClick={() => setShowEditForm(true)}
            >
              Editar perfil
            </button>
            <button 
              className="delete-btn" 
              onClick={() => setShowConfirmDelete(true)}
            >
              Eliminar amigo
            </button>
          </div>

          {showConfirmDelete && (
            <div className="confirm-delete">
              <p>¿Estás seguro de que quieres eliminar a {friend.name}?</p>
              <div className="confirm-buttons">
                <button onClick={() => setShowConfirmDelete(false)}>Cancelar</button>
                <button className="confirm-delete-btn" onClick={handleDelete}>
                  Confirmar eliminación
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <form className="edit-form" onSubmit={handleUpdate}>
          {/* Aquí iría el formulario de edición, similar al AddFriendForm */}
          <button type="button" onClick={() => setShowEditForm(false)}>
            Cancelar
          </button>
          <button type="submit">Guardar cambios</button>
        </form>
      )}
    </div>
  );
}

export default FriendProfile;
