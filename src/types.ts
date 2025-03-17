import { MutableRefObject, RefObject } from "react"

export interface BearType {
  id: number,
  tagNumber: number,
  name?: string,
  beforeImgSrc?: string,
  afterImgSrc?: string
}

export interface MatchupType {
  id: number,
  bear1?: BearType,
  bear2?: BearType,
  winner?: number,
  pickedWinner?: number,
  nextMatchup: number
}

export interface MatchupMap {
  [key: string]: MatchupType
}

export interface BearElementsMap {
  [key: string]: RefObject<HTMLDivElement>
}

export interface User {
  username: string,
  token: string
}

export interface UserStanding {
  username: string,
  total: number
}
  