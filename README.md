# Beon-Challenge
Public repository for Beon Challenge which includes both the API and UI Automation Challenges.
2nd contributor was accidental due to using my other account without noticing while making the commits



# How to run
In order to run the project, do the following please:
- Run 'npm ci'
- Then run any of the following commands depending on what is desired to be verified:
- npm test - Runs all specs headless
- npm run test:api - Runs only the API specs (cypress/e2e/api/)
- npm run test:ui - Runs only the UI specs (cypress/e2e/ui/)
- npm run cy:open - Opens the interactive Cypress runner
- npm run typecheck - Runs tsc for a type check
