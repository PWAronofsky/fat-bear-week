import { render } from '@testing-library/react';
import { Bracket } from './Bracket';
import { mockMatchupMap, mockBears } from '../mockData';
import { getNextBearField, checkShouldClearDownstream, clearDownstreamMatchups } from './Bracket';

describe('Bracket', () => {
    test('bracket renders champion title without champion bear displayed', () => {
        const { queryByTestId, queryByText } = render(<Bracket/>);

        expect(queryByText("Champion")).toBeTruthy();
        expect(queryByTestId("champion-image")).toBeFalsy();
        expect(queryByTestId("champion-name")).toBeFalsy();
    });
});

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
            [5]: {
                ...mockMatchupMap[5],
                bear1: mockBears[0],
                pickedWinner: 1
            },
            [9]: {
                ...mockMatchupMap[9],
                bear1: mockBears[0],
                pickedWinner: 1
            },
            [11]: {
                ...mockMatchupMap[11],
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
            [5]: {
                ...mockMatchupMap[5],
                bear1: mockBears[0],
                pickedWinner: 1
            },
            [9]: {
                ...mockMatchupMap[9],
                bear1: mockBears[0],
                bear2: mockBears[9],
                pickedWinner: 10
            },
            [11]: {
                ...mockMatchupMap[11],
                bear1: mockBears[9],
                bear2: mockBears[4],
                pickedWinner: 10
            }
        }

        const expectedBracket = {
            ...filledBracket, 
            [5]: {
                ...filledBracket[5],
                bear1: undefined,
                pickedWinner: undefined
            },
            [9]: {
                ...filledBracket[9],
                bear1: undefined
            },
        }

        const clearedBracket = clearDownstreamMatchups(filledBracket, 1);

        expect(clearedBracket).toEqual(expectedBracket);
    });
});