module.exports = {
    '(pages|components)/*.(ts|tsx)': () => 'yarn tsc --noEmit',
    '**/*.(ts|tsx|js)': (filenames) => [
        `yarn eslint ${filenames.join(' ')}`,
        `yarn prettier -w ${filenames.join(' ')}`,
    ],
};
