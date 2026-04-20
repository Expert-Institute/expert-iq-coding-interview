import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { ExpertTable } from './components/ExpertTable.js';
import { FilterBar } from './components/FilterBar.js';
import { FlagReviewForm } from './components/FlagReviewForm.js';
import { apiClient } from './lib/api.js';
const PAGE_SIZE = 5;
export const App = () => {
    const [experts, setExperts] = useState([]);
    const [availableSpecialties, setAvailableSpecialties] = useState([]);
    const [specialty, setSpecialty] = useState('');
    const [reviewStatus, setReviewStatus] = useState('all');
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedExpert, setSelectedExpert] = useState(null);
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
            }
            catch (loadError) {
                if (!isMounted) {
                    return;
                }
                setError(loadError instanceof Error ? loadError.message : 'Unable to load experts');
            }
            finally {
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
    const handleSubmitFlag = async (payload) => {
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
    return (_jsxs("main", { className: "page-shell", children: [_jsx(FilterBar, { availableSpecialties: availableSpecialties, specialty: specialty, reviewStatus: reviewStatus, onSpecialtyChange: (value) => {
                    setSpecialty(value);
                    setPage(1);
                }, onReviewStatusChange: (value) => {
                    setReviewStatus(value);
                    setPage(1);
                } }), error ? _jsx("p", { className: "error-banner", children: error }) : null, _jsxs("section", { className: "content-grid", children: [_jsx("div", { children: loading ? (_jsx("div", { className: "table-card", children: _jsx("p", { children: "Loading experts..." }) })) : (_jsx(ExpertTable, { experts: experts, total: total, page: page, pageSize: PAGE_SIZE, onPageChange: setPage, onSelectExpert: setSelectedExpert, selectedExpertId: selectedExpert?.id ?? null })) }), _jsx("aside", { className: "side-panel", children: selectedExpert ? (selectedExpert.reviewFlag ? (_jsxs("section", { className: "flag-card", children: [_jsx("p", { className: "eyebrow", children: "Current flag" }), _jsx("h2", { children: selectedExpert.name }), _jsx("p", { children: selectedExpert.reviewFlag.reason }), _jsxs("small", { children: [selectedExpert.reviewFlag.flaggedBy, " on ", new Date(selectedExpert.reviewFlag.flaggedAt).toLocaleString()] })] })) : (_jsx(FlagReviewForm, { expert: selectedExpert, onSubmit: handleSubmitFlag }))) : (_jsxs("section", { className: "flag-card empty", children: [_jsx("p", { className: "eyebrow", children: "Next action" }), _jsx("h2", { children: "Select an expert" }), _jsx("p", { children: "Choose a row to capture a review flag and keep the queue moving." })] })) })] })] }));
};
