"use strict";
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    modulePathIgnorePatterns: ['<rootDir>/frontend'],
    globals: {
        'ts-jest': {
            isolatedModules: true,
        },
    },
};
