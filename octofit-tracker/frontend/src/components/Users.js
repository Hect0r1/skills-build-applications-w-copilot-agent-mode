import React, { useEffect, useState } from 'react';

function Users() {
  const [data, setData] = useState([]);

  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const baseUrl = codespace
    ? `https://${codespace}-8000.app.github.dev/api/users/`
    : '/api/users/';

  useEffect(() => {
    console.log('Fetching Users from:', baseUrl);
    fetch(baseUrl)
      .then((res) => res.json())
      .then((json) => {
        console.log('Users fetched raw:', json);
        const items = json && json.results ? json.results : json;
        console.log('Users used list:', items);
        setData(items || []);
      })
      .catch((err) => console.error('Users fetch error:', err));
  }, [baseUrl]);

  return (
    <div className="container mt-4">
      <h2>Users</h2>
      <ul>
        {data && data.length ? (
          data.map((u) => <li key={u.id || u.pk || JSON.stringify(u)}>{u.username || u.email || JSON.stringify(u)}</li>)
        ) : (
          <li>No users found</li>
        )}
      </ul>
    </div>
  );
}

export default Users;
