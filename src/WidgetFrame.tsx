import { useState } from 'react';

import { Container, For } from "@chakra-ui/react";

const handleThickness = 10;

enum Side {
  Top = 'TOP',
  Bottom = 'BOTTOM',
  Left = 'LEFT',
  Right = 'RIGHT'
}

enum Corner {
  TopLeft = 'TOP_LEFT',
  TopRight = 'TOP_RIGHT',
  BottomRight = 'BOTTOM_RIGHT',
  BottomLeft = 'BOTTOM_LEFT'
}

function SideHandle({side, parentWidth, parentHeight, resize}: {side: Side, parentWidth: number, parentHeight: number, resize: (side: Side, delta: number) => void}) {
  const [isDragging, setIsDragging] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  let posX, posY;
  let width, height;

  switch (side) {
    case Side.Top:
      posX = handleThickness;
      posY = 0;
      width = parentWidth - 2 * handleThickness;
      height = handleThickness;
      break;
    case Side.Bottom:
      posX = handleThickness;
      posY = parentHeight - handleThickness;
      width = parentWidth - 2 * handleThickness;
      height = handleThickness;
      break;
    case Side.Left:
      posX = 0;
      posY = handleThickness;
      width = handleThickness;
      height = parentHeight - 2 * handleThickness;
      break;
    case Side.Right:
      posX = parentWidth - handleThickness;
      posY = handleThickness;
      width = handleThickness;
      height = parentHeight - 2 * handleThickness;
      break;
  }

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsDragging(true);

    setMouseX(event.screenX);
    setMouseY(event.screenY);

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleMouseUp);
  }

  const handleMove = (event: MouseEvent) => {
    console.log('move');
    console.log(isDragging);
    
    // const deltaX = event.x - mouseX;
    // const deltaY = event.y - mouseY;

    const deltaX = event.movementX;
    const deltaY = event.movementY;

    console.log(`dx: ${deltaX}, dy: ${deltaY}`);

    switch (side) {
      case Side.Top:
      case Side.Bottom:
        resize(side, deltaY);
        break;
      case Side.Left:
      case Side.Right:
        resize(side, deltaX);
        break;
    }

    setMouseX(event.x);
    setMouseY(event.y);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    window.removeEventListener('mousemove', handleMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <Container
      bg="purple"
      position="absolute"
      top={`${posY}px`}
      left={`${posX}px`}
      width={`${width}px`}
      height={`${height}px`}
      padding="0px"
      onMouseDown={handleMouseDown}
    >
    </Container>
  );
}

function CornerHandle({corner}: {corner: Corner}) {
  return (
    <p>Corner</p>
  );
}

function WidgetFrame({x1, y1, x2, y2}: {x1: number, y1: number, x2: number, y2: number}) {
  const [top, setTop] = useState(y1);
  const [bottom, setBottom] = useState(y2);
  const [left, setLeft] = useState(x1);
  const [right, setRight] = useState(x2);

  const resize = (side: Side, delta: number) => {
    console.log(side);
    switch (side) {
      case Side.Top:
        setTop((t) => t + delta);
        break;
      case Side.Bottom:
        setBottom((b) => b + delta);
        break;
      case Side.Left:
        setLeft((l) => l + delta);
        break;
      case Side.Right:
        setRight((r) => r + delta);
        break;
    }
  };

  return (
    <Container padding="5" bg="blue" position="absolute" top={`${top}px`} left={`${left}px`} width={`${right-left}px`} height={`${bottom-top}px`}>
      <p>Children</p>
      <For
        each={Object.values(Side)}
      >
        {(item) => <SideHandle side={item} parentWidth={right-left} parentHeight={bottom-top} resize={resize}/>}
      </For>
    </Container>
  );
}

export default WidgetFrame;