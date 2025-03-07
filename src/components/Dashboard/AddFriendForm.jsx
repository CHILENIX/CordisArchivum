// src/components/Dashboard/AddFriendForm.jsx
import { useState } from 'react';
import './AddFriendForm.css';

function AddFriendForm({ addFriend, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    contactFrequency: 14, // valor por defecto: 2 semanas
    email: '',
    phone: '',
    birthday: '',
    notes: '',
    profilePic: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addFriend(formData);
    onClose();
  };

  return (
    <div className="add-friend-form">
      <h2>Añadir nuevo amigo</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre*</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="contactFrequency">Frecuencia de contacto (días)*</label>
          <input
            type="number"
            id="contactFrequency"
            name="contactFrequency"
            min="1"
            max="365"
            value={formData.contactFrequency}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Teléfono</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="birthday">Cumpleaños</label>
          <input
            type="date"
            id="birthday"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notas</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="profilePic">URL de foto de perfil</label>
          <input
            type="url"
            id="profilePic"
            name="profilePic"
            value={formData.profilePic}
            onChange={handleChange}
            placeholder="https://example.com/photo.jpg"
          />
        </div>

        <div className="form-buttons">
          <button type="button" onClick={onClose} className="cancel-btn">
            Cancelar
          </button>
          <button type="submit" className="submit-btn">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddFriendForm;
