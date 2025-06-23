import { fireEvent, render } from '@testing-library/react';
import { mockBears } from '../mockData';
import { Bear } from './Bear';
import { a11yLabels } from '../a11yLabels';
import * as UserContext from '../contexts/userContext'

const mockPickWinner = jest.fn();
const mockBear = mockBears[0];
const beforeLabel = a11yLabels.beforeAfterButton(true, mockBear.tagNumber, mockBear.name);
const afterLabel = a11yLabels.beforeAfterButton(false, mockBear.tagNumber, mockBear.name);
const pickLabel = a11yLabels.pickBear(mockBear.tagNumber, mockBear.name);
const nodeId = "mock-node-1-1"

const mockUserContext = { 
    updateUser: jest.fn(),
    logout: jest.fn(),
    canEditBracket: true,
    isLoggedIn: true,
    user: { username: 'test', token: 'abc' }
  };

describe('Bear', () => {
    beforeEach(() => {
        jest.spyOn(UserContext, 'useUserContext').mockImplementation(() => mockUserContext);
    });
    afterEach(() => {
        jest.resetAllMocks();
    });
    test('bear renders', () => {
        const { getByRole, queryByRole } = render(<Bear bear={mockBear} pickThisBear={mockPickWinner} nodeId={nodeId} row={1} column={1}/>);
        const beforeButton = getByRole('button', { name: beforeLabel });
        const afterButton = queryByRole('button', { name: afterLabel });
        const bearPickButton = getByRole('button', { name: pickLabel });

        expect(beforeButton).toBeTruthy();
        expect(afterButton).toBeFalsy();
        expect(bearPickButton).toBeTruthy();
    });

    test('clicking bear picture changes label and img src', () => {
        const { getByRole, queryByRole } = render(<Bear bear={mockBear} pickThisBear={mockPickWinner} nodeId={nodeId} row={1} column={1}/>);
        let beforeButton = getByRole('button', { name: beforeLabel });
        let afterButton = queryByRole('button', { name: afterLabel });

        expect(beforeButton).toBeTruthy();
        expect(afterButton).toBeFalsy();
        expect(beforeButton.getAttribute('src')).toContain(mockBear.afterImgSrc);

        fireEvent.click(beforeButton);

        const newBeforeButton = queryByRole('button', { name: beforeLabel });
        afterButton = getByRole('button', { name: afterLabel });

        expect(afterButton).toBeTruthy();
        expect(newBeforeButton).toBeFalsy();
        expect(afterButton.getAttribute('src')).toContain(mockBear.beforeImgSrc);
    });

    test('clicking bear name calls pickWinner', () => {
        const { getByRole } = render(<Bear bear={mockBear} pickThisBear={mockPickWinner} nodeId={nodeId} row={1} column={1}/>);
        const bearPickButton = getByRole('button', { name: pickLabel });

        fireEvent.click(bearPickButton);

        expect(mockPickWinner).toHaveBeenCalledTimes(1);
    });
});