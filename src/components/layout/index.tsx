import * as React from "react";
import { Container } from "react-bootstrap";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container color="white" className="center-div" fluid>
      {children}
    </Container>
  );
}
