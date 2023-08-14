import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {Nav} from "react-bootstrap";

const NavBarEx = () => (
    <>
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand className={"text-center"} href="#home">Vending Machine App</Navbar.Brand>
            </Container>
        </Navbar>
    </>
);

export default NavBarEx;
