import { Spinner } from 'reactstrap';
import LoadingImage from '../assets/Loading.jpg'; // Path: client/p

const PageSpinner = function () {
  return (
    <div className="loading">
      <Spinner animation="border" color="light" size="sm" />
      <img src={LoadingImage} alt="loading" />
      <p>Loading...</p>
    </div>
  );
};

export default PageSpinner;