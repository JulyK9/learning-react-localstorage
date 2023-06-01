import { useEffect, useState } from 'react';

// eslint-disable-next-line react/prop-types
const GithubUser = ({ login }) => {
  const [data, setData] = useState();

  useEffect(() => {
    if (!login) {
      return;
    }

    fetch(`https://api.github.com/users/${login}`)
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, [login]);

  if (data) return <div>{JSON.stringify(data)}</div>;

  return null;
};

export default GithubUser;
