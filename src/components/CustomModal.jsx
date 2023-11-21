import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const CustomModal = ({ onHide = () => { }, show, handleDelete, item, useDelete, collectionName = "" }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Delete {item?.name} Permenently!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex align-items-center justify-content-center">
          <Button variant="dark" className="me-3" onClick={onHide}>Close</Button>
          <Button variant="danger" onClick={() => {
            handleDelete(item?.name);
            collectionName && useDelete(item?.id, collectionName)
            onHide()
          }}>Delete</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
export default CustomModal;