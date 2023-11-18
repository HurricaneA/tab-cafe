import { Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export const NavigationBar = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark" className="bg-body-tertiary">
      <Container>
        <LinkContainer to={"/"}>
          <Navbar.Brand>Tab Cafe</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to={"/items"}>
              <Nav.Link>Items</Nav.Link>
            </LinkContainer>
            <LinkContainer to={"/orders"}>
              <Nav.Link>Orders</Nav.Link>
            </LinkContainer>
            <LinkContainer to={"/stats"}>
              <Nav.Link>Stats</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
