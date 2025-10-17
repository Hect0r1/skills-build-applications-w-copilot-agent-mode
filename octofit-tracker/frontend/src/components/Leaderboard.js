import React, { useEffect, useState } from 'react';

function Leaderboard() {
  const [data, setData] = useState([]);

  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const baseUrl = codespace
    ? `https://${codespace}-8000.app.github.dev/api/leaderboard/`
    : '/api/leaderboard/';

  useEffect(() => {
    console.log('Fetching Leaderboard from:', baseUrl);
    fetch(baseUrl)
      .then((res) => res.json())
      .then((json) => {
        console.log('Leaderboard fetched raw:', json);
        const items = json && json.results ? json.results : json;
        console.log('Leaderboard used list:', items);
        setData(items || []);
      })
      .catch((err) => console.error('Leaderboard fetch error:', err));
  }, [baseUrl]);

  return (
    <div className="container mt-4">
      <h2>Leaderboard</h2>
      <ol>
        {data && data.length ? (
          data.map((u) => <li key={u.id || u.pk || JSON.stringify(u)}>{u.username || u.name || JSON.stringify(u)}</li>)
        ) : (
          <li>No leaderboard data</li>
        )}
      </ol>
    </div>
  );
}

export default Leaderboard;
