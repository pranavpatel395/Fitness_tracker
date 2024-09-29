import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import styled from 'styled-components';

// Styled components for the contact form
const FormContainer = styled.div`
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: ${({ theme }) => theme.primary};
`;

const InputField = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  border-radius: 5px;
  font-size: 16px;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    outline: none;
  }
`;

const Textarea = styled.textarea`
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  border-radius: 5px;
  font-size: 16px;
  resize: vertical;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    outline: none;
  }
`;

const SubmitButton = styled.button`
  padding: 10px;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.secondary};
  }
`;

const StatusMessage = styled.p`
  text-align: center;
  margin-top: 15px;
  color: ${({ isSuccess }) => (isSuccess ? 'green' : 'red')};
`;

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      name,
      email,
      message,
    };

    // Send the email using EmailJS
    emailjs.send('service_fg4rgrj', 'template_khesxej', templateParams, 'H2zyj3smTfWyORI9e')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setStatus('Message sent successfully!');
        setName('');
        setEmail('');
        setMessage('');
      }, (err) => {
        console.error('FAILED...', err);
        setStatus('Failed to send message. Please try again.');
      });
  };

  return (
    <FormContainer>
      <FormTitle>Contact Us</FormTitle>
      <form onSubmit={handleSubmit}>
        <InputField>
          <Label>Name:</Label>
          <Input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </InputField>
        <InputField>
          <Label>Email:</Label>
          <Input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </InputField>
        <InputField>
          <Label>Message:</Label>
          <Textarea 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            required 
          />
        </InputField>
        <SubmitButton type="submit">Send</SubmitButton>
      </form>
      {status && <StatusMessage isSuccess={status.includes('successfully')}>{status}</StatusMessage>}
    </FormContainer>
  );
};

export default ContactForm;
