import { render } from '@testing-library/react';
import { Bracket } from './Bracket';
import { mockMatchupMap, mockBears } from '../mockData';
import { getNextBearField, checkShouldClearDownstream, clearDownstreamMatchups } from './Bracket';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => mockedUsedNavigate,
}));



describe('Bracket Functions', () => {
    test('getNextBearField returns correct next bear field based on current matchup', () => {
        let nextBearField = getNextBearField(7);

        expect(nextBearField).toEqual('bear1');

        nextBearField = getNextBearField(8);

        expect(nextBearField).toEqual('bear2');
    });

    test('checkShouldClearDownstream returns true if picked winner is an id and equals bearId', () => {
        let shouldClearDownstream = checkShouldClearDownstream(12, 12);
        expect(shouldClearDownstream).toBeTruthy();

        shouldClearDownstream = checkShouldClearDownstream(3, 12);
        expect(shouldClearDownstream).toBeFalsy();

        shouldClearDownstream = checkShouldClearDownstream(undefined, 12);
        expect(shouldClearDownstream).toBeFalsy();
    });

    test('changing round 1 matchup clears all downstream matchups', () => {
        const filledBracket = {
            ...mockMatchupMap,
            [9]: {
                ...mockMatchupMap[9],
                bear1: mockBears[0],
                pickedWinner: 1
            },
            [13]: {
                ...mockMatchupMap[13],
                bear1: mockBears[0],
                pickedWinner: 1
            },
            [15]: {
                ...mockMatchupMap[15],
                bear1: mockBears[0],
                pickedWinner: 1
            }
        }

        const clearedBracket = clearDownstreamMatchups(filledBracket, 1);

        expect(clearedBracket).toEqual(mockMatchupMap);
    });

    test('changing round 1 matchup clears downstream until alternate picked winner', () => {
        const filledBracket = {
            ...mockMatchupMap,
            [9]: {
                ...mockMatchupMap[9],
                bear1: mockBears[0],
                pickedWinner: 1
            },
            [13]: {
                ...mockMatchupMap[13],
                bear1: mockBears[0],
                bear2: mockBears[9],
                pickedWinner: 10
            },
            [15]: {
                ...mockMatchupMap[15],
                bear1: mockBears[9],
                bear2: mockBears[4],
                pickedWinner: 10
            }
        }

        const expectedBracket = {
            ...filledBracket,
            [9]: {
                ...filledBracket[9],
                bear1: undefined,
                pickedWinner: undefined
            },
            [13]: {
                ...filledBracket[13],
                bear1: undefined
            },
        }

        const clearedBracket = clearDownstreamMatchups(filledBracket, 1);

        expect(clearedBracket).toEqual(expectedBracket);
    });
});