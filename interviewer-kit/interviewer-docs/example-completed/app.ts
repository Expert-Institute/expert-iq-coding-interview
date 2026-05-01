import express from 'express';
import {
    createReviewFlagRequestSchema,
    createReviewFlagResponseSchema,
    listExpertsQuerySchema,
    listExpertsResponseSchema,
} from '@challenge/contracts';

import { ExpertRepository } from './repository.js';
import { ExpertService } from './service.js';

export const createApp = () => {
    const repository = new ExpertRepository();
    const service = new ExpertService(repository);
    const app = express();

    app.use(express.json());

    app.get('/api/health', (_req, res) => {
        res.json({ ok: true });
    });

    app.get('/api/experts', (req, res) => {
        const query = listExpertsQuerySchema.safeParse(req.query);

        if (!query.success) {
            res.status(400).json({ error: query.error.flatten() });
            return;
        }

        const response = service.listExperts(query.data);
        res.json(listExpertsResponseSchema.parse(response));
    });

    app.post('/api/experts/:expertId/review-flag', (req, res) => {
        const payload = createReviewFlagRequestSchema.safeParse(req.body);

        if (!payload.success) {
            res.status(400).json({ error: payload.error.flatten() });
            return;
        }

        const response = service.createReviewFlag(req.params.expertId, payload.data);

        if (!response) {
            res.status(404).json({ error: 'Expert not found' });
            return;
        }

        res.status(201).json(createReviewFlagResponseSchema.parse(response));
    });

    return app;
};
