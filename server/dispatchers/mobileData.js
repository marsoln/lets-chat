const STATES = {
    SUCCESS: 1,
    WARNING: 0,
    FAIL: 2,
    UNAUTHENTICATED: 4001,
    INTERNAL_ERR: 500,
}

module.exports = {
    SUCCESS: (data) => { return { type: STATES.SUCCESS, data: data } },
    FAIL: (data) => { return { type: STATES.FAIL, data: data } },
    WARNING: (data) => { return { type: STATES.WARNING, data: data } },
    UNAUTHENTICATED: (data) => { return { type: STATES.UNAUTHENTICATED, data: data } },
    INTERNAL_ERR: (data) => { return { type: STATES.INTERNAL_ERR, data: data } },
}