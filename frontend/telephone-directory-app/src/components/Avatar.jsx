// Palette di colori scelta per buon contrasto col testo bianco,
// sia su sfondo chiaro che scuro.
const COLORS = [
  "#e57373",
  "#f06292",
  "#ba68c8",
  "#9575cd",
  "#7986cb",
  "#64b5f6",
  "#4dd0e1",
  "#4db6ac",
  "#81c784",
  "#aed581",
  "#ffb74d",
  "#ff8a65",
];

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; // forza a intero a 32 bit
  }
  return Math.abs(hash);
}

function colorFromName(name) {
  const hash = hashString(name);
  return COLORS[hash % COLORS.length];
}

function Avatar({ name, size = 40 }) {
  const trimmed = (name || "").trim();
  const initial = trimmed ? trimmed[0].toUpperCase() : "?";
  const backgroundColor = trimmed ? colorFromName(trimmed) : "#9e9e9e";

  return (
    <div
      className="d-inline-flex align-items-center justify-content-center flex-shrink-0 rounded-circle text-white fw-semibold"
      style={{
        width: size,
        height: size,
        backgroundColor,
        fontSize: size * 0.45,
        lineHeight: 1,
      }}
      aria-hidden="true"
    >
      {initial}
    </div>
  );
}

export default Avatar;
