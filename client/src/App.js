import { useEffect, useState } from 'react';
import ListHeader from './components/ListHeader.js';
import ListItem from './components/ListItem.js';
import Auth from './components/Auth.js';
import { useCookies } from 'react-cookie';

function App() {

  const [cookies, setCookie, removeCookie] = useCookies(null);
  const userEmail = cookies.Email;
  const authToken = cookies.AuthToken;
  const [tasks, setTasks] = useState(null)

  const getData = async () => {
    try {
    const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`) 
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



  return (
   <>
   <div className="app">
    {!authToken && <Auth /> }
    {authToken && 
    <>
    <ListHeader listName={"My Task List"} getData={getData} />
    <p className='user-email'>Welcome Back {userEmail}</p>
    {sortedTasks?.map((task) => <ListItem key={task.id} getData={getData} task={task} />)}
    </> }
    </div>
   </>
  );
}

export default App;
