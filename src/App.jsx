import './App.css';
import GithubUserUseLocalStorage from './components/GithubUserUseLocalStorage';
// import GithubUser from './components/GithubUser';

function App() {
  // fetch(`https://api.github.com/users/julyk9`)
  //   .then((res) => res.json())
  //   .then(console.log)
  //   .catch(console.error);

  async function requestGithubUser() {
    try {
      const response = await fetch(`https://api.github.com/users/julyk9`);
      const userData = await response.json();
      console.log(userData);
    } catch (error) {
      console.log(error);
    }
  }

  requestGithubUser();

  return <GithubUserUseLocalStorage login="julyk9" />;
}

export default App;
