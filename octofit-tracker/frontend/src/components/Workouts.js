import React, { useEffect, useState } from 'react';

function Workouts() {
  const [data, setData] = useState([]);

  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const baseUrl = codespace
    ? `https://${codespace}-8000.app.github.dev/api/workouts/`
    : '/api/workouts/';

  useEffect(() => {
    console.log('Fetching Workouts from:', baseUrl);
    fetch(baseUrl)
      .then((res) => res.json())
      .then((json) => {
        console.log('Workouts fetched raw:', json);
        const items = json && json.results ? json.results : json;
        console.log('Workouts used list:', items);
        setData(items || []);
      })
      .catch((err) => console.error('Workouts fetch error:', err));
  }, [baseUrl]);

  return (
    <div className="container mt-4">
      <h2>Workouts</h2>
      <ul>
        {data && data.length ? (
          data.map((w) => <li key={w.id || w.pk || JSON.stringify(w)}>{w.name || w.title || JSON.stringify(w)}</li>)
        ) : (
          <li>No workouts found</li>
        )}
      </ul>
    </div>
  );
}

export default Workouts;
