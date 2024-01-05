import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Container, Form, Button, ListGroup } from 'react-bootstrap';


export const ImageView = ({token}) => {
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
  
    useEffect(() => {
        if (!token) {
            return;
          }
      
          // Define la función para obtener la lista de imágenes
          const fetchImages = async () => {
            try {
              const response = await fetch('http://3.67.92.151/images', {
                method: 'GET',
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
              });
      
              if (response.ok) {
                const data = await response.json();
                setImages(data); // Almacena las imágenes en el estado local
              } else {
                console.error('Error fetching images:', response.statusText);
              }
            } catch (error) {
              console.error('Error fetching images:', error);
            }
          };
      
          // Llama a la función para obtener la lista de imágenes
          fetchImages();
        }, [token]);
   
  
    const handleImageClick = (image) => {
        setSelectedImage(image);
        };
  
    const handleImageUpload = async (event) => {
      event.preventDefault();
      
      const imageFile = event.target.elements.formFile.files[0];
    
        if (!imageFile) {
          alert("Please select an image to upload.");
          return;
        }
    
        try {
          const formData = new FormData();
          formData.append("image", imageFile);
    
          const response = await fetch("http://3.67.92.151/images", formData, 
          {
            method: "POST",
            headers: { 
              Authorization: `Bearer ${token}` ,
              'Content-Type': 'multipart/form-data' },
            body: formData,
          });
    
          if (response.ok) {
            alert("Image upload successful!");
            
          } else {
            alert("Image upload failed!");
            
          }
        } catch (error) {
          console.error("Error uploading image:", error);
        
        }
      };
     

    const renderSelectedImage = () => {
        if (selectedImage) {
          return (
            <div>
              <h3>Selected Image</h3>
              <img
                src={`http://18.192.182.97/images/${selectedImage.objectKey}`} // Ajusta la URL según tu lógica de la API
                alt={selectedImage.objectKey}
              />
            </div>
          );
        }
        return null;
    };

    
  
    return (
      <Container>
        <Row className="mt-4">
          <Col>
            <h2>Upload Images</h2>
            <Form onSubmit={handleImageUpload}>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Pick an image to upload:</Form.Label>
                <Form.Control 
                    type="file" 
                    accept="image/*" 
                    name="formFile"
                    onChange={(e) => console.log(e.target.files[0])} />
              </Form.Group>
              <Button variant="primary" type="submit">
                Upload Image
              </Button>
            </Form>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <h2> List of Uploaded Images</h2>
            <ListGroup>
              {images.map((image) => (
                <ListGroup.Item key={image.objectKey}
                onClick={()=> handleImageClick(image)}>
                  {image.objectKey}
                </ListGroup.Item>
              ))}
            </ListGroup>
            {renderSelectedImage()}
          </Col>
        </Row>
       
      </Container>
    );
  };
  