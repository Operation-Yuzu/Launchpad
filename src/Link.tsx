import { useState } from 'react';
import axios from 'axios';

import { Button, Container, Flex, Heading, HStack, Icon, Input, Popover, Portal } from '@chakra-ui/react';
import { LuExternalLink, LuLink, LuPencil, LuUnlink } from 'react-icons/lu';

import type { WidgetSettings } from '../types/LayoutTypes.ts';

function Link ({widgetId, settings}: {widgetId: number, settings: WidgetSettings | null}) {
  const [linkUrl, setLinkUrl] = useState(settings?.link?.url ?? '');
  const [newLink, setNewLink] = useState('');
  const [linkEditorOpen, setLinkEditorOpen] = useState(false);


  const handleSubmitNewLink = (newLink: string | null) => {
    console.log('submitting');
    try {
      axios.patch(`/link/url/${widgetId}`, {
        url: newLink
      });
    } catch (error) {
      console.error('Failed to set link', error);
    }
  };

  const renderEditButton = () => {
    return (
      <Popover.Root open={linkEditorOpen} onOpenChange={(e) => {
        setLinkEditorOpen(e.open);
        if (e.open) {
          setNewLink(linkUrl);
        } else {
          setNewLink('');
        }
      }}>
      <Popover.Trigger asChild>
        <Icon size="sm" marginRight="0.5rem" cursor="pointer" onClick={(event) => {
          event.stopPropagation();
          // setLinkEditorOpen(l => !l);
        }}>
          <LuPencil/>
        </Icon>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Arrow />
            <Popover.Body>
              <HStack>
                <Icon size="md" marginRight="0.5rem" cursor="pointer" onClick={(event) => {
                  event.stopPropagation();
                  handleSubmitNewLink(null);
                }}>
                  <LuUnlink/>
                </Icon>
                <Input
                  value={newLink}
                  onChange={(event) => setNewLink(event.target.value)}
                  onKeyDown={(event) => {
                    // https://stackoverflow.com/questions/68979619/how-do-you-submit-on-enter-key-press-in-a-chakra-ui-input
                    if (event.key === 'Enter') {
                      handleSubmitNewLink(newLink);
                    }
                  }}
                />
                <Button onClick={() => handleSubmitNewLink(newLink)}>Save</Button>
              </HStack>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
    );
  }

  return (
    <Container p="0">
      <Flex align="center" marginBottom="0.5rem"> {/* Inner flex box means icon is vertically centered against text */}
        <Icon size="lg" marginRight="0.5rem">
          <LuLink/>
        </Icon>
        <Heading>
          Link
        </Heading>
      </Flex>

      {renderEditButton()}

    </Container>
  );
}

export default Link;