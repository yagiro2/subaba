const debouncify = (func, delayMs) => {
    let tid;
    return (...args) => {
        if (tid) clearTimeout(tid);
        tid = setTimeout(() => func(...args), delayMs);
    };
};

export default debouncify;