import { useState } from "react";
import { useCookies } from 'react-cookie';


const Modal = ({ mode , setShowModal, getData, task }) => {

  const [cookies, setCookie, removeCookie] = useCookies(null);
  const editMode = mode === 'edit' ? true : false;

  const [data, setData] = useState({
    user_email: editMode ? task.user_email : cookies.Email,
    title: editMode ? task.title : null,
    progress: editMode ? Number(task.progress) : 50,
    date: editMode ? task.date : new Date() 
  })

  const postData = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
      if (response.status === 200) {
        console.log('data', response)
        setShowModal(false)
        getData()
      }
      console.log(data)
    } catch (e) {
      console.log(e)
    } finally {
      setShowModal(false)
    }
  }

  const editData = async (e) => {
      e.preventDefault()

      try {
        const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`, {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data)
        })
        if (response.status === 200) {
          console.log('data', response)
          setShowModal(false)
          getData()
        }
        console.log(data)
      }
      catch (e) {
        console.log(e)
      }
      finally {
        setShowModal(false)
      }
  }



  const handleChange = (e) => {
    console.log(e.target.value)
    const { name, value } = e.target;

    setData( data => ({
      ...data,
      [name]: value
  }))
  }



  return (
    <>
   <div className="overlay">
    <div className="modal">
      <div className="form-title-container"> 
       <h3> Let's {mode} you task</h3>
       <button className="close-modal" onClick={() => setShowModal(false)}>X</button>
      </div>

      <form className="form">
      <input 
      name="title" 
      maxLength={30} 
      placeholder="Your task goes here"
      value={data.title}
      onChange={handleChange}
       />
      <br />
      <label> Drag to select your current progress </label>
      <input 
      type="range"
      min="0"
      max="100"
      name="progress"
      value={data.progress}
      onChange={handleChange}
      /> 
      <input 
      type="submit" 
      value="Save" 
      className={mode} 
      onClick={editMode ? editData : postData}
      />
      </form>

    </div>
   </div>
   </>
  );
}

export default Modal;
