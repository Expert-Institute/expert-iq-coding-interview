import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
export const FlagReviewForm = ({ expert, onSubmit }) => {
    const [reason, setReason] = useState('');
    const [flaggedBy, setFlaggedBy] = useState('Taylor Reviewer');
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState('');
    const submit = async (event) => {
        event.preventDefault();
        setError('');
        setIsSaving(true);
        try {
            await onSubmit({ reason, flaggedBy });
            setReason('');
        }
        catch (submissionError) {
            setError(submissionError instanceof Error ? submissionError.message : 'Unable to flag expert');
        }
        finally {
            setIsSaving(false);
        }
    };
    return (_jsxs("form", { className: "flag-form", onSubmit: submit, children: [_jsxs("h2", { children: ["Flag ", expert.name] }), _jsxs("label", { children: [_jsx("span", { children: "Reason" }), _jsx("textarea", { value: reason, onChange: (event) => setReason(event.target.value), rows: 3, placeholder: "What needs review before this profile can move forward?" })] }), _jsxs("label", { children: [_jsx("span", { children: "Flagged by" }), _jsx("input", { value: flaggedBy, onChange: (event) => setFlaggedBy(event.target.value) })] }), error ? _jsx("p", { className: "error-text", children: error }) : null, _jsx("button", { className: "primary-button", type: "submit", disabled: isSaving, children: isSaving ? 'Saving...' : 'Flag for review' })] }));
};
