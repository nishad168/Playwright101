# Playwright 101 Certification Coding Assignment

Folder structure:

playwright/
├── .env                   # Environment secrets for TestMu AI credentials (ignored)
├── .gitignore             # Git ignore file for secrets and reports
├── package.json           # Scripts and project dependencies
├── playwright.config.ts   # Local & remote parallel grid execution settings
├── README.md              # Project documentation and structure (this file)
└── tests/
    └── assignment1_simpleformdemo.spec.ts # test specifications for Scenario 1
    └── assignment2_dragndrop.spec.ts    # test specifications for Scenario 2
    └── assignment3_inputform.spec.ts    # test specifications for Scenario 3

Execution Commands:

1. Install Dependencies
npm install
2. Run Locally (Headless Chromium)
npm run test:local
3. Run on TestMu AI Cloud Grid (Parallel Execution)
Ensure your .env contains your LT_USERNAME and LT_ACCESS_KEY credentials, then run:
npm test
