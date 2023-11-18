import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { ItemType, ItemsInterface } from "../../interfaces";
import axios from "axios";
import { baseUrl } from "../../util/constants";

export default function EditItem({
  show,
  setShow,
  itemToUpdate,
}: {
  show: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setShow: React.Dispatch<React.SetStateAction<any>>;
  itemToUpdate: ItemsInterface | undefined;
}) {
  const [fields, setFields] = useState<{
    id: number;
    name: string;
    type: ItemType;
    price: number;
  }>();

  useEffect(() => {
    setFields({
      id: itemToUpdate?.id ?? 0,
      name: itemToUpdate?.name ?? "",
      type: itemToUpdate?.type ?? "snacks",
      price: itemToUpdate?.price ?? 0,
    });
  }, [itemToUpdate]);

  const updateFields = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFields((currentFormData: any) => {
      const nextFormData = {
        ...currentFormData,
        [name]: value,
      };
      console.log(nextFormData);
      return nextFormData;
    });
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleSubmit = () => {
    console.log(fields);

    if (fields?.id) {
      axios
        .patch(`${baseUrl}/items/${fields.id}`, {
          name: fields.name,
          price: Number(fields.price),
          type: fields.type,
        })
        .then((result) => {
          if (result.status !== 201) {
            alert("Cannot update Item");
          }
          setShow(false);
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Make your changes!!!
          <br />
          <br />
          <Form.Control
            placeholder="Name"
            type="text"
            required
            defaultValue={itemToUpdate?.name}
            onChange={(e) => updateFields(e)}
            name="name"
          />
          <br />
          <Form.Control
            placeholder="Name"
            type="number"
            required
            defaultValue={itemToUpdate?.price}
            onChange={(e) => updateFields(e)}
            name="price"
          />
          <br />
          <Form.Select
            placeholder="type"
            defaultValue={itemToUpdate?.type}
            onChange={(e) => updateFields(e)}
            required
            name="type"
          >
            <option value="snacks">Snacks</option>
            <option value="specials">Special</option>
            <option value="beverages">Beverages</option>
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
