import { useEffect, useState } from 'react';
import type { ExpertSummary, ReviewStatus } from '@challenge/contracts';

import { ExpertTable } from './components/ExpertTable.js';
import { FilterBar } from './components/FilterBar.js';
import { FlagReviewForm } from './components/FlagReviewForm.js';
import { apiClient } from './lib/api.js';

const PAGE_SIZE = 5;

export const App = () => {
    const [experts, setExperts] = useState<Array<ExpertSummary>>([]);
    const [availableSpecialties, setAvailableSpecialties] = useState<Array<string>>([]);
    const [specialty, setSpecialty] = useState('');
    const [reviewStatus, setReviewStatus] = useState<ReviewStatus>('all');
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedExpert, setSelectedExpert] = useState<ExpertSummary | null>(null);

    useEffect(() => {
        let isMounted = true;

        const load = async () => {
            setLoading(true);
            setError('');

            try {
                const response = await apiClient.listExperts({
                    specialty: specialty || undefined,
                    reviewStatus,
                    page,
                    pageSize: PAGE_SIZE,
                });

                if (!isMounted) {
                    return;
                }

                setExperts(response.items);
                setAvailableSpecialties(response.availableSpecialties);
                setTotal(response.pagination.total);
            } catch (loadError) {
                if (!isMounted) {
                    return;
                }

                setError(loadError instanceof Error ? loadError.message : 'Unable to load experts');
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        void load();

        return () => {
            isMounted = false;
        };
    }, [page, reviewStatus, specialty]);

    const handleSubmitFlag = async (payload: { reason: string; flaggedBy: string }) => {
        if (!selectedExpert) {
            return;
        }

        const response = await apiClient.createReviewFlag(selectedExpert.id, payload);
        setExperts((currentExperts) => {
            if (reviewStatus === 'open') {
                return currentExperts.filter((expert) => expert.id !== response.expert.id);
            }

            return currentExperts.map((expert) => (expert.id === response.expert.id ? response.expert : expert));
        });
        if (reviewStatus === 'open') {
            setTotal((currentTotal) => Math.max(0, currentTotal - 1));
        }
        setSelectedExpert(response.expert);
    };

    return (
        <main className="page-shell">
            <FilterBar
                availableSpecialties={availableSpecialties}
                specialty={specialty}
                reviewStatus={reviewStatus}
                onSpecialtyChange={(value) => {
                    setSpecialty(value);
                    setPage(1);
                }}
                onReviewStatusChange={(value) => {
                    setReviewStatus(value);
                    setPage(1);
                }}
            />

            {error ? <p className="error-banner">{error}</p> : null}

            <section className="content-grid">
                <div>
                    {loading ? (
                        <div className="table-card">
                            <p>Loading experts...</p>
                        </div>
                    ) : (
                        <ExpertTable
                            experts={experts}
                            total={total}
                            page={page}
                            pageSize={PAGE_SIZE}
                            onPageChange={setPage}
                            onSelectExpert={setSelectedExpert}
                            selectedExpertId={selectedExpert?.id ?? null}
                        />
                    )}
                </div>
                <aside className="side-panel">
                    {selectedExpert ? (
                        selectedExpert.reviewFlag ? (
                            <section className="flag-card">
                                <p className="eyebrow">Current flag</p>
                                <h2>{selectedExpert.name}</h2>
                                <p>{selectedExpert.reviewFlag.reason}</p>
                                <small>
                                    {selectedExpert.reviewFlag.flaggedBy} on {new Date(selectedExpert.reviewFlag.flaggedAt).toLocaleString()}
                                </small>
                            </section>
                        ) : (
                            <FlagReviewForm expert={selectedExpert} onSubmit={handleSubmitFlag} />
                        )
                    ) : (
                        <section className="flag-card empty">
                            <p className="eyebrow">Next action</p>
                            <h2>Select an expert</h2>
                            <p>Choose a row to capture a review flag and keep the queue moving.</p>
                        </section>
                    )}
                </aside>
            </section>
        </main>
    );
};
