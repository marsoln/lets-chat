const STATES = {
    SUCCESS: 1,
    WARNING: 0,
    FAIL: 2,
    UNAUTHENTICATED: 4001,
    INTERNAL_ERR: 500,
}

module.exports = {
    SUCCESS: (_data) => { return { type: STATES.SUCCESS, data: _data } },
    FAIL: (_data) => { return { type: STATES.FAIL, data: _data } },
    WARNING: (_data) => { return { type: STATES.WARNING, data: _data } },
    UNAUTHENTICATED: (_data) => { return { type: STATES.UNAUTHENTICATED, data: _data } },
    INTERNAL_ERR: (_data) => { return { type: STATES.INTERNAL_ERR, data: _data } },
}
