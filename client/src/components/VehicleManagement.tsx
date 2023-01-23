import React from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Image,
  Box,
  Text,
  Spinner,
  Center,
  Icon
} from '@chakra-ui/react';
import { useCookies } from 'react-cookie';
import { useVehicles } from '../lib/hooks';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

const VehicleManagement = () => {
  const [cookies] = useCookies();
  const { vehicles, isLoading } = useVehicles(cookies.token);

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
            <Box  display="flex" gap="10" fontSize='xl'>
              <Icon as={EditIcon} cursor='pointer' />
              <Icon as={DeleteIcon} color='red' cursor='pointer' />
            </Box>
          </Box>
        ))}
    </Box>
  );
};

export default VehicleManagement;
