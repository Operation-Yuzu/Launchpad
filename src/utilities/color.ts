// need this file to make a font color changer function based on the background - nav - widget color


const changeTextColor = (textColor?:string) => {
  if(!textColor){
    return 'black';
  }

  if (textColor.slice(0, 4) === 'rgba') {
    return changeRGBAColor(textColor);
  } else {
    return changeHexColor(textColor);
  }
};

const changeHexColor = (textColor: string) => {
  const hex = textColor.replace('#', '');

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 155 ? 'black' : 'white';
}

const changeRGBAColor = (rgba: string) => {
  // I am going to assume that this is of the form rgba(#, #, #, #);

  const values = rgba.slice(5, rgba.length - 2); // remove rgba( and )
  // drops the a value
  const [r, g, b] = values.split(',').map(value => Math.trunc(parseFloat(value) * 255)); // split on commas, convert values to 0-255 range instead of 0-1

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness > 155 ? 'black' : 'white';
};

export default changeTextColor