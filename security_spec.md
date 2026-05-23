# security_spec.md

## 1. Data Invariants
- **Identity Integrity**: For any document created, the `userId` in the document must strictly equal the authenticated user's ID (`request.auth.uid`). Users cannot spoof their identity by assigning pages to other users.
- **Ownership Partition**: Access to read or query (list) unpublished landing pages is strictly restricted to the resource owner (`resource.data.userId == request.auth.uid`).
- **Public Visibility Access**: If a landing page has `isPublished == true`, any visitor is authorized to fetch ('get') the page, but NOT list all pages or update them.
- **Temporal Enforcement**: The `createdAt` field on creation and `updatedAt` field on update must strictly correspond to the server timestamp `request.time`.
- **System Integrity (Immortal Fields)**: The fields `userId` and `createdAt` are immutable after creation and cannot be modified.

## 2. The "Dirty Dozen" Payloads (Abuse Attempts)

1. **Spoofed Ownership on Create**: Setting `userId` of a new page to another user's UID.
2. **Missing Author Authentication**: Attempting to create a landing page as an unauthenticated guest.
3. **Invalid Identity Update**: Attempting to transfer ownership of an existing page by editing `userId`.
4. **Invalid Type for Product Name**: Passing an array or number instead of a string in `productName`.
5. **Too Long Name (Denial of Wallet)**: Setting `productName` to a 50KB repetitive character string.
6. **Bypassing Server Timestamps (Create)**: Overriding `createdAt` with a static prehistoric client-side timestamp instead of `request.time`.
7. **Bypassing Server Timestamps (Update)**: Overriding `updatedAt` with a custom client-side string instead of `request.time`.
8. **Malicious ID Poisoning**: Specifying a 1KB document ID with non-alphanumeric symbols during design target writes.
9. **Blanket Query Exploitation**: An attacker attempting to fetch the list of all landing pages without restricting queries to their own UID.
10. **Unauthorized Read of Unpublished Page**: User B trying to execute direct 'get' on User A's private, unpublished landing page.
11. **Malicious Ghost Field Insertion**: Trying to update `pageData` with unmapped fields like `unapprovedField` or system overrides.
12. **Tampering with Terminal State / Immortal Keys**: Attempting to alter `createdAt` on update.

## 3. Test Scenarios and Rules Mapping

Our `firestore.rules` will enforce:
- `allow read (get)`: if the owner matches, OR if the document `isPublished` is true.
- `allow list`: if the owner matches (no blanket reads).
- `allow create`: if user is authenticated, has email verified, the document ID is valid, the payload meets the strict `isValidLandingPage` definition, and `userId` matches `request.auth.uid`.
- `allow update`: if owner matches, the page transitions correctly, fields like `userId` and `createdAt` are unchanged, and `updatedAt` matches the server time.
- `allow delete`: if the owner matches.
