import React, {useEffect, useState} from 'react'
import List from "./List";

function DiscoverPage({ user }) {
  const [data, setData] = useState({})

  useEffect(() => {
    fetch(`https://api.unsplash.com/search/photos?page=1&per_page=100&query=random&client_id=${process.env.REACT_APP_API_KEY}`,)
    .then((res) => res.json())
    .then((data) => setData(data.results))
  }, [])

  return (
    <div className='post-page'>
      <List data={data} user={user} />
    </div>
  )
}

export default DiscoverPage;