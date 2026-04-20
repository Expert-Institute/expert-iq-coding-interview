import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { App } from '../../../apps/web/src/App.js';

describe('author verification: web flow', () => {
    beforeEach(() => {
        vi.stubGlobal(
            'fetch',
            vi.fn(async (input: string, init?: RequestInit) => {
                if (input.startsWith('/api/experts?specialty=Cardiology')) {
                    return new Response(
                        JSON.stringify({
                            items: [
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
                                {
                                    id: 'exp-105',
                                    name: 'Dr. Elena Silva',
                                    specialty: 'Cardiology',
                                    location: 'Miami, FL',
                                    readiness: 'ready',
                                    bioSnippet: 'Electrophysiologist with deep deposition history.',
                                    caseReviewsCompleted: 54,
                                    reviewFlag: null,
                                },
                            ],
                            pagination: {
                                page: 1,
                                pageSize: 5,
                                total: 4,
                            },
                            availableSpecialties: ['Cardiology', 'Neurology', 'Oncology', 'Orthopedics'],
                        }),
                        { status: 200 }
                    );
                }

                if (input === '/api/experts/exp-102/review-flag' && init?.method === 'POST') {
                    return new Response(
                        JSON.stringify({
                            expert: {
                                id: 'exp-102',
                                name: 'Dr. Ben Patel',
                                specialty: 'Cardiology',
                                location: 'Boston, MA',
                                readiness: 'needs-review',
                                bioSnippet: 'Practicing cardiologist with device litigation experience.',
                                caseReviewsCompleted: 18,
                                reviewFlag: {
                                    reason: 'Needs publication refresh.',
                                    flaggedBy: 'Taylor Reviewer',
                                    flaggedAt: '2026-04-20T15:20:00.000Z',
                                },
                            },
                        }),
                        { status: 201 }
                    );
                }

                return new Response(
                    JSON.stringify({
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
                        ],
                        pagination: {
                            page: 1,
                            pageSize: 5,
                            total: 12,
                        },
                        availableSpecialties: ['Cardiology', 'Neurology', 'Oncology', 'Orthopedics'],
                    }),
                    { status: 200 }
                );
            })
        );
    });

    it('shows filtered totals and completes the flagging flow', async () => {
        const user = userEvent.setup();

        render(<App />);

        await screen.findByText('Dr. Alicia Ramos');
        await user.selectOptions(screen.getByLabelText('Specialty'), 'Cardiology');

        await waitFor(() => {
            expect(screen.getByText('4 experts in scope')).toBeInTheDocument();
        });

        await user.click(screen.getAllByRole('button', { name: 'Flag' })[0]);
        await user.type(screen.getByLabelText('Reason'), 'Needs publication refresh.');
        await user.click(screen.getByRole('button', { name: 'Flag for review' }));

        await waitFor(() => {
            expect(screen.getByText('Current flag')).toBeInTheDocument();
        });
    });
});
