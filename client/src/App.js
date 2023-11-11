import { useEffect, useState } from 'react';
import ListHeader from './components/ListHeader.js';
import ListItem from './components/ListItem.js';
import Auth from './components/Auth.js';
import { useCookies } from 'react-cookie';
import PageSpinner from './components/PageSpinner.js';

function App() {

  const [cookies, setCookie, removeCookie] = useCookies(null);
  const userEmail = cookies.Email;
  const authToken = cookies.AuthToken;
  const [tasks, setTasks] = useState(null)
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
    setLoading(true)
    const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`) 
    if(response.status === 200) {
      setLoading(false)
    }
    const data = await response.json()
    setTasks(data)
    
    } catch (e) {
      console.log(e)
    }
  }

  
  useEffect(() => {
    getData()
  }, [])

  const sortedTasks = tasks?.sort((a, b) => new Date(a.date) - new Date(b.date))

  if (loading) {
    return <PageSpinner />;
  }



  return (
   <>
   <div className="app">
    {!authToken && <Auth /> }
    {authToken && 
    <>
    <div className="pageHome">
    <ListHeader listName={"My Task List"} getData={getData} />
    <p className='user-email'>Welcome Back {userEmail}</p>
    {sortedTasks?.map((task) => <ListItem key={task.id} getData={getData} task={task} />)}
    </div>
    </> }
    </div>
   </>
  );
}

export default App;
