import { Stack, Flex, Icon } from '@chakra-ui/react';
import { FaHome } from 'react-icons/fa';

export default function Mnavel(props) {
  console.log(props.selected);
  return (
    <Flex
      className='w-full rounded-full hover:bg-opacity-10 transition-all px-8 py-2 text-3xl '
      _hover={{ bg: 'prim.700', zIndex: '51 ' }}
      background={props.selected ? 'primc' : 'transparent'}
      zIndex={props.selected ? 52 : 50}
    >
      <div onClick={props.onClicky} className='flex justify-start items-center w-full'>
        <Icon as={props.icon}></Icon>
        <h1 className='robo ml-4'>{props.name}</h1>
      </div>
    </Flex>
  );
}
