import { z } from 'zod';
export const readinessSchema = z.enum(['ready', 'needs-review', 'blocked']);
export const reviewStatusSchema = z.enum(['all', 'open', 'flagged']);
export const reviewFlagSchema = z.object({
    reason: z.string().min(1).max(280),
    flaggedBy: z.string().min(1).max(120),
    flaggedAt: z.string().datetime(),
});
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
export const paginationSchema = z.object({
    page: z.number().int().min(1),
    pageSize: z.number().int().min(1).max(100),
    total: z.number().int().min(0),
});
export const listExpertsQuerySchema = z.object({
    specialty: z.string().trim().min(1).optional(),
    page: z.coerce.number().int().min(1).default(1),
    pageSize: z.coerce.number().int().min(1).max(50).default(5),
    reviewStatus: reviewStatusSchema.default('all'),
});
export const listExpertsResponseSchema = z.object({
    items: z.array(expertSummarySchema),
    pagination: paginationSchema,
    availableSpecialties: z.array(z.string()),
});
export const createReviewFlagRequestSchema = z.object({
    reason: z.string().trim().min(1).max(280),
    flaggedBy: z.string().trim().min(1).max(120),
});
export const createReviewFlagResponseSchema = z.object({
    expert: expertSummarySchema,
});
