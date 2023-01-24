import React from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';
import { useCookies } from 'react-cookie';
import { useRecords } from '../lib/hooks';

function EntryExitRecords() {
    
    const [ cookies ] = useCookies()
  const { logs } = useRecords(cookies.token);
  return (
    <TableContainer bg='white' color='black' margin='auto' scrollBehavior="smooth" height="100%">
      <Table variant='striped' color=''>
        <Thead>
          <Tr>
            <Th>Vehicle plate</Th>
            <Th>Entry Time</Th>
            <Th isNumeric>Exit Time</Th>
          </Tr>
        </Thead>
        <Tbody>
          { logs && logs.map((data: any) => (
            <Tr>
              <Td>{data.vehicle.plate_number}</Td>
              <Td>{data.entryTime}</Td>
              <Td>{data.exitTime}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default EntryExitRecords