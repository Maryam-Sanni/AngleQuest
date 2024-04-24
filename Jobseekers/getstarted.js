import React, { useState } from 'react';

const TextBlock = ({ text }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    // Perform action when clicked
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
        backgroundColor: isHovered ? '#A1be95' : '#dbeed4', // Transparent background
        color: '#f8faf8',
        width: 500,
        height: 60,
        cursor: 'pointer',
        boxShadow: '0 0 5px #f8faf8'
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
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'white',
        backgroundSize: 'cover',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          padding: '20px',
        }}
      >
        {textBlocks.map((text, index) => (
          <TextBlock key={index} text={text} />
        ))}
      </div>
    </div>
  );
}

export default MyComponent;
