import type { ReviewStatus } from '@challenge/contracts';

type FilterBarProps = {
    availableSpecialties: Array<string>;
    specialty: string;
    reviewStatus: ReviewStatus;
    onSpecialtyChange: (value: string) => void;
    onReviewStatusChange: (value: ReviewStatus) => void;
};

export const FilterBar = ({
    availableSpecialties,
    specialty,
    reviewStatus,
    onSpecialtyChange,
    onReviewStatusChange,
}: FilterBarProps) => (
    <section className="filter-card">
        <div>
            <p className="eyebrow">Review queue</p>
            <h1>Expert profile review</h1>
            <p className="lede">Scan readiness, filter the queue, and flag profiles that need a closer pass from the internal team.</p>
        </div>
        <div className="filters">
            <label>
                <span>Specialty</span>
                <select value={specialty} onChange={(event) => onSpecialtyChange(event.target.value)}>
                    <option value="">All specialties</option>
                    {availableSpecialties.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </label>
            <label>
                <span>Status</span>
                <select value={reviewStatus} onChange={(event) => onReviewStatusChange(event.target.value as ReviewStatus)}>
                    <option value="all">All experts</option>
                    <option value="open">Open review queue</option>
                    <option value="flagged">Already flagged</option>
                </select>
            </label>
        </div>
    </section>
);
