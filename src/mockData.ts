import { BearType, MatchupType, MatchupMap } from './types';

export const mockBears: BearType[] = [
  {
    id: 1,
    tagNumber: 435,
    name: 'Holly',
    beforeImgSrc: '435-before.png',
    afterImgSrc: '435-after.png'
  },
  {
    id: 2,
    tagNumber: 128,
    name: 'Grazer',
    beforeImgSrc: '128-before.png',
    afterImgSrc: '128-after.png'
  },
  {
    id: 3,
    tagNumber: 132,
    name: 'Cub',
    beforeImgSrc: '132-before.png',
    afterImgSrc: '132-after.png'
  },
  {
    id: 4,
    tagNumber: 32,
    name: 'Chunk',
    beforeImgSrc: '32-before.png',
    afterImgSrc: '32-after.png'
  },
  {
    id: 5,
    tagNumber: 634,
    name: 'Popeye',
    beforeImgSrc: '634-before.png',
    afterImgSrc: '634-after.png'
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
    tagNumber: 812,
    name: '',
    beforeImgSrc: '812-before.png',
    afterImgSrc: '812-after.png'
  },
  {
    id: 8,
    tagNumber: 131,
    name: '',
    beforeImgSrc: '131-before.png',
    afterImgSrc: '131-after.png'
  },
  {
    id: 9,
    tagNumber: 503,
    name: '',
    beforeImgSrc: '503-before.png',
    afterImgSrc: '503-after.png'
  },
  {
    id: 10,
    tagNumber: 747,
    name: '',
    beforeImgSrc: '747-before.png',
    afterImgSrc: '747-after.png'
  },
  {
    id: 11,
    tagNumber: 402,
    name: '',
    beforeImgSrc: '402-before.png',
    afterImgSrc: '402-after.png'
  },
  {
    id: 12,
    tagNumber: 480,
    name: 'Otis',
    beforeImgSrc: '480-before.png',
    afterImgSrc: '480-after.png'
  }
];

export const mockMatchups: MatchupType[] = [
  {
    id: 1,
    bear1: mockBears[0],
    bear2: mockBears[1],
    nextMatchup: 5,
    pickedWinner: undefined
  },
  {
    id: 2,
    bear1: mockBears[2],
    bear2: mockBears[3],
    nextMatchup: 6,
    pickedWinner: undefined
  },
  {
    id: 3,
    bear1: mockBears[4],
    bear2: mockBears[5],
    nextMatchup: 7,
    pickedWinner: undefined
  },
  {
    id: 4,
    bear1: mockBears[6],
    bear2: mockBears[7],
    nextMatchup: 8,
    pickedWinner: undefined
  },
  {
    id: 5,
    bear1: undefined,
    bear2: mockBears[8],
    nextMatchup: 9,
    pickedWinner: undefined
  },
  {
    id: 6,
    bear1: mockBears[9],
    bear2: undefined,
    nextMatchup: 9,
    pickedWinner: undefined
  },
  {
    id: 7,
    bear1: undefined,
    bear2: mockBears[10],
    nextMatchup: 10,
    pickedWinner: undefined
  },
  {
    id: 8,
    bear1: mockBears[11],
    bear2: undefined,
    nextMatchup: 10,
    pickedWinner: undefined
  },
  {
    id: 9,
    bear1: undefined,
    bear2: undefined,
    nextMatchup: 11,
    pickedWinner: undefined
  },
  {
    id: 10,
    bear1: undefined,
    bear2: undefined,
    nextMatchup: 11,
    pickedWinner: undefined
  },
  {
    id: 11,
    bear1: undefined,
    bear2: undefined,
    nextMatchup: 12,
    pickedWinner: undefined
  }
];

export const mockMatchupMap = mockMatchups.reduce<MatchupMap>((acc: MatchupMap, matchup: MatchupType)=> {
  return {
    ...acc,
    [matchup.id]: matchup
  }
}, {});