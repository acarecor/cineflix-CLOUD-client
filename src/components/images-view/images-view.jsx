import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Container, Form, Button, ListGroup, Image, Modal, Link } from 'react-bootstrap';

const apiURL = 'http://3.124.4.202';

export const ImageView = () => {
    const [file, setFile] = useState(null);
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [showModal, setShowModal] = useState(false);
  
    useEffect(() => {
        //if (!token) {
          //  return;
         // }
      
          //  Define the function to obtein the list from the s3 bucket
          const fetchImages = async () => {
            try {
              const response = await fetch(`${apiURL}/images`, {
                method: 'GET',
              });
      
              if (response.ok) {
                const data = await response.json();
                setImages(data); 
                console.log(data);// Almacena las imágenes en el estado local
              } else {
                console.error('Error fetching images:', response.statusText);
              }
            } catch (error) {
              console.error('Error fetching images:', error);
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
      
      //const files = event.target.elements.formFile.files[0];
    
        if (!file) {
          console.log('Please select an image to upload.');
          alert('Please select an image to upload.');
          return;
        }
    
  
        const formData = new FormData();
        formData.append('file', file);
    
        const response = await fetch(`${apiURL}/images`, 
        {
          method: 'POST',
          //headers: { 
            //Authorization: `Bearer ${token}` , 
            //'Content-Type': 'multipart/form-data'
          //},
          body: formData,
        });
    
        if (response.ok) {
          const imageData = await response.json();
          console.log("Upload successful", imageData);
           // alert('Image upload successful!');
           reloadPage();
          } else {
            alert('Image upload failed!');
            console.log(event); 
        }
      };

    const handleFileChange = (event) => {
      const selectedFile = event.target.files && event.target.files[0];
      setFile(selectedFile);
    
      const previewURL = selectedFile ? URL.createObjectURL(selectedFile) : null;
      setImagePreview(previewURL);
  }

  const downloadImage = (image) => {
    const link = document.createElement('a');
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
        <Row className="mt-4">
          <Col>
            <h2>Upload Images</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Pick an image to upload:</Form.Label>
                <Form.Control 
                    type="file" 
                    accept="image/*" 
                    name="file"
                    onChange={handleFileChange} />
              </Form.Group>
              <Button variant="primary" type="submit">
                Upload Image
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
         <Link
            href={imagePreview}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 mb-2 ms-2"
        >
            <Button variant="primary">Open Original Image</Button>
        </Link>
        </div>
        )}
        </Row>
        <Row className="mt-4">
          <Col>
            <h2> List of Uploaded Images</h2>
            <ListGroup>
              {images.map((image, index) => (
                <ListGroup.Item key={index}>
                  <Col className="mb-5 mt-2"  md={6} lg={4}>
                  <img
                      src={`data:${image.contentType};base64,${image.content}`}
                      style={{ maxWidth: '50px', cursor: 'pointer' }}
                      thumbnail
                      onClick={() => handleImageClick(image)}
                      />
                  <h4>{image.name}</h4>
                  <Button style={{ cursor: "pointer" }} variant="primary" onClick={() => downloadImage(image)}>Download Image</Button>
                  </Col>
                </ListGroup.Item>
              ))}
              
            </ListGroup>
          </Col>
        </Row> 
        <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedImage && selectedImage.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedImage && (
            <Image
              src={`${apiURL}/images/${selectedImage.name}`}
              alt={selectedImage.name}
              fluid
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </Container>
    )};
  