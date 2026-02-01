import { Flex, Heading, Icon } from '@chakra-ui/react';
import { LuTimer } from 'react-icons/lu';

function Timer() {



  return (
    <Flex direction="column" height="100%">
      <Flex align="center" marginBottom="0.5rem">
        <Icon size="lg" marginRight="0.5rem">
          <LuTimer/> {/* Would the alarm clock be better? */}
        </Icon>
        <Heading>
          Pomodoro Timer
        </Heading>
      </Flex>
    </Flex>
  );
}

export default Timer;