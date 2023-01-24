import React from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Text,
  Spinner,
  Icon,
  useToast,
} from '@chakra-ui/react';
import { useCookies } from 'react-cookie';
import { useVehicles } from '../lib/hooks';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import useSWRMutation from 'swr/mutation'
import { sendRequest, sendRequestWithData } from '../lib/fetcher';



const VehicleManagement = () => {
  const [cookies] = useCookies();
  const [ vehicle, setVehicle ] = React.useState(''); 
  const [selectedId, setSelectedId] = React.useState('')
  const { vehicles, isLoading, mutate} = useVehicles(cookies.token);
  const [changeButton, setChangeButton] = React.useState(false);
  const { trigger } = useSWRMutation('api/vehicle', sendRequest);
  const { trigger: triggerWithData } = useSWRMutation('api/vehicle', sendRequestWithData);
  const toast = useToast()
  
   if(!vehicles) return <Spinner/>

  const handleDelete = async(e: any, id:any) => {
    e.preventDefault();

    await trigger({
      id,
      method: 'DELETE',
      token: cookies.token,
    }).then((data) => {
      if(data?.ok === false){
        toast({
          title: data?.msg,
          description: 'Vecicle cannot delete',
          status: 'error',
          position: 'top',
          duration: 9000,
          isClosable: true,
        });
        
      } else {
        toast({
          title: data?.msg,
          description: 'Vecicle deleted in the list',
          status: 'success',
          position: 'top',
          duration: 9000,
          isClosable: true,
        });
      }
    });

    mutate();
  }

  const handleEdit = async (e: any, id: any) => {
    e.preventDefault();

    await trigger({
      id,
      method: 'GET',
      token: cookies.token,
    }).then((data) => {
      if (data?.vehicle) {
        setChangeButton(true);
        setVehicle(data.vehicle);

        setSelectedId(id);
      }
    });
  };
  return (
    <Box width='100%'>
      {isLoading && (
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          size='xl'
        />
      )}

      <form>
        <FormControl
          width='98%'
          marginY='25px'
          marginX='auto'
          display='flex'
          marginTop='20px'
          color='black'
        >
          {changeButton === false ? (
            <>
              <Box marginRight='10px'>
                <FormLabel>Add vehicle</FormLabel>
                <Input
                  sx={{
                    border: '1px',
                    backgroundColor: 'white',
                  }}
                  type='text'
                  name='vehicle'
                  value={vehicle}
                  onChange={(e) => {
                    setVehicle(e.target.value);
                  }}
                />
              </Box>

              <Button
                alignSelf='flex-end'
                verticalAlign='center'
                onClick={async (e) => {
                  e.preventDefault();

                  if (vehicle !== '') {
                    await triggerWithData({
                      method: 'PUT',
                      data: { plate_number: vehicle },
                      token: cookies.token,
                    }).then((data) => {
                      if (data?.ok) {
                        toast({
                          title: data?.msg,
                          description: 'Vecicle added in the list',
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

                    

                    mutate()
                  }
                }}
              >
                Agregar
              </Button>
            </>
          ) : (
            <>
              <Box marginRight='10px'>
                <FormLabel>Edit vehicle</FormLabel>
                <Input
                  sx={{
                    border: '1px',
                    backgroundColor: 'white',
                  }}
                  type='text'
                  name='vehicle'
                  value={vehicle}
                  onChange={(e) => {
                     setVehicle(e.target.value)
                    }}
                />
              </Box>

              <Button
                alignSelf='flex-end'
                verticalAlign='center'
                onClick={async (e) => {
                  e.preventDefault();

                  if (vehicle !== '') {
                    await triggerWithData({
                      id: selectedId,
                      method: 'PUT',
                      data: { plate_number: vehicle },
                      token: cookies.token,
                    }).then((data) => {
                      if (data?.msg) {
                        toast({
                          title: data?.msg,
                          description: 'Vecicle added in the list',
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
                    setChangeButton(false);
                    setVehicle('')
                    mutate()
                  }
                }}
              >
                Edit
              </Button>
            </>
          )}
        </FormControl>
      </form>
      {vehicles &&
        vehicles.map((vehicle: any) => (
          <Box
            display='flex'
            justifyContent='space-between'
            paddingX='20px'
            alignItems='center'
            width='98%'
            height='50px'
            bg='gray.100'
            color='black'
            marginY='5px'
            marginX='auto'
            borderRadius='10px'
            key={vehicle.id}
          >
            <Text textTransform='uppercase'>
              <b>Numero de placa: </b>
              {vehicle.plate_number}
            </Text>
            <Box display='flex' gap='10' fontSize='xl'>
              <Icon
                as={EditIcon}
                cursor='pointer'
                onClick={(e) => handleEdit(e, vehicle.id)}
              />
              <Icon
                as={DeleteIcon}
                color='red'
                cursor='pointer'
                onClick={(e) => handleDelete(e, vehicle.id)}
              />
            </Box>
          </Box>
        ))}
    </Box>
  );
};

export default VehicleManagement;
