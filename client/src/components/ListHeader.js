import { useState } from "react";
import Modal from "./Modal";
import { useCookies } from 'react-cookie';	

const ListHeader = ({ listName }) => {

    const [cookies, setCookie, removeCookie] = useCookies(null);
    const [showModal, setShowModal] = useState(false)

    const singOut = () => {
        removeCookie('AuthToken');
        removeCookie('Email');
        window.location.reload();
    }

  return (
    <>
    <div className="list-header">
     <h1>{listName} 🖋️📋🗄️✔️✅</h1>
     <div className="button-container">
        <button className="create" onClick={() => setShowModal(true)}>Add new</button>
        <button className="signout" onClick={singOut}>Sign out</button>
     </div>
      { showModal && <Modal mode={'create'} setShowModal={setShowModal} />}
     </div>
    </>
  );
}

export default ListHeader;
