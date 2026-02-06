import { useState, useEffect } from 'react';
import { Accordion, Button, Flex, For, VStack, Text } from '@chakra-ui/react';

import axios from 'axios';

import type { Permission, Account } from '../types/Accounts';

function Accounts() {
  const [accounts, setAccounts] = useState([] as Account[]);

  const refreshAccounts = async () => {
    console.log('refreshing accounts');
    try {
      const response = await axios.get('/accounts');
  
      setAccounts(response.data);
    } catch (error) {
      // TODO: handle not signed in
      // if ((error as AxiosError).status === 401) {
        
      // }
      console.error('Failed to get account information:', error);
    }

  };

  useEffect(() => {
    refreshAccounts();
  }, []);

  return (
    <Accordion.Root collapsible>
      <For
        each={accounts}
      >
        {(account) => (
          <Accordion.Item value={account.name}>
            <Accordion.ItemTrigger>
              <Accordion.ItemIndicator />
              {account.name}
              <Button asChild size="2xs" rounded="full">
                {
                  account.unlinkable
                    ? <a href={account.unlinkURL}>Unlink</a>
                    : <a href="" data-disabled="" onClick={(e) => e.preventDefault()} >Unlink</a>
                }
              </Button>
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
              <Accordion.ItemBody>
                <VStack>
                  <For
                    each={account.permissions}
                  >
                    {(permission) => (
                      <Flex justify="space-between">
                        <Text>{permission.name}</Text>
                        <Button asChild size="2xs" rounded="full" colorPalette="green" variant={permission.authorized ? "outline" : undefined}>
                          {
                            permission.authorized
                              ? <a href="" onClick={(e) => e.preventDefault()}>Authorized</a>
                              : <a href={permission.authURL}>Authorize</a>
                          }
                        </Button>
                      </Flex>
                    )}
                  </For>
                </VStack>
              </Accordion.ItemBody>
            </Accordion.ItemContent>
          </Accordion.Item>
        )}
      </For>
    </Accordion.Root>
  );
}

export default Accounts;