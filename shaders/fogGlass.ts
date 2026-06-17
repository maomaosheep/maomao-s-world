export type FogGlassShaderToken = {
  name: string;
  value: string;
};

export const fogGlassShaderTokens: FogGlassShaderToken[] = [
  { name: "darkBlueGradient", value: "linear-gradient(180deg, #08111f 0%, #050910 72%)" },
  { name: "aurora", value: "radial-gradient(circle at 24% 18%, rgba(110, 143, 184, 0.24), transparent 34rem)" },
  { name: "frostedGlass", value: "blur(18px) saturate(112%)" },
  { name: "condensation", value: "radial-gradient(circle, rgba(232, 238, 248, 0.22) 0 1px, transparent 1.8px)" },
  { name: "reflection", value: "linear-gradient(115deg, transparent 18%, rgba(232, 238, 248, 0.18) 47%, transparent 68%)" }
];

export const getFogGlassToken = (name: FogGlassShaderToken["name"]) =>
  fogGlassShaderTokens.find((token) => token.name === name)?.value ?? "";
