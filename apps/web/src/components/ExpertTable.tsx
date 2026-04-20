import type { ExpertSummary } from '@challenge/contracts';

type ExpertTableProps = {
    experts: Array<ExpertSummary>;
    total: number;
    page: number;
    pageSize: number;
    onPageChange: (page: number) => void;
    onSelectExpert: (expert: ExpertSummary) => void;
    selectedExpertId: string | null;
};

const readinessTone: Record<ExpertSummary['readiness'], string> = {
    ready: 'tone-ready',
    'needs-review': 'tone-review',
    blocked: 'tone-blocked',
};

export const ExpertTable = ({
    experts,
    total,
    page,
    pageSize,
    onPageChange,
    onSelectExpert,
    selectedExpertId,
}: ExpertTableProps) => {
    const totalPages = Math.max(1, Math.ceil(total / pageSize));

    return (
        <section className="table-card">
            <div className="table-header">
                <div>
                    <p className="eyebrow">Queue snapshot</p>
                    <h2>{total} experts in scope</h2>
                </div>
                <p className="table-meta">
                    Page {page} of {totalPages}
                </p>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Expert</th>
                        <th>Specialty</th>
                        <th>Readiness</th>
                        <th>Review flag</th>
                        <th aria-label="Action column"></th>
                    </tr>
                </thead>
                <tbody>
                    {experts.map((expert) => (
                        <tr key={expert.id} data-testid={`expert-row-${expert.id}`}>
                            <td>
                                <strong>{expert.name}</strong>
                                <p>{expert.location}</p>
                                <small>{expert.bioSnippet}</small>
                            </td>
                            <td>{expert.specialty}</td>
                            <td>
                                <span className={`pill ${readinessTone[expert.readiness]}`}>{expert.readiness}</span>
                            </td>
                            <td>
                                {expert.reviewFlag ? (
                                    <div>
                                        <strong>Flagged</strong>
                                        <p>{expert.reviewFlag.reason}</p>
                                        <small>{expert.reviewFlag.flaggedBy}</small>
                                    </div>
                                ) : (
                                    <span className="muted">Open</span>
                                )}
                            </td>
                            <td>
                                <button
                                    className={selectedExpertId === expert.id ? 'secondary-button selected' : 'secondary-button'}
                                    onClick={() => onSelectExpert(expert)}
                                    disabled={Boolean(expert.reviewFlag)}
                                >
                                    {expert.reviewFlag ? 'Already flagged' : 'Flag'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pager">
                <button className="secondary-button" onClick={() => onPageChange(page - 1)} disabled={page <= 1}>
                    Previous
                </button>
                <button className="secondary-button" onClick={() => onPageChange(page + 1)} disabled={page >= totalPages}>
                    Next
                </button>
            </div>
        </section>
    );
};
