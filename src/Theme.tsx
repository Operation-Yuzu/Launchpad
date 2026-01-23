// needs something in dash editor to open this component
// could add dashboard name change here if needed
/**
 * need bgColor POST and PATCH
 * need navColor POST and PATCH
 * need text color POST and PATCH - idk if i need this or not
 * need font POST and PATCH
 * display all themes the user has - GET
 * might also add a default palette if user has no them
 */


import { useState, useEffect} from 'react';

import axios from 'axios';
import { Button, HStack } from '@chakra-ui/react'

function Theme ({dashboard}: {dashboard: { name: string, ownerId: number}}) {
  const [themesList, setThemesList] = useState([] as {navColor: string, bgColor: string, font: string}[]);
  
  // first lets get all the themes of that user
  const allThemes = async () => {
    const ownerId  = dashboard.ownerId;
    try {
      const test = await axios.get(`/theme/${ownerId}`);
      setThemesList(test.data);

    } catch (error) {
      console.error('Failed to get all of your themes', error);
    }
  }
  

  // POST to make a new theme
  // make sure field is completely filled out
  // const newTheme = async () => {
  //   const ownerId = dashboard.ownerId; // need to send this in the request as well
  //   try {
  //     if({isPublic: boolean, navColor: string, bgColor: string, font: string}, ownerId){
  //       // so if none of those fields are empty
  //       await axios.post('/theme', {isPublic, navColor, bgColor, font, ownerId})
  //     }
  //   } catch (error) {
  //     console.error('Failed to submit theme', error);
  //   }
  // }

// test


  useEffect(() => {
    // if the owner is provided
    if(dashboard.ownerId){
      allThemes();
    }
  }, [dashboard.ownerId])

  return (
    <>
    {
      themesList.map((theme) => {
        console.log(theme)
        return <div>{theme.navColor}{theme.bgColor}{theme.font}</div>
      })
    }
    <HStack>
      <Button>
        Click me
      </Button>
    </HStack>
    </>
  )
}

export default Theme;