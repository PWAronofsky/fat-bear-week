import { BearType, MatchupType, MatchupMap } from './types';

export const mockBears: BearType[] = [
  {
    id: 1,
    tagNumber: 132,
    name: 'Family',
    beforeImgSrc: '132-fam-before.png',
    afterImgSrc: '132-fam-after.png'
  },
  {
    id: 2,
    tagNumber: 284,
    name: 'Family',
    beforeImgSrc: '284-fam-before.png',
    afterImgSrc: '284-fam-after.png'
  },
  {
    id: 3,
    tagNumber: 806,
    name: 'Family',
    beforeImgSrc: '806-fam-before.png',
    afterImgSrc: '806-fam-after.png'
  },
  {
    id: 4,
    tagNumber: 901,
    name: 'Family',
    beforeImgSrc: '901-fam-before.png',
    afterImgSrc: '901-fam-after.png'
  },
  {
    id: 5,
    tagNumber: 909,
    name: '',
    beforeImgSrc: '909-before.png',
    afterImgSrc: '909-after.png'
  },
  {
    id: 6,
    tagNumber: 428,
    name: 'Studious',
    beforeImgSrc: '428-before.png',
    afterImgSrc: '428-after.png'
  },
  {
    id: 7,
    tagNumber: 131,
    name: '',
    beforeImgSrc: '131-before.png',
    afterImgSrc: '131-after.png'
  },
  {
    id: 8,
    tagNumber: 910,
    name: '',
    beforeImgSrc: '910-before.png',
    afterImgSrc: '910-after.png'
  },
  {
    id: 9,
    tagNumber: 694,
    name: '',
    beforeImgSrc: '694-before.png',
    afterImgSrc: '694-after.png'
  },
  {
    id: 10,
    tagNumber: 620,
    name: '',
    beforeImgSrc: '620-before.png',
    afterImgSrc: '620-after.png'
  },
  {
    id: 11,
    tagNumber: 610,
    name: 'Family',
    beforeImgSrc: '610-fam-before.png',
    afterImgSrc: '610-fam-after.png'
  },
  {
    id: 12,
    tagNumber: 89,
    name: 'Backpack',
    beforeImgSrc: '89-before.png',
    afterImgSrc: '89-after.png'
  },
  {
    id: 13,
    tagNumber: 32,
    name: 'Chunk',
    beforeImgSrc: '32-before.png',
    afterImgSrc: '32-after.png'
  },
  {
    id: 14,
    tagNumber: 164,
    name: 'Bucky',
    beforeImgSrc: '164-before.png',
    afterImgSrc: '164-after.png'
  },
  {
    id: 15,
    tagNumber: 151,
    name: 'Walker',
    beforeImgSrc: '151-before.png',
    afterImgSrc: '151-after.png'
  },
  {
    id: 16,
    tagNumber: 903,
    name: 'Gully',
    beforeImgSrc: '903-before.png',
    afterImgSrc: '903-after.png'
  }
];

export const mockMatchups: MatchupType[] = [
  // Round 1 - left side
  {
    id: 1,
    bear1: mockBears[0],
    bear2: mockBears[1],
    nextMatchup: 9,
    pickedWinner: undefined,
    column: 1,
    bear1Row: 1,
    bear2Row: 2
  },
  {
    id: 2,
    bear1: mockBears[2],
    bear2: mockBears[3],
    nextMatchup: 9,
    pickedWinner: undefined,
    column: 1,
    bear1Row: 3,
    bear2Row: 4
  },
  {
    id: 3,
    bear1: mockBears[4],
    bear2: mockBears[5],
    nextMatchup: 10,
    pickedWinner: undefined,
    column: 1,
    bear1Row: 5,
    bear2Row: 6
  },
  {
    id: 4,
    bear1: mockBears[6],
    bear2: mockBears[7],
    nextMatchup: 10,
    pickedWinner: undefined,
    column: 1,
    bear1Row: 7,
    bear2Row: 8
  },
  // Round 1 - right side
  {
    id: 5,
    bear1: mockBears[8],
    bear2: mockBears[9],
    nextMatchup: 11,
    pickedWinner: undefined,
    column: 7,
    bear1Row: 1,
    bear2Row: 2
  },
  {
    id: 6,
    bear1: mockBears[10],
    bear2: mockBears[11],
    nextMatchup: 11,
    pickedWinner: undefined,
    column: 7,
    bear1Row: 3,
    bear2Row: 4
  },
  {
    id: 7,
    bear1: mockBears[12],
    bear2: mockBears[13],
    nextMatchup: 12,
    pickedWinner: undefined,
    column: 7,
    bear1Row: 5,
    bear2Row: 6
  },
  {
    id: 8,
    bear1: mockBears[14],
    bear2: mockBears[15],
    nextMatchup: 12,
    pickedWinner: undefined,
    column: 7,
    bear1Row: 7,
    bear2Row: 8
  },
  // Quarterfinals
  {
    id: 9,
    bear1: undefined,
    bear2: undefined,
    nextMatchup: 13,
    pickedWinner: undefined,
    column: 2,
    bear1Row: 2,
    bear2Row: 4
  },
  {
    id: 10,
    bear1: undefined,
    bear2: undefined,
    nextMatchup: 13,
    pickedWinner: undefined,
    column: 2,
    bear1Row: 5,
    bear2Row: 7
  },
  {
    id: 11,
    bear1: undefined,
    bear2: undefined,
    nextMatchup: 14,
    pickedWinner: undefined,
    column: 6,
    bear1Row: 2,
    bear2Row: 4
  },
  {
    id: 12,
    bear1: undefined,
    bear2: undefined,
    nextMatchup: 14,
    pickedWinner: undefined,
    column: 6,
    bear1Row: 5,
    bear2Row: 7
  },
  // Semifinals
  {
    id: 13,
    bear1: undefined,
    bear2: undefined,
    nextMatchup: 15,
    pickedWinner: undefined,
    column: 3,
    bear1Row: 3,
    bear2Row: 6
  },
  {
    id: 14,
    bear1: undefined,
    bear2: undefined,
    nextMatchup: 15,
    pickedWinner: undefined,
    column: 5,
    bear1Row: 3,
    bear2Row: 6
  },
  // Final
  {
    id: 15,
    bear1: undefined,
    bear2: undefined,
    nextMatchup: 16,
    pickedWinner: undefined,
    column: 4,
    bear1Row: 4,
    bear2Row: 5
  }
];

export const mockMatchupMap = mockMatchups.reduce<MatchupMap>((acc: MatchupMap, matchup: MatchupType)=> {
  return {
    ...acc,
    [matchup.id]: matchup
  }
}, {});

export const wantedChange = true
