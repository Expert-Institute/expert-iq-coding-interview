import type { ExpertSummary, Readiness, ReviewFlag } from '@challenge/contracts';

export type SeedExpert = Omit<ExpertSummary, 'reviewFlag'> & {
    reviewFlag: ReviewFlag | null;
};

const createExpert = (
    id: string,
    name: string,
    specialty: string,
    location: string,
    readiness: Readiness,
    caseReviewsCompleted: number,
    bioSnippet: string,
    reviewFlag: ReviewFlag | null = null
): SeedExpert => ({
    id,
    name,
    specialty,
    location,
    readiness,
    caseReviewsCompleted,
    bioSnippet,
    reviewFlag,
});

export const seededExperts: Array<SeedExpert> = [
    createExpert('exp-101', 'Dr. Alicia Ramos', 'Neurology', 'Chicago, IL', 'ready', 42, 'Academic neurologist focused on stroke outcomes.'),
    createExpert('exp-102', 'Dr. Ben Patel', 'Cardiology', 'Boston, MA', 'needs-review', 18, 'Practicing cardiologist with device litigation experience.'),
    createExpert('exp-103', 'Dr. Chloe Nguyen', 'Orthopedics', 'Dallas, TX', 'blocked', 9, 'Orthopedic surgeon with spine and trauma background.'),
    createExpert('exp-104', 'Dr. Devon Brooks', 'Neurology', 'Seattle, WA', 'needs-review', 27, 'Neuromuscular specialist with plaintiff and defense work.'),
    createExpert('exp-105', 'Dr. Elena Silva', 'Cardiology', 'Miami, FL', 'ready', 54, 'Electrophysiologist with deep deposition history.'),
    createExpert('exp-106', 'Dr. Farah Khan', 'Oncology', 'New York, NY', 'needs-review', 33, 'Medical oncologist with hospital leadership experience.'),
    createExpert('exp-107', 'Dr. Greg Turner', 'Neurology', 'Atlanta, GA', 'ready', 22, 'Behavioral neurologist and retained testifying expert.'),
    createExpert(
        'exp-108',
        'Dr. Hannah Lee',
        'Cardiology',
        'Denver, CO',
        'needs-review',
        12,
        'Preventive cardiology expert with payer and compliance background.',
        {
            reason: 'Credentials update requested by internal reviewer.',
            flaggedBy: 'Maya Reviewer',
            flaggedAt: '2026-03-12T15:30:00.000Z',
        }
    ),
    createExpert('exp-109', 'Dr. Isaac Coleman', 'Oncology', 'Los Angeles, CA', 'blocked', 6, 'Hem/onc expert with recent publication activity.'),
    createExpert('exp-110', 'Dr. Julia Park', 'Orthopedics', 'San Francisco, CA', 'ready', 38, 'Sports medicine surgeon with strong trial prep experience.'),
    createExpert('exp-111', 'Dr. Kofi Mensah', 'Cardiology', 'Philadelphia, PA', 'needs-review', 16, 'Interventional cardiologist with hospital committee work.'),
    createExpert('exp-112', 'Dr. Lena Morris', 'Neurology', 'Austin, TX', 'ready', 47, 'Epilepsy specialist with expert witness history.'),
];

export const cloneSeedExperts = (): Array<SeedExpert> =>
    seededExperts.map((expert) => ({
        ...expert,
        reviewFlag: expert.reviewFlag ? { ...expert.reviewFlag } : null,
    }));
