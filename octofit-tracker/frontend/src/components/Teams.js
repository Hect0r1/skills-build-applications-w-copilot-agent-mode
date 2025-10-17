import React, { useEffect, useState } from 'react';

function Teams() {
  const [data, setData] = useState([]);

  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const baseUrl = codespace
    ? `https://${codespace}-8000.app.github.dev/api/teams/`
    : '/api/teams/';

  useEffect(() => {
    console.log('Fetching Teams from:', baseUrl);
    fetch(baseUrl)
      .then((res) => res.json())
      .then((json) => {
        console.log('Teams fetched raw:', json);
        const items = json && json.results ? json.results : json;
        console.log('Teams used list:', items);
        setData(items || []);
      })
      .catch((err) => console.error('Teams fetch error:', err));
  }, [baseUrl]);

  return (
    <div className="container mt-4">
      <h2>Teams</h2>
      <ul>
        {data && data.length ? (
          data.map((t) => <li key={t.id || t.pk || JSON.stringify(t)}>{t.name || JSON.stringify(t)}</li>)
        ) : (
          <li>No teams found</li>
        )}
      </ul>
    </div>
  );
}

export default Teams;
