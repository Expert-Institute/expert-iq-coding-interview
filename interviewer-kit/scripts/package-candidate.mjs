import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..', '..');
const outputRoot = path.resolve(repoRoot, 'interviewer-kit', 'candidate-bundle');
const outputDir = path.resolve(outputRoot, 'expert-review-challenge-candidate');

const shouldCopy = (source) => {
    const relativePath = path.relative(repoRoot, source);

    if (!relativePath) {
        return true;
    }

    const firstSegment = relativePath.split(path.sep)[0];
    return !['interviewer-kit', 'node_modules', 'dist', 'coverage', '.git'].includes(firstSegment);
};

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });
await mkdir(outputDir, { recursive: true });

for (const entryName of ['.gitignore', 'README.md', 'package.json', 'package-lock.json', 'tsconfig.base.json', 'tsconfig.json', 'eslint.config.js', 'apps', 'packages']) {
    const source = path.resolve(repoRoot, entryName);
    const destination = path.resolve(outputDir, entryName);

    await cp(source, destination, {
        recursive: true,
        filter: shouldCopy,
    });
}

const candidateReadme = await readFile(path.resolve(repoRoot, 'interviewer-kit', 'candidate-docs', 'README.md'), 'utf8');
await writeFile(path.resolve(outputDir, 'README.md'), candidateReadme);

console.log(`Candidate bundle created at ${outputDir}`);
