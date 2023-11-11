import { Spinner } from 'reactstrap';



const PageSpinner = function () {
    return (
    <>
    <div className="loading">
    <Spinner animation="border" color="light"   size="sm">
    Loading...
    </Spinner>
    </div>
    </>
    );
    }

export default PageSpinner;