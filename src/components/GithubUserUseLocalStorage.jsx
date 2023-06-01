import { useEffect, useState } from 'react';

const loadJSON = (key) => {
  key && JSON.parse(localStorage.getItem(key));
};

const saveJSON = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// eslint-disable-next-line react/prop-types
const GithubUserUseLocalStorage = ({ login }) => {
  const [data, setData] = useState(loadJSON(`user:${login}`));
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  // 첫번째 훅: data를 로컬스토리지에 저장
  useEffect(() => {
    // data가 없거나 기존 data와 같은 경우 얼리 리턴으로 분기 처리
    if (!data) return;
    if (data.login === login) return;

    const { name, avatar_url, location } = data;

    saveJSON(`user:${login}`, {
      name,
      login,
      avatar_url,
      location,
    });
  }, [data]);

  // 두번째 훅: login 정보를 통해 사용자 정보 요청 data fetching
  useEffect(() => {
    // login 정보가 없거나, data가 있는데 기존 login 정보와 같으면 요청할 필요 없도록 얼리 리턴
    if (!login) return;
    if (data && data.login === login) return;

    setLoading(true);

    fetch(`https://api.github.com/users/${login}`)
      .then((res) => res.json())
      .then(setData)
      .then(() => setLoading(false))
      .catch(setError);
  }, [login]);

  if (loading) return <h1>Loading...</h1>;
  if (error) {
    return <pre>{JSON.stringify(error, null, 2)}</pre>;
  }
  if (!data) return null;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <img
        src={data.avatar_url}
        alt={data.login}
        style={{ width: 200, borderRadius: '50%' }}
      />
      <div>
        <h1>{data.login}</h1>
        {data.name && <p>{data.name}</p>}
        {data.location && <p>{data.location}</p>}
      </div>
    </div>
  );
};

export default GithubUserUseLocalStorage;
