import { z } from 'zod';

export const readinessSchema = z.enum(['ready', 'needs-review', 'blocked']);
export type Readiness = z.infer<typeof readinessSchema>;

export const reviewStatusSchema = z.enum(['all', 'open', 'flagged']);
export type ReviewStatus = z.infer<typeof reviewStatusSchema>;

export const reviewFlagSchema = z.object({
    reason: z.string().min(1).max(280),
    flaggedBy: z.string().min(1).max(120),
    flaggedAt: z.string().datetime(),
});
export type ReviewFlag = z.infer<typeof reviewFlagSchema>;

export const expertSummarySchema = z.object({
    id: z.string(),
    name: z.string(),
    specialty: z.string(),
    location: z.string(),
    readiness: readinessSchema,
    bioSnippet: z.string(),
    caseReviewsCompleted: z.number().int().nonnegative(),
    reviewFlag: reviewFlagSchema.nullable(),
});
export type ExpertSummary = z.infer<typeof expertSummarySchema>;

export const paginationSchema = z.object({
    page: z.number().int().min(1),
    pageSize: z.number().int().min(1).max(100),
    total: z.number().int().min(0),
});
export type Pagination = z.infer<typeof paginationSchema>;

export const listExpertsQuerySchema = z.object({
    specialty: z.string().trim().min(1).optional(),
    page: z.coerce.number().int().min(1).default(1),
    pageSize: z.coerce.number().int().min(1).max(50).default(5),
    reviewStatus: reviewStatusSchema.default('all'),
});
export type ListExpertsQuery = z.infer<typeof listExpertsQuerySchema>;

export const listExpertsResponseSchema = z.object({
    items: z.array(expertSummarySchema),
    pagination: paginationSchema,
    availableSpecialties: z.array(z.string()),
});
export type ListExpertsResponse = z.infer<typeof listExpertsResponseSchema>;

export const createReviewFlagRequestSchema = z.object({
    reason: z.string().trim().min(1).max(280),
    flaggedBy: z.string().trim().min(1).max(120),
});
export type CreateReviewFlagRequest = z.infer<typeof createReviewFlagRequestSchema>;

export const createReviewFlagResponseSchema = z.object({
    expert: expertSummarySchema,
});
export type CreateReviewFlagResponse = z.infer<typeof createReviewFlagResponseSchema>;
