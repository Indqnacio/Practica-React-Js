export default function textToColor(hairColor) {
  const normalizedColor = hairColor.toLowerCase().trim();

  switch (normalizedColor) {
    case "fair":
      return "#f3e2a9";
    case "gold":
      return "#d4af37";
    case "light":
      return "#e6d8ad";
    case "blond":
    case "blonde":
      return "#7e7232";
    case "brown":
      return "#8B4513";
    case "black":
      return "#000000";
    case "red":
      return "#da1b1b";
    case "auburn":
      return "#A52A2A";
    case "grey":
    case "gray":
      return "#666565";
    case "white":
      return "#a39e9e";
    case "blue":
      return "#3d3d97";
    case "yellow":
      return "#d3d33f";
    case "green":
      return "#008000";
    case "purple":
      return "#800080";
    case "none":
    case "n/a":
    case "unknown":
      return "#252121";
    case normalizedColor.includes(","):
      const colors = normalizedColor.split(",");
      return mixedColorsToColor(colors);

    default:
      return "#301c1c";
  }
}

function nombreAHex(colorNombre) {
    const ctx = document.createElement('canvas').getContext('2d');
    ctx.fillStyle = colorNombre;
    return ctx.fillStyle; // Retorna el código en formato hexadecimal
}

function mixedColorsToColor(hairColors) {
  const color1 = hairColors[0].trim();
  const color2 = hairColors[1].trim();
  return color1, color2;
}

function normalizedText(){
  
}

function obtenerHexSeguro(nombre) {
    // 1. Limpiar el texto y buscar en nuestro diccionario
    const normalizado = nombre.toLowerCase().trim();

    // 2. Si no está, intentar con el truco del Canvas
    const ctx = document.createElement('canvas').getContext('2d');
    ctx.fillStyle = normalizado;
    
    

    // Si el color no es válido, el navegador no cambia el valor de fillStyle
    // Por seguridad comparamos o devolvemos un valor nulo
    const resultado = ctx.fillStyle;
    return resultado;
}

console.log(obtenerHexSeguro("pistache")); // #90b083 (desde tu lista)
console.log(obtenerHexSeguro("red"));      // #ff0000 (desde el navegador)


///✅ “Dado el texto pistache, dame SIEMPRE el mismo color”.///
function hashToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return `hsl(${hash % 360}, 50%, 60%)`;
}
