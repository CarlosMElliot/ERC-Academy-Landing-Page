# ERC Academy Instagram Publishing Workflow

## Target
Instagram account: **@erc.nic**

## Standard workflow
1. Generate the approved ERC Academy poster.
2. Create the Spanish Instagram caption.
3. Convert final artwork to JPEG if required.
4. Upload image to ERC Academy Publisher.
5. Prepare Instagram container.
6. Check container status until FINISHED.
7. Publish only after user authorization.
8. Record the post as published in POST_LOG.md.

## Current integration note
As of 2026-09-28, the ERC Academy Publisher account connection is healthy, but the temporary image transfer step is failing from the execution runtime because the generated upload host cannot be resolved:

steep-lake-7e78.ntpointless-education.workers.dev

Observed error:
curl: (6) Could not resolve host

The issue is in the temporary upload network/DNS path, not Instagram authentication, quota, image validity, or caption preparation.

## Cloudflare recommendation
Prefer a stable custom domain such as:
publisher.ercacademynic.com

Keep the workers.dev route enabled during migration.

## Safety against duplicates
If an upload or publication result is ambiguous:
- do not create a replacement automatically
- check the existing receipt/status first
- do not retry publishing blindly
