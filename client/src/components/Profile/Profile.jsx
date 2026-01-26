const API_BASE = window.location.hostname === 'localhost' ? 'http://localhost:3000' : '' ;


import React, { useState, useEffect } from 'react';
import styles from './Profile.module.css';

const Profile = () => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user ? user._id : null;
  console.log('User ID:', userId); // Debugging: Check if userId is retrieved correctly

  // Manage modal open state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Initialize form data as null and wait for fetch
  const [formData, setFormData] = useState(null);
  // Separate edit form data for temporary changes
  const [editFormData, setEditFormData] = useState(null);
  const [pokemonTypes, setPokemonTypes] = useState([]);


  // User info state
  const [userInfo, setUserInfo] = useState(null);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

  // All users list (for admin)
  const [users, setUsers] = useState([]);

  // Fetch all users if admin
  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/users`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        console.log('Fetched users:', data); // Debugging: Check fetched users
        setUsers(data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  useEffect(() => {
    if (user && user.role === 'admin') {
      fetchUsers();
    }
  }, [user, token]);

  // Admin: Delete any user
  const handleAdminDeleteUser = async (targetUserId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      const res = await fetch(`${API_BASE}/api/users/${targetUserId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        await fetchUsers();
        alert('User deleted successfully.');
      } else {
        alert('Failed to delete user.');
      }
    } catch (error) {
      alert('Error occurred while deleting user.');
    }
  };

  // Admin: Change any user's password
  const handleAdminChangeUserPassword = async (targetUserId) => {
    const newPassword = window.prompt('Enter new password for this user (6+ chars):');
    if (!newPassword || newPassword.length < 6) {
      alert('Password must be at least 6 characters.');
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/api/users/${targetUserId}/password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ new_password: newPassword })
      });
      if (res.ok) {
        alert('Password changed successfully.');
      } else {
        alert('Failed to change password.');
      }
    } catch (error) {
      alert('Error occurred while changing password.');
    }
  };


  // Fetch profile data from backend

  // 1. Read profile (GET)
  const fetchProfile = async () => {
    if (!userId) return;
    try {
      const res = await fetch(`${API_BASE}/api/profile/users/${userId}`);
      console.log('fetch response:', res);
      if (res.ok) {
        const data = await res.json();
        setFormData(data);
        // console.log('Profile data fetched:', data);
      } else if (res.status === 404) {
        // Initialize with default profile if not found
        console.log('Profile not found, initializing with default values');
        setFormData({
          bannerUrl: 'https://wallpapercave.com/wp/wp12045006.jpg',
          iconUrl: 'https://images.seeklogo.com/logo-png/28/1/bulbasaur-logo-png_seeklogo-286482.png',
          name: 'Unnamed Trainer',
          title: 'Pokémon Trainer · Unknown Region',
          location: 'Unknown Location',
          summary: 'This trainer has not shared their journey yet.',
          types: ['N/A'],
          details: [
            'No favorite Pokémon yet',
            'No buddy selected',
            '0 / 8 badges collected',
            'No regions explored',
            'Unknown join date',
            'No languages specified',
            'No team selected']
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [userId]);

  // Handle input changes (single or array fields) - Now uses editFormData
  const handleInputChange = (e, field, index) => {
    if (!editFormData) return;
    if (field === 'details') {
      const newDetails = [...editFormData.details];
      newDetails[index] = e.target.value;
      setEditFormData({ ...editFormData, details: newDetails });
    } else if (field === 'types') {
      setEditFormData({ ...editFormData, types: e.target.value.split(',').map(t => t.trim()) });
    } else {
      setEditFormData({ ...editFormData, [field]: e.target.value });
    }
  };

  // Save profile to backend (PUT) - Now commits editFormData to formData
  const handleSave = async () => {
    try {
      // Use POST when saving profile for the first time (i.e., creating a new profile)
      const method = editFormData && editFormData._id ? 'PUT' : 'POST';
      const url = editFormData && editFormData._id
        ? `/api/profile/users/${userId}`
        : `/api/profile`;

      const res = await fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        body: JSON.stringify({ ...editFormData, userId })
      });
      console.log('Save profile response:', res); // Debugging: Check response

      if (res.ok) {
        const updated = await res.json();
        console.log('Profile saved:', updated);
        setFormData(updated); // Update main data with saved result
        setEditFormData(null); // Clear temporary edit data
        setIsModalOpen(false);
      } else {
        console.error('Failed to save profile:', res.statusText);
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };


  // Fetch types by Pokémon name (using PokéAPI)
  useEffect(() => {
    const fetchTypes = async () => {
      if (!formData || !formData.details || !formData.details[1]) {
        setPokemonTypes(['Unknown']);
        return;
      }

      const rawBuddy = formData.details[1].trim();
      // If the field is a placeholder or obviously not a Pokémon name, skip calling PokeAPI
      if (/\bno\b|unknown|not selected|n\/a/i.test(rawBuddy)) {
        setPokemonTypes(['Unknown']);
        return;
      }

      const pokemonName = rawBuddy.toLowerCase().replace(/[^a-z0-9-]/g, '');
      if (!pokemonName) {
        setPokemonTypes(['Unknown']);
        return;
      }

      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (res.ok) {
          const data = await res.json();
          const types = data.types.map(t => t.type.name);
          setPokemonTypes(types);
        } else {
          // 404 or other non-OK responses -> unknown types
          setPokemonTypes(['Unknown']);
        }
      } catch (err) {
        console.error('[Profile] fetchTypes error:', err);
        setPokemonTypes(['Unknown']);
      }
    };
    fetchTypes();
  }, [formData?.details]);


  // Fetch user info (users collection)
  useEffect(() => {
    console.log('Fetching user info for ID:', userId); // Debugging: Check userId
    const fetchUserInfo = async () => {
      if (!userId) return;
      try {
        const res = await fetch(`${API_BASE}/api/users/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        console.log('User info fetch response:', res); // Debugging: Check response
        const data = await res.json();
        console.log('User info fetched:', data); // Debugging: Check fetched user info
        if (res.ok) {
          setUserInfo(data);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
    fetchUserInfo();
  }, [userId]);

  // Delete account
  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account?')) return;
    try {
      const res = await fetch(`${API_BASE}/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // add when auth required
        }
      });
      console.log('Delete account response:', res); // Debugging: Check delete response
      if (res.ok) {
        alert('Your account has been deleted successfully.');
        localStorage.removeItem('user');
        window.location.href = '/'; // navigate to home
      } else {
        alert('Failed to delete account');
      }
    } catch (error) {
      alert('Error occurred while deleting account');
    }
  };

  // Admin toggle functionality
  const handleToggleAdmin = async () => {
    if (!userInfo) return;
    const newRole = userInfo.role === 'admin' ? 'user' : 'admin';
    try {
      const res = await fetch(`${API_BASE}/api/users/${userId}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ role: newRole })
      });
      if (res.ok) {
        // Update localStorage with new role
        const currentUser = JSON.parse(localStorage.getItem('user'));
        currentUser.role = newRole;
        localStorage.setItem('user', JSON.stringify(currentUser));
        alert(`Role changed to ${newRole} successfully!`);
        // Refetch userInfo to update UI
        const userRes = await fetch(`${API_BASE}/api/users/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        if (userRes.ok) {
          const updatedUser = await userRes.json();
          setUserInfo(updatedUser);
        }
      } else {
        alert('Failed to change role');
      }
    } catch (error) {
      console.error('Error changing role:', error);
      alert('Error occurred while changing role');
    }
  };
  // Change password
  const handleChangePassword = async (newPassword) => {
    try {
      const res = await fetch(`${API_BASE}/api/users/${userId}/password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ new_password: newPassword })
      });

      if (res.ok) {
        alert('Your password has been changed successfully');
      } else {
        alert('Failed to change password');
      }
    } catch (error) {
      alert('Error occurred while changing password');
    }
  };



  // Cancel edit - restore original data
  const handleCancel = () => {
    setEditFormData(null); // Clear temporary edit data
    setIsModalOpen(false);
  };

  // Open edit modal - copy current data to edit state
  const openEditModal = () => {
    setEditFormData(formData ? { ...formData } : null); // Copy current data for editing
    setIsModalOpen(true);
  };


  // Prevent rendering if profile not loaded
  if (!formData) return <div>Loading profile...</div>;

  // If admin, show user list and My Account only (hide profile details)
  if (user && user.role === 'admin') {
    return (
      <div className={styles.profilePage}>
        <div className={styles.card} style={{ marginTop: '2rem', maxWidth: 700, marginLeft: 'auto', marginRight: 'auto', overflowX: 'auto' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '1.5rem', fontWeight: 700, fontSize: '2.5rem', letterSpacing: '1px' }}>All Users</h3>
          <table className={styles.userTable} style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f0f0f0' }}>
                <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Name</th>
                <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Email</th>
                <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Role</th>
                <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id} style={{ borderBottom: '1px solid #eee', background: u._id === userId ? '#f9f9f9' : 'white' }}>
                  <td style={{ padding: '8px' }}>{u.name}</td>
                  <td style={{ padding: '8px' }}>{u.email}</td>
                  <td style={{ padding: '8px' }}>
                    <span style={{
                      color: u.role === 'admin' ? '#e67e22' : '#2980b9',
                      fontWeight: u.role === 'admin' ? 'bold' : 'normal',
                      letterSpacing: '1px'
                    }}>{u.role}</span>
                  </td>
                  <td style={{ padding: '8px', display: 'flex', gap: '6px', alignItems: 'center' }}>
                    {u._id === userId ? (
                      <button
                        className={styles.myAccountButton}
                        style={{ padding: '2px 10px', fontSize: '0.95em' }}
                        onClick={() => setIsAccountModalOpen(true)}
                      >
                        My Account
                      </button>
                    ) : (
                      <>
                        <button
                          style={{ marginRight: 8, color: 'white', background: '#e74c3c', border: 'none', borderRadius: 4, padding: '2px 10px', cursor: 'pointer' }}
                          onClick={() => handleAdminDeleteUser(u._id)}
                          title='Delete user'
                        >
                          Delete
                        </button>
                        <button
                          style={{ color: 'white', background: '#2980b9', border: 'none', borderRadius: 4, padding: '2px 10px', cursor: 'pointer' }}
                          onClick={() => handleAdminChangeUserPassword(u._id)}
                        >
                          Change PW
                        </button>
                        <button
                          style={{ color: u.role === 'admin' ? '#e67e22' : '#2980b9', background: '#f6f6f6', border: '1px solid #ccc', borderRadius: 4, padding: '2px 10px', cursor: 'pointer', fontWeight: 'bold' }}
                          onClick={async () => {
                            const newRole = u.role === 'admin' ? 'user' : 'admin';
                            try {
                              const res = await fetch(`${API_BASE}/api/users/${u._id}/role`, {
                                method: 'PUT',
                                headers: {
                                  'Content-Type': 'application/json',
                                  'Authorization': `Bearer ${token}`
                                },
                                body: JSON.stringify({ role: newRole })
                              });
                              if (res.ok) {
                                setUsers(users => users.map(userObj => userObj._id === u._id ? { ...userObj, role: newRole } : userObj));
                                alert(`Role changed to ${newRole} for ${u.name}`);
                              } else {
                                alert('Failed to change role');
                              }
                            } catch (error) {
                              alert('Error occurred while changing role');
                            }
                          }}
                          title={u.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                        >
                          {u.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* My Account Modal*/}
        {isAccountModalOpen && userInfo && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <h2>My Account</h2>
              <div className={styles.modalContent}>
                <div className={styles.userInfoBox} style={{ marginBottom: '1rem', padding: '1rem', background: '#f8f8f8', borderRadius: '8px' }}>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    <li><strong>Name:</strong> {userInfo.name}</li>
                    <li><strong>Email:</strong> {userInfo.email}</li>
                    <li><strong>Role:</strong> {userInfo.role || 'user'}</li>
                    <li><strong>Created:</strong> {new Date(userInfo.created).toLocaleString()}</li>
                    <li><strong>Updated:</strong> {new Date(userInfo.updated).toLocaleString()}</li>
                  </ul>
                  {/* Admin Toggle Button: only show if logged-in user is admin and userInfo.role is admin */}
                  {user && user.role === 'admin' && userInfo.role === 'admin' && (
                    <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                      <button 
                        className={`${styles.button} ${styles.buttonSuccess}`}
                        onClick={handleToggleAdmin}
                        style={{ marginRight: '10px' }}
                      >
                        👑 Remove Admin
                      </button>
                    </div>
                  )}
                  <button className={`${styles.button} ${styles.buttonDanger}`} onClick={handleDeleteAccount}>Delete Account</button>
                  <ChangePasswordForm onChangePassword={handleChangePassword} />
                </div>
              </div>
              <div className={styles.modalActions}>
                <button className={`${styles.button} ${styles.buttonSecondary}`} onClick={() => setIsAccountModalOpen(false)}>Close</button>            
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={styles.profilePage}>
      {/* Profile Header Section */}
      <div className={styles.profileHeader}>
        <img src={formData.bannerUrl} alt="banner" className={styles.profileBanner} />
        <div className={styles.profileHeaderContent}>
          <div className={styles.avatarInfoWrapper}>
            <img className={styles.avatar} src={formData.iconUrl} alt="profile" />
            <div className={styles.profileInfo}>
              <h2 className={styles.profileName}>{formData.name}</h2>
              <p className={styles.profileTitle}>{formData.title}</p>
              <span className={styles.profileLocation}>{formData.location}</span>
              <div className={styles.socialIcons}>
                <span>⚡</span><span>🔥</span><span>💧</span><span>🌱</span><span>🔷</span>
              </div>
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <button className={styles.myAccountButton} onClick={() => setIsAccountModalOpen(true)}>My Account</button>
            <button className={styles.editButton} onClick={openEditModal}>✏️ Edit Profile</button>
          </div>
        </div>
      </div>

      {/* Profile Main Body */}
      <div className={styles.profileBody}>
        <div className={styles.profileMain}>
          <div className={styles.card}>
            <h3>Trainer Summary</h3>
            <p>{formData.summary}</p>
          </div>
          <div className={styles.card}>
            <h3>Favorite Pokémon Types</h3>
            {/* Pokémon types fetched from the Pokémon API */}
            {pokemonTypes.length > 0 && (
              <div>
                {pokemonTypes.map(type => (
                  <span key={type} className={`${styles.tag} ${styles.tagGreen}`}>{type}</span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar with Trainer Details */}
        <div className={styles.profileSidebar}>
          <div className={styles.card}>
            <div className={styles.cardHeader}><h3>Trainer Details</h3></div>
            <ul>
              <li><strong>STARTER POKÉMON:</strong> {formData.details[0]}</li>
              <li><strong>FAVORITE POKÉMON:</strong> {formData.details[1]}</li>
              <li><strong>BADGES EARNED:</strong> {formData.details[2]}</li>
              <li><strong>REGIONS VISITED:</strong> {formData.details[3]}</li>
              <li><strong>TRAINER SINCE:</strong> {formData.details[4]}</li>
              <li><strong>LANGUAGES:</strong> {formData.details[5]}</li>
              <li><strong>GUILD:</strong> {formData.details[6]}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* My Account Modal */}
      {isAccountModalOpen && userInfo && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>My Account</h2>
            <div className={styles.modalContent}>
              <div className={styles.userInfoBox} style={{ marginBottom: '1rem', padding: '1rem', background: '#f8f8f8', borderRadius: '8px' }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li><strong>Name:</strong> {userInfo.name}</li>
                  <li><strong>Email:</strong> {userInfo.email}</li>
                  <li><strong>Role:</strong> {userInfo.role || 'user'}</li>
                  <li><strong>Created:</strong> {new Date(userInfo.created).toLocaleString()}</li>
                  <li><strong>Updated:</strong> {new Date(userInfo.updated).toLocaleString()}</li>
                </ul>
                {/* Admin Toggle Button: only show if logged-in user is admin and userInfo.role is admin */}
                {user && user.role === 'admin' && userInfo.role === 'admin' && (
                  <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                    <button 
                      className={`${styles.button} ${styles.buttonSuccess}`}
                      onClick={handleToggleAdmin}
                      style={{ marginRight: '10px' }}
                    >
                      👑 Remove Admin
                    </button>
                  </div>
                )}
                <button className={`${styles.button} ${styles.buttonDanger}`} onClick={handleDeleteAccount}>Delete Account</button>
                <ChangePasswordForm onChangePassword={handleChangePassword} />
              </div>
            </div>
            <div className={styles.modalActions}>
              <button className={`${styles.button} ${styles.buttonSecondary}`} onClick={() => setIsAccountModalOpen(false)}>Close</button>            
            </div>
          </div>
        </div>
      )}


      {/* Edit Modal for Profile Editing */}
      {isModalOpen && editFormData && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Edit Profile</h2>
            <div className={styles.modalContent}>
              {/* Existing profile edit form */}
              <label>Profile Image URL:
                <input type="text" value={editFormData.iconUrl} onChange={(e) => handleInputChange(e, 'iconUrl')} />
              </label>
              <label>Banner Image URL:
                <input type="text" value={editFormData.bannerUrl} onChange={(e) => handleInputChange(e, 'bannerUrl')} />
              </label>
              <label>Name:
                <input type="text" value={editFormData.name} onChange={(e) => handleInputChange(e, 'name')} />
              </label>
              <label>Title:
                <input type="text" value={editFormData.title} onChange={(e) => handleInputChange(e, 'title')} />
              </label>
              <label>Location:
                <input type="text" value={editFormData.location} onChange={(e) => handleInputChange(e, 'location')} />
              </label>
              <label>Summary:
                <textarea value={editFormData.summary} onChange={(e) => handleInputChange(e, 'summary')} />
              </label>
              <label>Favorite Types (comma separated):
                <input type="text" value={editFormData.types.join(', ')} onChange={(e) => handleInputChange(e, 'types')} />
              </label>
              <label>Starter Pokémon:
                <input type="text" value={editFormData.details[0]} onChange={(e) => handleInputChange(e, 'details', 0)} />
              </label>
              <label>Favorite Pokémon:
                <input type="text" value={editFormData.details[1]} onChange={(e) => handleInputChange(e, 'details', 1)} />
              </label>
              <label>Badges Earned:
                <input type="text" value={editFormData.details[2]} onChange={(e) => handleInputChange(e, 'details', 2)} />
              </label>
              <label>Regions Visited:
                <input type="text" value={editFormData.details[3]} onChange={(e) => handleInputChange(e, 'details', 3)} />
              </label>
              <label>Trainer Since:
                <input type="text" value={editFormData.details[4]} onChange={(e) => handleInputChange(e, 'details', 4)} />
              </label>
              <label>Languages:
                <input type="text" value={editFormData.details[5]} onChange={(e) => handleInputChange(e, 'details', 5)} />
              </label>
              <label>Guild:
                <input type="text" value={editFormData.details[6]} onChange={(e) => handleInputChange(e, 'details', 6)} />
              </label>
            </div>
            <div className={styles.modalActions}>
              <button className={styles.button} onClick={handleSave}>Save</button>
              <button className={`${styles.button} ${styles.buttonSecondary}`} onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Password Change Form Component
function ChangePasswordForm({ onChangePassword }) {
  const [newPassword, setNewPassword] = useState('');
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        if (newPassword.length < 6) {
          alert('New password must be at least 6 characters long.');
          return;
        }
        onChangePassword(newPassword);
        setNewPassword('');
      }}
      style={{ marginTop: '1rem' }}
    >
      <label>
        Change Password:
        <input
          type="password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          placeholder="Enter new password"
        />
      </label>
      <button type="submit" className={styles.button} style={{ marginTop: '0.5rem' }}>
        Change
      </button>
    </form>
  );
}

export default Profile;