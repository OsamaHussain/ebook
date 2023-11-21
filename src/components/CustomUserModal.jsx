import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useReducer, useState, useEffect } from "react"
import { reducer, removeEmptyValuesFromObject } from "./../utils/Global"
const CustomUserModal = ({ onHide = () => { }, show, handleDelete = () => { }, handleUpdate = () => { }, forEdit, forDelete, item, useDelete, collectionName = "" }) => {

  const initialState = {
    displayName: "",
    phoneNumber: "",
    providerId: "",
    role: "",
  }

  const [state, dispatch] = useReducer(reducer, initialState)
  const [isDisabled, setIsDisabled] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState({})
  const handleInputChange = (e) => {
    return dispatch({
      field: e.target.name,
      payload: e.target.value
    })
  }
  const handleFormatData = () => {
    const formattedData = removeEmptyValuesFromObject({...state})
    setData(formattedData)
  }
  useEffect(() => {
    const { displayName, phoneNumber, providerId, role } = state
    if (displayName || phoneNumber || providerId || role) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
    handleFormatData()
  }, [state])
  useEffect(()=>{
    setIsLoading(false)
  },[])
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
          Delete {item["displayName"]} Permenently!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {forDelete && <div className="d-flex align-items-center justify-content-center">
          <Button variant="dark" className="me-3" onClick={onHide}>Close</Button>
          <Button variant="danger" onClick={() => {
            handleDelete(item["displayName"]);
            collectionName && useDelete(item?.id, collectionName)
            onHide()
          }}>Delete</Button>
        </div>}
        {forEdit &&
          <div>
            <div>
              <Form>
                <Form.Group className="mb-3" controlId="ControlInput1">
                  <Form.Label>Name</Form.Label>
                  <Form.Control onChange={(e) => {
                    handleInputChange(e)
                  }} name="displayName" type="text" placeholder="Name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="ControlInput2">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control onChange={(e) => {
                    handleInputChange(e)
                  }} name="phoneNumber" type="tel" placeholder="+11234567890" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="ControlInput3">
                  <Form.Label>Provider</Form.Label>
                  <Form.Select onChange={(e) => {
                    handleInputChange(e)
                  }} name="providerId" aria-label="Default select">
                    <option value="">Select Provider</option>
                    <option value="google">Google</option>
                    <option value="firebase">Firebase</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="ControlInput4">
                  <Form.Label>Role</Form.Label>
                  <Form.Select name="role" onChange={(e) => {
                    handleInputChange(e)
                  }} aria-label="Default select ">
                    <option value="">Select Role</option>
                    <option value="merchant">Merchant</option>
                    <option value="user">User</option>
                  </Form.Select>
                </Form.Group>
              </Form>
            </div>
            <div className="d-flex align-items-center justify-content-center">
              <Button variant="dark" className="me-3" onClick={onHide}>Close</Button>
              <Button variant="danger" disabled={isDisabled} onClick={() => {
            setIsLoading(true)
            setIsDisabled(true)
            handleUpdate(item["id"], data)
            setIsLoading(false)
               !isLoading? onHide():""
            console.log("state==>",state)
              }}>{isLoading ? "Updating..." : "Update"}</Button>
            </div>
          </div>
        }
      </Modal.Body>
    </Modal>
  );
}
export default CustomUserModal;