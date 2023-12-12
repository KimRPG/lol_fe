import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';

const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Checkbox = styled.input`
  margin-top: 5px;
`;

const Img = styled.img`
  width: 300px;
  height: 400px;
  margin-top: 100px;
  display: flex;
  justify-content: center;
`;


const Update = () => {
  const navigate = useNavigate();
  const { index } = useParams();
  const [uploadedImgURL, setUploadedImgURL] = useState("");
  const [character, setCharacter] = useState({
    name: '',
    line: '',
    adAp: false,
    health: 0,
    attack: 0,
    speed: 0,
    rune: '',
  });

  useEffect(() => {
    
    axios.get(`http://52.79.243.183:8080/read/${index}`)
    .then(response => {
      setCharacter(response.data);
    })
    .catch(error => {
      console.error('Error fetching character data: ', error);
    });

  }, []);

  useEffect(() => {
    
    setCharacter(prevCharacter => ({
      ...prevCharacter,
      image: uploadedImgURL,
    }));
  }, [uploadedImgURL]);

  const handleUpdate = async () => {
    try {
      axios.put(`http://52.79.243.183:8080/update/${index}`, character)
      .then(response => {
        alert('Character updated successfully');
        navigate('/');
      })
      .catch(error => {
        alert('Error updating character: ' + error);
      });

    } catch (error) {
      alert('Error updating character: ' + error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setCharacter({
      ...character,
      [name]: newValue,
    });
  };
  const uploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post("http://52.79.243.183:8080/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

        setUploadedImgURL(response.data); // 이미지 업로드 후 URL 설정
      } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleImageSelect = async (event) => {
    if (event && event.target) { // 이벤트 객체와 target이 유효한지 확인
      const file = event.target.files[0]; // 파일 가져오기
  
      if (file) {
        await uploadImage(file);
      }

    }
  };



  return (
    <Container>
      <Title>Update  Character</Title>
      <Form>
        <Label htmlFor="name">Name:</Label>
        <Input type="text" id="name" name="name" value={character.name} disabled />

        <Label htmlFor="image" >Image:</Label>
        <input type="file" name="file" onChange={handleImageSelect} />
        <Img src={character.image} alt="Uploaded"  />

        <Label htmlFor="line">Line:</Label>
        <Input type="text" id="line" name="line" value={character.line} onChange={handleChange} />

        <Label htmlFor="adAp">AD/AP:</Label>
        <Checkbox type="checkbox" id="adAp" name="adAp" checked={character.adAp} onChange={handleChange} />

        <Label htmlFor="health">Health:</Label>
        <Input type="number" id="health" name="health" value={character.health} onChange={handleChange} />

        <Label htmlFor="attack">Attack:</Label>
        <Input type="number" id="attack" name="attack" value={character.attack} onChange={handleChange} />

        <Label htmlFor="speed">Speed:</Label>
        <Input type="number" id="speed" name="speed" value={character.speed} onChange={handleChange} />

        <Label htmlFor="rune">Rune:</Label>
        <Input type="text" id="rune" name="rune" value={character.rune} onChange={handleChange} />
      </Form>

      <button onClick={handleUpdate}>Update</button>

    </Container>
  );
};

export default Update;
