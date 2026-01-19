//? la funcion padre que llama al resto
export default function getColorCodes(colorName) {
  const colorsArray = normalizedText(colorName);

  return colorsArray.map((color) => ({
    text: color.trim(),
    color: getColor(color.trim()),
  }));
}
//? nomas esta dejando el texto en un formato especifico
function normalizedText(text) {
  //ps es sencillo esto simplemente 
  const normalized = text.toLowerCase().trim();
  if (normalized.includes(",") || normalized.includes("-")) {
    return normalized
      .split(/[, -]+/)
      .map((c) => c.trim())
      .filter(Boolean);
  }

  return [normalized];
}
//? funcion que obtiene los colores
function getColor(colorString) {
  const invalidColors = ["unknown", "n/a", "none"];
  if (invalidColors.includes(colorString)) {
    return "#3c2121";
  }
  // Si no está, intentar con el truco del Canvas
  const ctx = document.createElement("canvas").getContext("2d");
  ctx.fillStyle = colorString;

  if (ctx.fillStyle === "#000000" && colorString.toLowerCase() !== "black") {
    // Usar hashToColor para obtener un color consistente aleatorio almenos
    return hashToColor(colorString);
  }
  const resultado = ctx.fillStyle;
  return resultado;
}

/// Necesito estudiar como funciona el metodo esta confuso todavia///
function hashToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let colour = "#";
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xff;
    colour += ("00" + value.toString(16)).substr(-2);
  }
  return colour;
}