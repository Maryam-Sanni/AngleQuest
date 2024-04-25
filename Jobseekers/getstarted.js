import React, { useState } from 'react';
import Top from '../components/top';

const TextBlock = ({ text }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 6,
        marginTop: 10,
        marginBottom: 5,
        maxWidth: '100%',
        fontSize: 16,
        borderRadius: 3,
        backgroundColor: isHovered ? '#A1be95' : '#dbeed4', 
        color: '#f8faf8',
        width: 300,
        height: 300,
        cursor: 'pointer',
        boxShadow: '0 0 5px #666', // Shadow effect
        marginRight: 10, // Spacing between text blocks
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div style={{ color: '#849c7a', textAlign: 'center' }}>{text}</div>
    </div>
  );
};

function MyComponent() {
  const textBlocks = [
    "Do you have an upcoming Interview and would like an expert to prepare you by conducting a thorough interview on you?",
    "Do you want to get Interviewed by an expert to enter the list of pre-vetted candidates for recruiters?",
  ];

  return (
    <div>
      <Top />
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: 'white',
          backgroundSize: 'cover',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <div style={{ fontWeight: "bold", fontSize: 24, color: "#206C00", marginBottom: '15px' }}>Get Started</div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {textBlocks.map((text, index) => (
            <TextBlock key={index} text={text} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyComponent;