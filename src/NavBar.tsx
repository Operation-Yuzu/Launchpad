// import { useState, useEffect } from 'react';
// import axios from 'axios';

import { Heading, Text, Flex, Container, Center, AbsoluteCenter, Box } from '@chakra-ui/react'
import type React from 'react';

interface MyProps {
  pages: Array<string>,
}

function NavBar (props: MyProps) {

  return (
    <>
      <Box as="nav" position="fixed" top="0" left="0" right="0"  w="100%" h="5%" backgroundColor="yellow.fg" z-index={200}>
        <AbsoluteCenter>
          <Heading>LaunchPad</Heading>
        </AbsoluteCenter>
      </Box>
      <Box w="100%" h="5%" top="0" left="0" right="0" paddingBottom="5%"></Box>
      <p>test2</p>
    </>
  );
}

export default NavBar;
