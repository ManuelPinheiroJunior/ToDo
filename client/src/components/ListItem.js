import { useState } from "react";
import TickIcon from "./TickIcon";
import Modal from "./Modal";
import ProgressBar from "./ProgressBar";
import { Tooltip } from "reactstrap";


const ListItem = ({ task, getData }) => {

  const [showModal, setShowModal] = useState(false)

  const deleteItem = async () => {
    try {

      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
      })
      if (response.status === 200) {
        console.log('data', response)
        getData()
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
   <>
   <li className="list-item">
    <div className="info-container">
      <TickIcon progress={task.progress}/>
      <p className="task-title">{task.title}</p>
      <ProgressBar progress={task.progress} />
    </div>

    <div className="button-container">
      <button className="edit" onClick={() => setShowModal(true)}>Edit</button>
      <button className="delete"  onClick={deleteItem}>Delete</button>
    </div>
    {showModal && <Modal mode={'edit'} setShowModal={setShowModal} getData={getData} task={task} />}
    </li>
   </>
  );
}

export default ListItem;
