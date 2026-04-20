import { cloneSeedExperts } from '@challenge/fixtures';
import type { CreateReviewFlagRequest, ReviewStatus } from '@challenge/contracts';

import type { ExpertRecord } from './types.js';

export class ExpertRepository {
    private readonly experts: Array<ExpertRecord>;

    constructor(seedExperts: Array<ExpertRecord> = cloneSeedExperts()) {
        this.experts = seedExperts;
    }

    listAll(): Array<ExpertRecord> {
        return this.experts.map((expert) => ({
            ...expert,
            reviewFlag: expert.reviewFlag ? { ...expert.reviewFlag } : null,
        }));
    }

    listByReviewStatus(reviewStatus: ReviewStatus): Array<ExpertRecord> {
        const experts = this.listAll();

        switch (reviewStatus) {
            case 'open':
                return experts.filter((expert) => expert.reviewFlag === null);
            case 'flagged':
                return experts.filter((expert) => expert.reviewFlag !== null);
            case 'all':
            default:
                return experts;
        }
    }

    flagExpert(expertId: string, payload: CreateReviewFlagRequest): ExpertRecord | null {
        const expert = this.experts.find((candidate) => candidate.id === expertId);

        if (!expert) {
            return null;
        }

        expert.reviewFlag = {
            reason: payload.reason,
            flaggedBy: payload.flaggedBy,
            flaggedAt: new Date().toISOString(),
        };

        return {
            ...expert,
            reviewFlag: expert.reviewFlag ? { ...expert.reviewFlag } : null,
        };
    }
}
