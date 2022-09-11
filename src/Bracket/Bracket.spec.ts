import { getNextBearField, checkShouldClearDownstream, clearDownstreamMatchups } from './Bracket';

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

    // test('changing round 1 matchup clears all downstream matchups', () => {

    // });
});