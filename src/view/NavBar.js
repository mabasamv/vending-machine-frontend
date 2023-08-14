import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const NavBarEx = () => (
    <>
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand className={"text-center"} href="#home">Vending Machine</Navbar.Brand>
            </Container>
        </Navbar>
    </>
);

export default NavBarEx;
