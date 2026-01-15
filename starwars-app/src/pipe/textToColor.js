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
      return "#312929";
    case normalizedColor.includes(","):
      const colors = normalizedColor.split(",");
      return mixedColorsToColor(colors);

    default:
      return "rgb(0, 0, 0)";
  }
}
function mixedColorsToColor(hairColors) {
  const color1 = hairColors[0].trim();
  const color2 = hairColors[1].trim();
  return color1, color2;
}
/** case "brown, grey":
    case "brown, gray":
      return "#8B4513";
    case "auburn, white":
      return "#A52A2A";
    case "auburn, grey":
    case "auburn, gray":
      return "#A52A2A";
      
      */
