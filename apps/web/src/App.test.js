import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { App } from './App.js';
const listAllResponse = {
    items: [
        {
            id: 'exp-101',
            name: 'Dr. Alicia Ramos',
            specialty: 'Neurology',
            location: 'Chicago, IL',
            readiness: 'ready',
            bioSnippet: 'Academic neurologist focused on stroke outcomes.',
            caseReviewsCompleted: 42,
            reviewFlag: null,
        },
        {
            id: 'exp-102',
            name: 'Dr. Ben Patel',
            specialty: 'Cardiology',
            location: 'Boston, MA',
            readiness: 'needs-review',
            bioSnippet: 'Practicing cardiologist with device litigation experience.',
            caseReviewsCompleted: 18,
            reviewFlag: null,
        },
    ],
    pagination: {
        page: 1,
        pageSize: 5,
        total: 12,
    },
    availableSpecialties: ['Cardiology', 'Neurology'],
};
const cardiologyResponse = {
    ...listAllResponse,
    items: [listAllResponse.items[1]],
    pagination: {
        page: 1,
        pageSize: 5,
        total: 12,
    },
};
const flaggedResponse = {
    expert: {
        ...listAllResponse.items[1],
        reviewFlag: {
            reason: 'Missing recent credential verification.',
            flaggedBy: 'Taylor Reviewer',
            flaggedAt: '2026-04-20T15:20:00.000Z',
        },
    },
};
describe('App', () => {
    beforeEach(() => {
        const fetchMock = vi.fn(async (input, init) => {
            if (input.startsWith('/api/experts?specialty=Cardiology')) {
                return new Response(JSON.stringify(cardiologyResponse), { status: 200 });
            }
            if (input === '/api/experts?page=1&pageSize=5&reviewStatus=all' || input === '/api/experts?reviewStatus=all&page=1&pageSize=5') {
                return new Response(JSON.stringify(listAllResponse), { status: 200 });
            }
            if (input === '/api/experts/exp-102/review-flag' && init?.method === 'POST') {
                return new Response(JSON.stringify(flaggedResponse), { status: 201 });
            }
            return new Response(JSON.stringify(listAllResponse), { status: 200 });
        });
        vi.stubGlobal('fetch', fetchMock);
    });
    it('filters the list and flags an expert', async () => {
        const user = userEvent.setup();
        render(_jsx(App, {}));
        await screen.findByText('Dr. Alicia Ramos');
        await user.selectOptions(screen.getByLabelText('Specialty'), 'Cardiology');
        await waitFor(() => {
            expect(screen.getByText('Dr. Ben Patel')).toBeInTheDocument();
        });
        await user.click(screen.getByRole('button', { name: 'Flag' }));
        await user.type(screen.getByLabelText('Reason'), 'Missing recent credential verification.');
        await user.click(screen.getByRole('button', { name: 'Flag for review' }));
        await waitFor(() => {
            expect(screen.getByText('Current flag')).toBeInTheDocument();
        });
        expect(screen.getByText('Taylor Reviewer')).toBeInTheDocument();
    });
});
