import { Center, Flex } from '@chakra-ui/react';

import { Icon } from '@chakra-ui/react';

export default function Navel(props) {
  return (
    <Flex
      className={`  h-full rounded-full  justify-center items-center flex-1 -m-4 transition-all flex`}
      _hover={{ bg: 'primc', zIndex: '51 ' }}
      background={props.selected ? 'prim.700' : 'backL'}
      zIndex={props.selected ? 52 : 50}
      onClick={() => props.onClicky()}
    >
      <Icon as={props.icon} mr='2'></Icon>
      <h1>{props.name}</h1>
    </Flex>
  );
}
