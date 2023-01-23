import React from 'react';
import {
  Box,
  Flex,
  Center,
  Input,
  Grid,
  GridItem,
  Text,
  Button
} from '@chakra-ui/react';
import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router';
import VehicleManagement from '../components/VehicleManagement';
import useSWRMutation from 'swr/mutation';


async function sendRequest(url:any, { arg }: any) {
  return fetch(`http://localhost:8888/${url}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${arg.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg.data),
  }).then((res) => res.json());
}
const MainPage = () => {
  const [licensePlateEntry, setLincensePlateEntry] = React.useState('');
  const [licensePlateExit, setLincensePlateExit] = React.useState('');
  const [cookies] = useCookies(['token']);
  const [changeTag, setChangeTag] = React.useState(false);

  const { trigger: triggerEntry } = useSWRMutation(
    'api/vehicle/register-entry',
    sendRequest
  );
  const { trigger: triggerExit } = useSWRMutation('api/vehicle/register-exit',sendRequest);

  return (
    <>
      {!cookies.token && <Navigate to='/login' replace={true} />}

      <Box width={'100vw'} height={'100vh'}>
        <Center
          position='absolute'
          left='0'
          top='0'
          width='30%'
          height='100%'
          fontFamily='heading'
          fontStyle='unset'
          fontWeight='bold'
        >
          <Flex
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            gap='10'
          >
            <Box display='flex' flexDirection='column' gap='10px'>
              <Input
                disabled={licensePlateExit === '' ? false : true}
                paddingY='20px'
                borderColor='gray'
                type='text'
                name='licencePlate'
                value={licensePlateEntry}
                onChange={(e) => {
                  e.preventDefault();
                  setLincensePlateEntry(() => e.target.value);
                }}
              />
              <Button
                disabled={licensePlateExit === '' ? false : true}
                bg='linear-gradient(90deg, #EE4423 31%, #F27121 73%);'
                paddingY='15px'
                color='white'
                sx={{
                  '&:hover': {
                    bg: 'linear-gradient(90deg, #EE4423 31%, #F27121 73%);',
                  },
                }}
                onClick={async (e) => {
                  e.preventDefault();
                  await triggerEntry({
                    data: { plate_number: licensePlateEntry },
                    token: cookies.token,
                  });
                  setLincensePlateEntry('');
                  alert('Vehicle state updated');
                }}
              >
                Register Entry
              </Button>
            </Box>
            <Box display='flex' flexDirection='column' gap='10px'>
              <Input
                disabled={licensePlateEntry === '' ? false : true}
                borderColor='gray'
                paddingY='20px'
                type='text'
                name='licencePlateExit'
                value={licensePlateExit}
                onChange={(e) => {
                  e.preventDefault();
                  setLincensePlateExit(() => e.target.value);
                }}
              />
              <Button
                bg='linear-gradient(90deg, #EE4423 31%, #F27121 73%);'
                paddingY='15px'
                color='white'
                sx={{
                  '&:hover': {
                    bg: 'linear-gradient(90deg, #EE4423 31%, #F27121 73%);',
                  },
                }}
                onClick={async (e) => {
                  e.preventDefault();
                  await triggerExit({
                    data: { plate_number: licensePlateExit },
                    token: cookies.token,
                  });
                  setLincensePlateExit('');
                  alert('Vehicle state updated');
                }}
              >
                Register Exit
              </Button>
            </Box>
          </Flex>
        </Center>

        <Box
          borderLeftWidth='2px'
          borderLeftColor='black'
          marginLeft='30%'
          height='100%'
          color='white'
          bg='gray.100'
        >
          <Grid
            h='100%'
            templateRows='0.5fr 3fr'
            templateColumns='1fr 1fr'
            gap={2}
          >
            <GridItem
              display='flex'
              justifyContent='center'
              alignItems='center'
              cursor='pointer'
              borderBottomRightRadius='25px'
              onClick={() => setChangeTag(() => true)}
              bg={changeTag ? 'gray.600' : 'gray'}
            >
              <Text>View entry and exit records</Text>
            </GridItem>
            <GridItem
              display='flex'
              justifyContent='center'
              alignItems='center'
              cursor='pointer'
              borderBottomLeftRadius='25px'
              onClick={() => {
                setChangeTag(() => false);
              }}
              bg={changeTag ? 'gray' : 'gray.600'}
            >
              <Text>Vehicle management</Text>
            </GridItem>
            <GridItem colSpan={2} bg='#F27121'>
              {changeTag === false && <VehicleManagement />}
            </GridItem>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default MainPage;
