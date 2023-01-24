import React from 'react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Image,
  Text,
  Spinner
} from '@chakra-ui/react';

import {
  Box
} from '@chakra-ui/layout';

import logo from '../assets/redabierta.png'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const [user, setUser] = React.useState({
    name: '',
    password: ''
  })
  const [loading, setLoading] = React.useState(false);
 

  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const navigate = useNavigate();
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser( prev =>
      Object.assign(
        {},
        {
          ...prev,
          [e.target.name]: e.target.value
        }
      )
    );
  }

  const isErrorName= user.name === '';
  const isErrorPass = user.password === '';

    


  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    setLoading(true)
    const response = (await fetch(
      `${import.meta.env.VITE_REACT_API_URI}login`,
      {
        method: 'POST',
        credentials: 'omit',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      }
    )) as any;

    const { token } = await response.json()

    setCookie('token', token, {
      maxAge: 60 * 60,
      secure: true,
      sameSite: 'strict',
    });

    if(cookies.token) {
      setLoading(false)
        navigate('/main');
    }
   

  }

  return (
    <Box
      width='100vw'
      height='100vh'
      bg='#FBAB7E'
      backgroundImage='linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%);'
      color='white'
      margin='auto'
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      gap='25px'
    >
      <Box textAlign='unset'>
        <Image src={logo} alt='redabierta' color='black' />
      </Box>
      <Box
        border='0.5px solid gray'
        borderRadius='2xl'
        bg='#F2F2F2'
        padding='10px'
        color='black'
        width='45%'
        boxShadow='lg'
      >
        <form onSubmit={(e) => handleSubmit(e)}>
          <FormControl isInvalid={isErrorName}>
            <FormLabel>Username</FormLabel>
            <Input
              sx={{
                border: '1px',
              }}
              type='text'
              value={user.name}
              name='name'
              onChange={handleInputChange}
            />
            {!isErrorName ? (
              <FormHelperText>Enter the username</FormHelperText>
            ) : (
              <FormErrorMessage>Username is required.</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={isErrorPass} marginTop='20px'>
            <FormLabel>Password</FormLabel>
            <Input
              sx={{
                border: '1px',
              }}
              type='password'
              value={user.password}
              name='password'
              onChange={handleInputChange}
            />
            {!isErrorPass ? (
              <FormHelperText>Enter the password</FormHelperText>
            ) : (
              <FormErrorMessage>Password is required.</FormErrorMessage>
            )}
          </FormControl>
          <Button
          disabled={loading}
            type='submit'
            marginTop='2rem'
            width='100%'
            color='white'
            bg='linear-gradient(90deg, #EE4423 31%, #F27121 73%);'
            padding='25px'
            sx={{
              '&:hover': {
                bg: 'linear-gradient(94deg, #8d2613 31%, #622f0f 73%);',
              },
            }}
          >
            {loading && <Spinner />}
            {loading === false && <Text>Sign In</Text>}
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default AuthForm