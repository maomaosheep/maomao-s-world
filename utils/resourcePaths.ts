export const cinematicWindowResources = {
  foggedWindow: "/resource/fogged-window.png",
  clearWindow: "/resource/clear-window.png"
} as const;

export type CinematicWindowResourceKey = keyof typeof cinematicWindowResources;
