export interface Point {
  x: number;
  y: number;
  r: number;
  hit: boolean;
  timestamp: string;
}

export interface User {
  username: string;
  isAuthenticated: boolean;
  token?: string;
}