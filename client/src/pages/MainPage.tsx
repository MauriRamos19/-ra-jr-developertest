import React from 'react';
import {
  Box,
  Flex,
  Center,
  Input,
  Grid,
  GridItem,
  Text,
  Button,
  useToast
} from '@chakra-ui/react';
import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router';
import VehicleManagement from '../components/VehicleManagement';
import useSWRMutation from 'swr/mutation';
import EntryExitRecords from '../components/EntryExitRecords';


async function sendRequest(url:any, { arg }: any) {
  return fetch(`${import.meta.env.VITE_REACT_API_URI}${url}`, {
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
  const toast = useToast();

  const { trigger: triggerEntry, isMutating: isMutatingEntry } = useSWRMutation(
    'api/vehicle/register-entry',
    sendRequest
  );
  const { trigger: triggerExit, isMutating: isMutatingExit } = useSWRMutation('api/vehicle/register-exit',sendRequest);

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
          bg='#EDF2F7'
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
                bg='white'
                type='text'
                name='licencePlate'
                value={licensePlateEntry}
                onChange={(e) => {
                  e.preventDefault();
                  setLincensePlateEntry(() => e.target.value);
                }}
              />
              <Button
                disabled={isMutatingEntry}
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
                  }).then((data) => {
                    setLincensePlateEntry('');
                    if (data?.ok) {
                      toast({
                        title: data?.msg,
                        description: 'Vecicle state updated or created',
                        status: 'success',
                        position: 'top',
                        duration: 9000,
                        isClosable: true,
                      });
                    } else {
                      toast({
                        title: data?.msg,
                        status: 'error',
                        position: 'top',
                        duration: 9000,
                        isClosable: true,
                      });
                    }
                  });
                }}
              >
                Register Entry
              </Button>
            </Box>
            <Box display='flex' flexDirection='column' gap='10px'>
              <Input
                disabled={licensePlateEntry === '' ? false : true}
                borderColor='gray'
                bg='white'
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
                disabled={isMutatingExit}
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
                  }).then((data) => {
                    setLincensePlateExit('');
                    if (data?.ok) {
                      toast({
                        title: data?.msg,
                        description: 'Vecicle state updated',
                        status: 'success',
                        position: 'top',
                        duration: 9000,
                        isClosable: true,
                      });
                    } else {
                      toast({
                        title: data?.msg,
                        status: 'error',
                        position: 'top',
                        duration: 9000,
                        isClosable: true,
                      });
                    }
                  });
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
              {changeTag === true && <EntryExitRecords />}
            </GridItem>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default MainPage;
