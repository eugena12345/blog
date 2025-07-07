import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #6c5ce7;
  color: #ffffff;
  padding: 10px;
  text-align: center;

  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  box-sizing: border-box;
`;

const BlogName = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Year = styled.div`
  font-size: 14px;
  margin-bottom: 15px;
`;

const ContactsBlock = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
`;

const ContactLink = styled.a`
  color: #ffffff;
  text-decoration: none;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    color: #dfe6e9;
  }
`;

const WeatherWidget = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
`;

const Footer = () => {
  const [weatherInfo, setWeatherInfo] = useState({
    city: '',
    temperature: '',
    description: '',
  });
  const currentYear = new Date().getFullYear();
  const getWeather = async () => {
    try {
      await fetch(
        'https://api.openweathermap.org/data/2.5/weather?q=Moscow&appid=410f6702e643a88cd6a2fd4dcfb92d98&lang=ru&units=metric'
      )
        .then((res) => res.json())
        .then((data) => {
          setWeatherInfo({
            city: data.name,
            temperature: data.main.temp,
            description: data.weather[0].description,
          });
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <FooterContainer>
      <BlogName>My Blog</BlogName>
      <Year>{currentYear}</Year>
      <ContactsBlock>
        <ContactLink
          href="https://vk.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          ВКонтакте
        </ContactLink>
        <ContactLink
          href="https://t.me"
          target="_blank"
          rel="noopener noreferrer"
        >
          Telegram
        </ContactLink>
        <ContactLink href="mailto:info@example.com">Email</ContactLink>
        <ContactLink href="tel:+71234567890">+7 (123) 456-78-90</ContactLink>
      </ContactsBlock>

      {weatherInfo.city !== '' && (
        <WeatherWidget>
          <span>Погода</span>
          <p>
            {new Date().toLocaleString('ru', { day: 'numeric', month: 'long' })}
          </p>
          <div>{`${weatherInfo.city}, ${weatherInfo.temperature} °C ${weatherInfo.description}`}</div>
        </WeatherWidget>
      )}
    </FooterContainer>
  );
};

export default Footer;
