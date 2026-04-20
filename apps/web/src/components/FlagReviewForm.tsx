import { useState, type FormEvent } from 'react';
import type { CreateReviewFlagRequest, ExpertSummary } from '@challenge/contracts';

type FlagReviewFormProps = {
    expert: ExpertSummary;
    onSubmit: (payload: CreateReviewFlagRequest) => Promise<void>;
};

export const FlagReviewForm = ({ expert, onSubmit }: FlagReviewFormProps) => {
    const [reason, setReason] = useState('');
    const [flaggedBy, setFlaggedBy] = useState('Taylor Reviewer');
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState('');

    const submit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');
        setIsSaving(true);

        try {
            await onSubmit({ reason, flaggedBy });
            setReason('');
        } catch (submissionError) {
            setError(submissionError instanceof Error ? submissionError.message : 'Unable to flag expert');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <form className="flag-form" onSubmit={submit}>
            <h2>Flag {expert.name}</h2>
            <label>
                <span>Reason</span>
                <textarea
                    value={reason}
                    onChange={(event) => setReason(event.target.value)}
                    rows={3}
                    placeholder="What needs review before this profile can move forward?"
                />
            </label>
            <label>
                <span>Flagged by</span>
                <input value={flaggedBy} onChange={(event) => setFlaggedBy(event.target.value)} />
            </label>
            {error ? <p className="error-text">{error}</p> : null}
            <button className="primary-button" type="submit" disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Flag for review'}
            </button>
        </form>
    );
};
