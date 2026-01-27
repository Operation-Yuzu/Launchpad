import {
  Box,
  Flex,
  HStack,
  VStack,
  Text,
  Button,
  SimpleGrid,
  Spacer,
} from "@chakra-ui/react";

export default function Hub() {
  return (
    <Flex minH="100vh" justify="center">
      <Box w="100%" maxW="1100px" p={6}>
        
        {/* Profile */}
        <VStack gap={3} mb={6}>
          <Box
            w="96px"
            h="96px"
            borderRadius="full"
            border="1px solid"
            borderColor="gray.600"
          />

          <HStack gap={2}>
            <Box
              px={4}
              py={1}
              border="1px solid"
              borderColor="gray.600"
              borderRadius="md"
            >
              <Text>Username</Text>
            </Box>
            <Button size="xs" variant="outline">
              Edit
            </Button>
          </HStack>
        </VStack>

        {/* Defaults + Connected Accounts */}
        <HStack align="stretch" gap={6} mb={6}>
          {/* Defaults */}
          <Box
            flex="1"
            border="1px solid"
            borderColor="gray.600"
            borderRadius="lg"
            p={4}
          >
            <Text fontWeight="bold" mb={3}>
              Defaults
            </Text>

            <HStack gap={3} mb={4}>
              <Button size="sm" variant="outline">
                Dashboard #1
              </Button>
            </HStack>

          </Box>

          {/* Connected Accounts */}
          <Box
            flex="1"
            border="1px solid"
            borderColor="gray.600"
            borderRadius="lg"
            p={4}
            maxH="230px"
            overflowY="auto"
          >
            <Text fontWeight="bold" mb={3}>
              Connected Accounts
            </Text>

            <VStack gap={3}>
              {[1, 2, 3, 4, 5].map(i => (
                <HStack
                  key={i}
                  w="100%"
                  p={2}
                  border="1px solid"
                  borderColor="gray.600"
                  borderRadius="md"
                >
                  <Box
                    w="32px"
                    h="32px"
                    border="1px solid"
                    borderColor="gray.600"
                    borderRadius="md"
                  />
                  <Text flex="1">Username</Text>
                  <Box
                    w="32px"
                    h="20px"
                    border="1px solid"
                    borderColor="gray.600"
                    borderRadius="full"
                  />
                </HStack>
              ))}

              <Button size="sm">+</Button>
            </VStack>
          </Box>
        </HStack>

        {/* Dashboards */}
        <Box
          border="1px solid"
          borderColor="gray.600"
          borderRadius="lg"
          p={4}
          mb={6}
        >
          <Text fontWeight="bold" mb={3}>
            Dashboards
          </Text>

          <Box maxH="300px" overflowY="auto">
            <SimpleGrid columns={4} gap={4}>
              {[1, 2].map(i => (
                <Box
                  key={i}
                  h="120px"
                  border="1px solid"
                  borderColor="gray.600"
                  borderRadius="md"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text>Dashboard #{i}</Text>
                </Box>
              ))}

              <Box
                h="120px"
                border="1px solid"
                borderColor="gray.600"
                borderRadius="md"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="2xl"
              >
                +
              </Box>
            </SimpleGrid>
          </Box>
        </Box>

        {/* Delete */}
        <Flex justify="center">
          <Button variant="outline" colorScheme="red">
            Delete Account
          </Button>
        </Flex>

      </Box>
    </Flex>
  );
}

