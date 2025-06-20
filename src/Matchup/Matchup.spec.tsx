import { fireEvent, render } from '@testing-library/react';
import { mockMatchups, mockUserContext } from '../mockData';
import { Matchup } from './Matchup';
import { a11yLabels } from '../a11yLabels';
import * as UserContext from '../contexts/userContext'

const mockMatchup = mockMatchups[3];
const mockPickWinner = jest.fn();

const bear1BeforeLabel = a11yLabels.beforeAfterButton(true, mockMatchup.bear1?.tagNumber, mockMatchup.bear1?.name);
const bear1PickLabel = a11yLabels.pickBear(mockMatchup.bear1?.tagNumber, mockMatchup.bear1?.name);
const bear2BeforeLabel = a11yLabels.beforeAfterButton(true, mockMatchup.bear2?.tagNumber, mockMatchup.bear2?.name);
const bear2PickLabel = a11yLabels.pickBear(mockMatchup.bear2?.tagNumber, mockMatchup.bear2?.name);

describe('matchup', ()=> {
    beforeEach(() => {
        jest.spyOn(UserContext, 'useUserContext').mockImplementation(() => mockUserContext);
    });
    afterEach(() => {
        jest.resetAllMocks();
    });
    test('matchup renders', () => {
        const { getByRole } = render(<Matchup matchup={mockMatchup} pickWinner={mockPickWinner}/>);

        const bear1BeforeButton = getByRole('button', { name: bear1BeforeLabel});
        const bear2BeforeButton = getByRole('button', { name: bear2BeforeLabel});
        const bear1PickButton = getByRole('button', { name: bear1PickLabel});
        const bear2PickButton = getByRole('button', { name: bear2PickLabel});

        expect(bear1BeforeButton).toBeTruthy();
        expect(bear2BeforeButton).toBeTruthy();
        expect(bear1PickButton).toBeTruthy();
        expect(bear2PickButton).toBeTruthy();

    });

    test('clicking pick bear calls pick winner', () => {
        const { getByRole } = render(<Matchup matchup={mockMatchup} pickWinner={mockPickWinner}/>);

        const bear1PickButton = getByRole('button', { name: bear1PickLabel});

        fireEvent.click(bear1PickButton);

        expect(mockPickWinner).toHaveBeenCalledTimes(1);
    });
});