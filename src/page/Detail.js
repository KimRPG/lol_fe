// Detail.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin: 20px;
`;

const CharacterInfo = styled.div`
  text-align: center;
`;

const Image = styled.img`
  width: 300px;
  height: 400px;
  border-radius: 8px;
  background-color: aliceblue;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Detail = () => {
  const [data, setData] = useState({});
  const { index } = useParams();
  const navigate = useNavigate();
  const nav = async()=>{
    navigate(`/update/${index}`)
  }

  const handleDelete = async () => {
    try {
      axios.delete(`http://52.79.243.183:8080/delete/${index}`)
      .then(response => {
        alert('Character deleted successfully');
        navigate('/');
      })
      .catch(error => {
        alert('Error deleting character: ' + error);
      });


    } catch (error) {
      alert('Error deleting character: ' + error);
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://52.79.243.183:8080/read/${index}`);
        setData(response.data);
      
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <DetailContainer>
    <CharacterInfo>
    {/* 이미지 포함한 정보 */}
    <h2>{data.name}</h2>
    <Image src={data.image} alt="Character" />
    <p>Line: {data.line}</p>
    <p>AdAp: {data.adAp ? 'AD' : 'AP'}</p>
    {/* 필요한 정보들을 모두 표시 */}
    <p>Health: {data.health}</p>
    <p>Attack: {data.attack}</p>
    <p>Speed: {data.speed}</p>
    <p>Rune: {data.rune}</p>
  </CharacterInfo>
  <button onClick={nav}>Update</button>

  <button onClick={handleDelete}>Delete</button>
  </DetailContainer>
  );
  
};

export default Detail;

