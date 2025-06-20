import { BearType, MatchupType, MatchupMap } from './types';

export const mockBears: BearType[] = [
  {
    id: 1,
    tagNumber: 806,
    name: 'Spring Cub',
    beforeImgSrc: '806-before.png',
    afterImgSrc: '806-after.png'
  },
  {
    id: 2,
    tagNumber: 428,
    name: '',
    beforeImgSrc: '428-before.png',
    afterImgSrc: '428-after.png'
  },
  {
    id: 3,
    tagNumber: 402,
    name: '',
    beforeImgSrc: '402-before.png',
    afterImgSrc: '402-after.png'
  },
  {
    id: 4,
    tagNumber: 901,
    name: '',
    beforeImgSrc: '901-before.png',
    afterImgSrc: '901-after.png'
  },
  {
    id: 5,
    tagNumber: 128,
    name: 'Grazer',
    beforeImgSrc: '128-before.png',
    afterImgSrc: '128-after.png'
  },
  {
    id: 6,
    tagNumber: 151,
    name: 'Walker',
    beforeImgSrc: '151-before.png',
    afterImgSrc: '151-after.png'
  },
  {
    id: 7,
    tagNumber: 284,
    name: 'Electra',
    beforeImgSrc: '284-before.png',
    afterImgSrc: '284-after.png'
  },
  {
    id: 8,
    tagNumber: 164,
    name: 'Bucky Dent',
    beforeImgSrc: '164-before.png',
    afterImgSrc: '164-after.png'
  },
  {
    id: 9,
    tagNumber: 32,
    name: 'Chunk',
    beforeImgSrc: '32-before.png',
    afterImgSrc: '32-after.png'
  },
  {
    id: 10,
    tagNumber: 480,
    name: 'Otis',
    beforeImgSrc: '480-before.png',
    afterImgSrc: '480-after.png'
  },
  {
    id: 11,
    tagNumber: 747,
    name: '',
    beforeImgSrc: '747-before.png',
    afterImgSrc: '747-after.png'
  },
  {
    id: 12,
    tagNumber: 435,
    name: 'Holly',
    beforeImgSrc: '435-before.png',
    afterImgSrc: '435-after.png'
  }
];

export const mockMatchups: MatchupType[] = [
  {
    id: 1,
    bear1: mockBears[0],
    bear2: mockBears[1],
    nextMatchup: 5,
    pickedWinner: undefined,
    column: 1,
    bear1Row: 1,
    bear2Row: 3
  },
  {
    id: 2,
    bear1: mockBears[2],
    bear2: mockBears[3],
    nextMatchup: 6,
    pickedWinner: undefined,
    column: 1,
    bear1Row: 8,
    bear2Row: 10
  },
  {
    id: 3,
    bear1: mockBears[4],
    bear2: mockBears[5],
    nextMatchup: 7,
    pickedWinner: undefined,
    column: 7,
    bear1Row: 1,
    bear2Row: 3
  },
  {
    id: 4,
    bear1: mockBears[6],
    bear2: mockBears[7],
    nextMatchup: 8,
    pickedWinner: undefined,
    column: 7,
    bear1Row: 8,
    bear2Row: 10
  },
  {
    id: 5,
    bear1: undefined,
    bear2: mockBears[8],
    nextMatchup: 9,
    pickedWinner: undefined,
    column: 2,
    bear1Row: 2,
    bear2Row: 4
  },
  {
    id: 6,
    bear1: mockBears[9],
    bear2: undefined,
    nextMatchup: 9,
    pickedWinner: undefined,
    column: 2,
    bear1Row: 7,
    bear2Row: 9
  },
  {
    id: 7,
    bear1: undefined,
    bear2: mockBears[10],
    nextMatchup: 10,
    pickedWinner: undefined,
    column: 6,
    bear1Row: 2,
    bear2Row: 4
  },
  {
    id: 8,
    bear1: mockBears[11],
    bear2: undefined,
    nextMatchup: 10,
    pickedWinner: undefined,
    column: 6,
    bear1Row: 7,
    bear2Row: 9
  },
  {
    id: 9,
    bear1: undefined,
    bear2: undefined,
    nextMatchup: 11,
    pickedWinner: undefined,
    column: 3,
    bear1Row: 3,
    bear2Row: 8
  },
  {
    id: 10,
    bear1: undefined,
    bear2: undefined,
    nextMatchup: 11,
    pickedWinner: undefined,
    column: 5,
    bear1Row: 3,
    bear2Row: 8
  },
  {
    id: 11,
    bear1: undefined,
    bear2: undefined,
    nextMatchup: 12,
    pickedWinner: undefined,
    column: 4,
    bear1Row: 5,
    bear2Row: 6
  }
];

export const mockMatchupMap = mockMatchups.reduce<MatchupMap>((acc: MatchupMap, matchup: MatchupType)=> {
  return {
    ...acc,
    [matchup.id]: matchup
  }
}, {});

export const mockUserContext = { 
  updateUser: jest.fn(),
  logout: jest.fn(),
  canEditBracket: true,
  isLoggedIn: true,
  user: { username: 'test', token: 'abc' }
};