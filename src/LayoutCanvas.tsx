import { Box } from "@chakra-ui/react";
//import WidgetFrame from "./WidgetFrame.";

const gridCols = 19;
const gridRows = 12;
const snapSize = 100;


const LayoutCanvas = function({ children }: { children: React.ReactNode }){
  return (
    <Box
    position="relative"
    width={`${gridCols * snapSize}px`}
    height={`${gridRows * snapSize}px`}
    border="2px solid rgb(400, 255, 255)"
    backgroundColor="white"

    backgroundSize={`${snapSize}px ${snapSize}px`}
    backgroundImage={`
        linear-gradient(to right, #e5e7eb 1px, transparent 1px),
        linear-gradient(to bottom, #e5e7eb 2px, transparent 2px)
      `}
    >
      {children}

    </Box>
  )
}

export default LayoutCanvas