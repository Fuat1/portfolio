// Guards the "Download CV" button: public/cv.pdf must be a real PDF before the site can deploy.
// Fails in CI (CI=true, set by GitHub Actions); only warns on local builds.
import { existsSync, readFileSync } from 'node:fs';

const CV_PATH = 'public/cv.pdf';
const PLACEHOLDER_MARKER = 'PORTFOLIO-CV-PLACEHOLDER';
const strict = process.env.CI === 'true';

function problem(message) {
  if (strict) {
    console.error(`✖ ${message}`);
    process.exit(1);
  }
  console.warn(`⚠ ${message} (allowed locally; CI will fail)`);
}

if (!existsSync(CV_PATH)) {
  problem(`${CV_PATH} is missing. Add your CV there; the "Download CV" button serves it.`);
} else {
  const pdf = readFileSync(CV_PATH);
  if (pdf.subarray(0, 5).toString() !== '%PDF-') problem(`${CV_PATH} is not a PDF.`);
  else if (pdf.includes(PLACEHOLDER_MARKER)) problem(`${CV_PATH} is the local placeholder. Replace it with your real CV.`);
  else console.log(`✔ ${CV_PATH} (${Math.round(pdf.length / 1024)} KB)`);
}
