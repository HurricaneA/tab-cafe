import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

export default function AddItem() {
  const baseURL = "https://p01--nestjs--dxhvkdzpb8bz.code.run";

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity()) {
      const itemName = event.target.itemName.value;
      const itemType = event.target.itemType.value;
      const itemPrice = event.target.itemPrice.value;

      axios
        .post(`${baseURL}/items`, {
          name: itemName,
          type: itemType,
          price: Number(itemPrice),
        })
        .then((result) => {})
        .catch((err) => {
          alert(err);
        });

      setValidated(true);
    }
  };

  return (
    <Row>
      <Col>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="4">
              <b>New Item</b>
            </Form.Label>
            <Col sm="8">
              <Form.Control
                placeholder="Name"
                type="text"
                required
                name="itemName"
              />
              <Form.Select placeholder="type" required name="itemType">
                <option value="snacks">Snacks</option>
                <option value="specials">Special</option>
                <option value="beverages">Beverages</option>
              </Form.Select>
              <Form.Control
                placeholder="price"
                type="number"
                required
                name="itemPrice"
              />
              <br />
              <Button variant="primary" type="submit">
                Add to list
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Col>
    </Row>
  );
}
