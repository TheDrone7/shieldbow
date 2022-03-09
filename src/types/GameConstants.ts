export interface SeasonData {
  id: number;
  season: string;
}

export interface QueueData {
  queueId: number;
  map: string;
  description: string;
  notes: string | null;
}

export interface MapData {
  mapId: number;
  mapName: string;
  notes: string;
}

export interface GameModeData {
  gameMode: string;
  description: string;
}

export interface GameTypeData {
  gametype: string;
  description: string;
}
