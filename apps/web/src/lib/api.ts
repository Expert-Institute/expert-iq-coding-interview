import type {
    CreateReviewFlagRequest,
    CreateReviewFlagResponse,
    ListExpertsQuery,
    ListExpertsResponse,
} from '@challenge/contracts';

const createQueryString = (query: Partial<ListExpertsQuery>) => {
    const searchParams = new URLSearchParams();

    if (query.specialty) {
        searchParams.set('specialty', query.specialty);
    }

    if (query.reviewStatus) {
        searchParams.set('reviewStatus', query.reviewStatus);
    }

    if (query.page) {
        searchParams.set('page', String(query.page));
    }

    if (query.pageSize) {
        searchParams.set('pageSize', String(query.pageSize));
    }

    return searchParams.toString();
};

export const apiClient = {
    async listExperts(query: Partial<ListExpertsQuery>): Promise<ListExpertsResponse> {
        const queryString = createQueryString(query);
        const response = await fetch(`/api/experts?${queryString}`);

        if (!response.ok) {
            throw new Error('Failed to load experts');
        }

        return response.json() as Promise<ListExpertsResponse>;
    },
    async createReviewFlag(expertId: string, payload: CreateReviewFlagRequest): Promise<CreateReviewFlagResponse> {
        const response = await fetch(`/api/experts/${expertId}/review-flag`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error('Failed to create review flag');
        }

        return response.json() as Promise<CreateReviewFlagResponse>;
    },
};
