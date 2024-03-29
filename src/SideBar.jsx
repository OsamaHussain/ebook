import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import logo from "./images/menu.png"
import { Link } from "react-router-dom";
const SideBar = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  return (
    <>
      <div className="navBar" >
        <img src={logo} width="40" onClick={toggleShow} height="30" />
      </div>
      <Offcanvas show={show} onHide={handleClose} scroll={true} backdrop={true}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>EShops</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>
            <Link to={"/users"} >
              <div className="d-grid gap-2 mb-2">
                <Button variant="dark" size="md">
                  Users
                </Button>
              </div>
            </Link>

            <Link to={"/banners"} >
              <div className="d-grid gap-2 mb-2">
                <Button variant="dark" size="md">
                  Banners
                </Button>
              </div>
            </Link>
            <Link to={"/ads"} >
              <div className="d-grid gap-2 mb-2">
                <Button variant="dark" size="md">
                  Ads
                </Button>
              </div>
            </Link>
            <Link to={"/add-user"} >
              <div className="d-grid gap-2 mb-2">
                <Button variant="dark" size="md">
                  Create User
                </Button>
              </div>
            </Link>
            <Link to={"/add-banner"} >
              <div className="d-grid gap-2 mb-2">
                <Button variant="dark" size="md">
                  Create Banner
                </Button>
              </div>
            </Link>

            <Link to={"/add-ad"} >
              <div className="d-grid gap-2 mb-2">
                <Button variant="dark" size="md">
                  Create Ad
                </Button>
              </div>
            </Link>
            <Link to={"/add-category"} >
              <div className="d-grid gap-2 mb-2">
                <Button variant="dark" size="md">
                  Create Category
                </Button>
              </div>
            </Link>

          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default SideBar