import type { CreateReviewFlagRequest, CreateReviewFlagResponse, ExpertSummary, ListExpertsQuery, ListExpertsResponse } from '@challenge/contracts';

import type { ExpertRepository } from './repository.js';

const paginateExperts = (experts: Array<ExpertSummary>, page: number, pageSize: number): Array<ExpertSummary> => {
    const start = (page - 1) * pageSize;
    return experts.slice(start, start + pageSize);
};

export class ExpertService {
    constructor(private readonly repository: ExpertRepository) {}

    listExperts(query: ListExpertsQuery): ListExpertsResponse {
        const reviewScopedExperts = this.repository.listByReviewStatus(query.reviewStatus);
        const availableSpecialties = Array.from(new Set(reviewScopedExperts.map((expert) => expert.specialty))).sort();

        // Intentional bug for the interview: specialty filtering happens after pagination.
        const pagedExperts = paginateExperts(reviewScopedExperts, query.page, query.pageSize);
        const filteredExperts = query.specialty
            ? pagedExperts.filter((expert) => expert.specialty.toLowerCase() === query.specialty?.toLowerCase())
            : pagedExperts;

        return {
            items: filteredExperts,
            pagination: {
                page: query.page,
                pageSize: query.pageSize,
                total: reviewScopedExperts.length,
            },
            availableSpecialties,
        };
    }

    createReviewFlag(expertId: string, payload: CreateReviewFlagRequest): CreateReviewFlagResponse | null {
        const expert = this.repository.flagExpert(expertId, payload);

        if (!expert) {
            return null;
        }

        return {
            expert,
        };
    }
}
