import React, { useEffect, useState } from 'react';

function Activities() {
  const [data, setData] = useState([]);

  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const baseUrl = codespace
    ? `https://${codespace}-8000.app.github.dev/api/activities/`
    : '/api/activities/';

  useEffect(() => {
    console.log('Fetching Activities from:', baseUrl);
    fetch(baseUrl)
      .then((res) => res.json())
      .then((json) => {
        console.log('Activities fetched raw:', json);
        const items = json && json.results ? json.results : json;
        console.log('Activities used list:', items);
        setData(items || []);
      })
      .catch((err) => console.error('Activities fetch error:', err));
  }, [baseUrl]);

  return (
    <div className="container mt-4">
      <h2>Activities</h2>
      <ul>
        {data && data.length ? (
          data.map((a) => <li key={a.id || a.pk || JSON.stringify(a)}>{a.name || a.title || JSON.stringify(a)}</li>)
        ) : (
          <li>No activities found</li>
        )}
      </ul>
    </div>
  );
}

export default Activities;
