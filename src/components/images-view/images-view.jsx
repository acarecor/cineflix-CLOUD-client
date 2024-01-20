import React, { useState, useEffect } from "react";
import { FaDownload } from "react-icons/fa";
import {
  Row,
  Col,
  Container,
  Form,
  Button,
  ListGroup,
  Image,
  Modal,
  OverlayTrigger,
  Tooltip,
  Card,
} from "react-bootstrap";

const apiURL = 'http://CF-MovieApp-LoadBalancer-913807924.eu-central-1.elb.amazonaws.com';

export const ImageView = () => {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  useEffect(()=> {
     // fetch List of Images from s3 Bucket
    const fetchImages = async () => {
    try {
      const response = await fetch(`${apiURL}/images`, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        setImages(data);
        console.log("Images after fetch:", data);
      } else {
        console.error("Error fetching images:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };
    // Call the function to optain images list from s3 bucket
    fetchImages();
  }, []);
  


   const reloadPage = () => {
    window.location.reload();
  };

  //upload images

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      console.log("Please select an image to upload.");
      alert("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

   try{
     const response = await fetch(`${apiURL}/images`, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const imageData = await response.json();
      console.log("Upload successful", imageData);
      // alert('Image upload successful!');
     reloadPage();
     console.log("Images updated successfully");
     } else {
      alert("Image upload failed!");
      console.log(event);
     }
   } catch (error) {
    console.error("Error uploading image:", error);
    alert("An error occurred while uploading the image.");
   }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files && event.target.files[0];
    setFile(selectedFile);

    const previewURL = selectedFile ? URL.createObjectURL(selectedFile) : null;
    setImagePreview(previewURL);
  };

  const downloadImage = (image) => {
    const link = document.createElement("a");
    link.href = `${apiURL}/images/${image.name}`;
    link.download = image.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImageClick = (image) => {
    setShowModal(true);
    setSelectedImage(image);
  };
  const closeModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };


  return (
    <Container>
      <Row className="mt-5 justify-content-center">
      <Card>
        <Card.Body className="mb-3">
          <Row className="mt-4 mx-2">
            <Col>
              <h2>Upload an Image</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Pick an image to upload:</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    name="file"
                    onChange={handleFileChange}
                    placeholder="Select image"
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Upload 
                </Button>
              </Form>
            </Col>
          </Row>
          <Row>
            {imagePreview && (
              <div className="d-flex justify-content-center mt-1">
                <Image
                  src={imagePreview}
                  alt="Uploaded Preview"
                  className="mt-2 mb-2 ms-2"
                  thumbnail
                />
                <a
                  href={imagePreview}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 mb-2 ms-2"
                >
                  <Button variant="primary">Open Original Image</Button>
                </a>
              </div>
            )}
          </Row>
        </Card.Body>
      </Card>
      </Row>
      <Row className="mt-4">
        <Col>
          <h2 className="d-flex justify-content-center mt-1">
            Image Collection
          </h2>
          <Row>
            {images.map((image, index) => (
              <Col
                key={index}
                className="mb-2"
                style={{ margin: "0 10px" }}
                xs={6}
                sm={4}
                md={3}
                lg={2}
                xl={2}
              >
                <Card style={{ width: "10rem" }}>
                  <Card.Img
                    variant="top"
                    src={`data:${image.contentType};base64,${image.content}`}
                    style={{ objectFit: "cover", height: "150px", cursor: "pointer" }}
                    className="card-img"
                    onClick={() => handleImageClick(image)}
                  />
                  <Card.Body className="d-flex justify-content-between align-items-center">
                    <Card.Text style={{ fontSize: "12px" }}>
                      {image.name}
                    </Card.Text>
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id={`tooltip-top`}>Download image</Tooltip>
                      }
                    >
                      <Button
                        style={{ cursor: "pointer", color: "#fff" }}
                        variant="secundary"
                        onClick={() => downloadImage(image)}
                      >
                        <FaDownload />
                      </Button>
                    </OverlayTrigger>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header
          closeButton
          className="d-flex justify-content-center mt-1"
        >
          <Modal.Title>{selectedImage && selectedImage.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center">
          {selectedImage && (
            <Image
              src={`${apiURL}/images/${selectedImage.name}`}
              alt={selectedImage.name}
              fluid
            />
          )}
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id={`tooltip-top`}>Dowload image</Tooltip>}
          >
            <Button
              variant="secundary"
              style={{ cursor: "pointer" }}
              onClick={() => downloadImage(image)}
            >
              <FaDownload />
            </Button>
          </OverlayTrigger>
          <Button variant="primary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
