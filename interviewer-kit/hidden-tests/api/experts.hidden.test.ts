import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createReviewFlagResponseSchema, listExpertsResponseSchema } from '@challenge/contracts';

import { createApp } from '../../../apps/api/src/app.js';

describe('author verification: experts api', () => {
    it('filters by specialty before pagination and reports the correct total', async () => {
        const response = await request(createApp()).get('/api/experts').query({
            specialty: 'Cardiology',
            page: 1,
            pageSize: 2,
            reviewStatus: 'all',
        });

        expect(response.status).toBe(200);
        const parsed = listExpertsResponseSchema.parse(response.body);

        expect(parsed.pagination.total).toBe(4);
        expect(parsed.items).toHaveLength(2);
        expect(parsed.items.every((expert) => expert.specialty === 'Cardiology')).toBe(true);
    });

    it('returns a contract-valid review flag response', async () => {
        const response = await request(createApp()).post('/api/experts/exp-101/review-flag').send({
            reason: 'Needs publication refresh.',
            flaggedBy: 'Alex Reviewer',
        });

        expect(response.status).toBe(201);
        const parsed = createReviewFlagResponseSchema.parse(response.body);

        expect(parsed.expert.reviewFlag?.flaggedBy).toBe('Alex Reviewer');
    });
});
