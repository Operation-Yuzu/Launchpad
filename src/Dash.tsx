import { useState } from 'react';
import { Box, Container, IconButton, ScrollArea } from "@chakra-ui/react";
import { LuCheck, LuPencil } from "react-icons/lu";

import NavBar from "./NavBar";

function Dashboard () {
  const [editMode, setEditMode] = useState(false);



  const renderEditButton = () => {
    if (editMode) {
      return (
        <IconButton onClick={() => setEditMode(false)} position="absolute" right="20px" top="20px">
          <LuCheck />
        </IconButton>
      );
    } else {
      return (
        <IconButton onClick={() => setEditMode(true)} position="absolute" right="20px" top="20px">
          <LuPencil />
        </IconButton>
      );
    }
  };

  return (
    <>
      <NavBar pages={['Home', 'Hub']}/>
      {/* Use scroll area to make sure content won't exceed horizontal space, to make sure the navbar stays in the correct spot*/}
      <Box width="full" position="relative" p="0" m="0">
        <ScrollArea.Root width="100%">
          <ScrollArea.Viewport>
            <ScrollArea.Content position="relative">
              <Container height="200rem"></Container>
            </ScrollArea.Content>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar orientation="horizontal" />
          <ScrollArea.Corner />
        </ScrollArea.Root>
        {renderEditButton()}
      </Box>
    </>
  );
}

export default Dashboard;