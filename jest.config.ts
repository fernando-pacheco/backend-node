module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    transform: {
        "^.+\\.ts$": ["ts-jest", { isolatedModules: true }],
    },
    collectCoverage: true,
    coverageThreshold: {
        global: {
            functions: 80,
            lines: 80,
            statements: 80,
        },
    },
}
