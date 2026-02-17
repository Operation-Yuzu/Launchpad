import { ColorPicker, parseColor } from "@chakra-ui/react"
// import { useState } from "react"

    // for my colors
  interface ColorProps {
    value?: string;
    onValueChange: (details: any) => void
  }

function Color ({value, onValueChange}: ColorProps) {



  return (
    <ColorPicker.Root value={value ? parseColor(value) : undefined} onValueChange={onValueChange}>
  <ColorPicker.HiddenInput />
  <ColorPicker.Label />
  <ColorPicker.Control>
    <ColorPicker.Input />
    <ColorPicker.Trigger />
  </ColorPicker.Control>
  <ColorPicker.Positioner>
    <ColorPicker.Content>
      <ColorPicker.Area />
      <ColorPicker.EyeDropper />
      <ColorPicker.Sliders />
      <ColorPicker.SwatchGroup>
      </ColorPicker.SwatchGroup>
    </ColorPicker.Content>
  </ColorPicker.Positioner>
</ColorPicker.Root>
  )
}

export default Color