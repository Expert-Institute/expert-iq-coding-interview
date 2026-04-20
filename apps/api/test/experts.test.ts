import request from 'supertest';
import { describe, expect, it } from 'vitest';

import { createApp } from '../src/app.js';

describe('experts api', () => {
    it('lists experts with pagination metadata', async () => {
        const response = await request(createApp()).get('/api/experts').query({ page: 1, pageSize: 5, reviewStatus: 'all' });

        expect(response.status).toBe(200);
        expect(response.body.items).toHaveLength(5);
        expect(response.body.pagination.total).toBe(12);
        expect(response.body.availableSpecialties).toContain('Neurology');
    });

    it('creates a review flag for an expert', async () => {
        const response = await request(createApp()).post('/api/experts/exp-102/review-flag').send({
            reason: 'Missing recent credential verification.',
            flaggedBy: 'Jordan Reviewer',
        });

        expect(response.status).toBe(201);
        expect(response.body.expert.id).toBe('exp-102');
        expect(response.body.expert.reviewFlag.reason).toBe('Missing recent credential verification.');
        expect(response.body.expert.reviewFlag.flaggedBy).toBe('Jordan Reviewer');
        expect(typeof response.body.expert.reviewFlag.flaggedAt).toBe('string');
    });

    it('validates review flag payloads', async () => {
        const response = await request(createApp()).post('/api/experts/exp-102/review-flag').send({
            reason: '',
            flaggedBy: '',
        });

        expect(response.status).toBe(400);
    });
});
