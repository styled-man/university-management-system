/**
 * @type {import('prettier').Config}
 */
module.exports = {
    tabWidth: 4,
    printWidth: 120,
    arrowParens: "avoid",
    semi: false,
    overrides: [
        {
            files: ["*.json", "*.yml"],
            options: {
                tabWidth: 2,
            },
        },
    ],
}
