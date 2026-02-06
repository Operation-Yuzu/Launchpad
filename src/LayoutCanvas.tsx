import { Box } from "@chakra-ui/react";
import WidgetFrame from "./WidgetFrame"

type Layout = {
  id: number;
  gridSize: string;
  layoutElements: LayoutElement[];

};

type LayoutElement = {
  id: number,
  posX: number,
  posY: number,
  sizeX: number,
  sizeY: number
}

const gridCols = 19;
const gridRows = 12;
//px per grid unit
const snapSize = 200;


const LayoutCanvas = function({ layout, children }: { layout: Layout,  children: React.ReactNode }){
  return (
    <Box
    position="relative"
    width={`${gridCols * snapSize}px`}
    height={`${gridRows * snapSize}px`}
    border="2px solid rgb(400, 255, 255)"
    backgroundColor="white"

    backgroundSize={`${snapSize}px ${snapSize}px`}
    backgroundImage={`
        linear-gradient(to right, #e5e7eb 1px, transparent 2px),
        linear-gradient(to bottom, #e5e7eb 2px, transparent 2px)
      `}
    >
      {layout.layoutElements.map((element) => (
        <WidgetFrame
        key={element.id}
        posX ={element.posX}
        posY={element.posY}
        sizeX={element.sizeX}
        sizeY={element.sizeY}
        minWidth={1}
        minHeight={1}
        snapSize={snapSize}
        resizeActive={false}
        >
          <Box bg='blue.300' height='500%' width='500%'>
            Widget{element.id}
          </Box>

          {children}
        </WidgetFrame>
      ))}

    </Box>
  )
}

export default LayoutCanvas