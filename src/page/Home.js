import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LoginHeader from '../component/LoginHeader';
import axios from 'axios';

const DDiv = styled.div``
const Div = styled.div`
    margin-top: 100px;
    display: flex;
    justify-content: center; /* 수평 가운데 정렬 */
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
    width: 70%;
  gap: 20px;
`;

const SingleCard = styled(Link)`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 15px;
  width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const Image = styled.img`
  width: 300px;
  height: 400px;
  border-radius: 8px;
`;

const Title = styled.h3`
  margin-top: 10px;
  font-size: 1.5em;
`;

const Description = styled.p`
  color: #333;
`;

const Card = ({ title, description, image }) => {
  return (
    <SingleCard  to={`/page/${title}`} >
      <Image src={image} alt={title} />
      <Title>{title}</Title>
      <Description>{description}</Description>
    </SingleCard>
  );
};

const CardList = () => {
  const [characterData, setCharacterData] = useState([]);
  useEffect(() => {
    axios.get("http://52.79.243.183:8000/readall")
      .then(function (response) {
        setCharacterData(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []); 


  return (
    <DDiv>
        <LoginHeader/>
    <Div>
    <CardContainer>
      {characterData.map((card, index) => (
        <Card
          key={index}
          title={card.name}
          description={card.line}
          image={card.image}
        />
      ))}
    </CardContainer>
    </Div>
    </DDiv>
  );
};

export default CardList;
