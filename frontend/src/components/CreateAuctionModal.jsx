import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import styles from "../styles/CreateAuction.Module.css"; // Assurez-vous que le chemin est correct

const CreateAuctionModal = ({ show, onClose, onConfirm }) => {
  const [auctionData, setAuctionData] = useState({
    title: "",
    startingBid: "",
    endTime: "",
    imageUrl: "",
    description: "",
  });

  const handleChange = (e) => {
    setAuctionData({
      ...auctionData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Modal show={show} onHide={onClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton className={styles.modalHeader}>
        <Modal.Title>Create Auction</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={auctionData.title}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formStartingBid">
            <Form.Label>Starting Bid</Form.Label>
            <Form.Control
              type="number"
              name="startingBid"
              min={0}
              value={auctionData.startingBid}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formEndTime">
            <Form.Label>End Time</Form.Label>
            <Form.Control
              type="datetime-local"
              name="endTime"
              value={auctionData.endTime}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formImageUrl">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              name="imageUrl"
              value={auctionData.imageUrl}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              rows={3}
              value={auctionData.description}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => onConfirm(auctionData)}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateAuctionModal;
