# USER FLOWS
**CEO AI - Primary User Flows**  
**Last Updated**: 2025-12-24

This document traces the primary user flows through the application, identifying entry points, state mutations, async boundaries, failure points, and persistence.

---

## FLOW 1: Initial Onboarding

### Entry Point
- User visits `/` (app/page.tsx)

### Flow Steps
1. **Step 1: Industry Selection**
   - User selects industry from predefined list
   - State: `onboardingData.industry` updated
   - No validation
   - No persistence yet

2. **Step 2: Business Type**
   - User selects business type
   - State: `onboardingData.businessType` updated

3. **Step 3: Business Details**
   - User inputs years in business, team size, revenue
   - State: Multiple fields updated
   - No validation on input

4. **Step 4: Goals Selection**
   - User selects primary goals (checkboxes)
   - State: `onboardingData.primaryGoals` array updated

5. **Step 5: Challenges**
   - User selects current challenges
   - State: `onboardingData.currentChallenges` array updated

6. **Step 6: Technology Comfort**
   - User selects comfort level
   - State: `onboardingData.technologyComfort` updated

7. **Completion**
   - Calls `saveOnboardingData(onboardingData)`
   - **Persistence Point**: Writes to `localStorage['ceo-ai-onboarding']`
   - **Async Boundary**: `setTimeout` for 2 second delay
   - **Navigation**: Redirects to `/dashboard` via `window.location.href`

### Failure Points
- localStorage quota exceeded → Silent failure, still redirects
- localStorage disabled → Error logged, still redirects
- No error shown to user

### Exit Conditions
- Always redirects to `/dashboard` after 2 seconds
- No way to go back once started

---

## FLOW 2: Dashboard View

### Entry Point
- User navigates to `/dashboard` (app/dashboard/page.tsx)

### Flow Steps
1. **Initial Load**
   - **Async Boundary**: `useEffect` on mount
   - Reads from localStorage:
     - `ceo-ai-onboarding`
     - `ceo-ai-business-plans`
     - `ceo-ai-contacts`
     - `ceo-ai-financial-records`
   - **State Mutations**: Sets multiple state variables
   - **Persistence Point**: Reads only, no writes

2. **Tab Navigation**
   - User clicks tabs (Dashboard, Plans, Goals, Network, Accounting)
   - State: `activeTab` updated
   - No persistence
   - No URL update

3. **CEO Agenda Display**
   - **Async Boundary**: `setTimeout` after 1.5 seconds
   - Checks `sessionStorage['ceoAgendaShown']`
   - If not shown, displays modal
   - **Persistence Point**: Writes to sessionStorage

4. **Data Calculations**
   - **Async Boundary**: `useEffect` when data changes
   - Calculates KPIs from loaded data
   - Pure computation, no side effects
   - Updates local state only

### Failure Points
- localStorage read fails → Returns empty arrays/null
- Malformed JSON in localStorage → JSON.parse throws, crashes app
- No error boundaries → Entire app crashes

### Exit Conditions
- User navigates away via sidebar
- User closes browser (state lost)

---

## FLOW 3: Client Management

### Entry Point
- User navigates to `/clients` (app/clients/page.tsx)

### Flow Steps
1. **Load Clients**
   - **Persistence Point**: Reads `localStorage['ceo-ai-contacts']`
   - Filters for `relationshipType === 'client'`
   - **State Mutation**: Sets `contacts` state

2. **Add New Client**
   - User clicks "Add Client"
   - Modal opens
   - User fills form (name, email, company, etc.)
   - **No Validation**: Accepts any input
   - User clicks "Save"
   - **State Mutation**: Creates new Contact object
   - **Persistence Point**: Calls `saveContact(contact)`
     - Reads existing contacts
     - Appends new contact
     - Writes to localStorage
   - Modal closes
   - **State Mutation**: Refreshes contacts list

3. **Edit Client**
   - User clicks edit icon
   - Modal opens with pre-filled data
   - User modifies fields
   - User clicks "Save"
   - **Persistence Point**: Calls `updateContact(contactId, updates)`
     - Reads all contacts
     - Finds and updates specific contact
     - Writes back to localStorage
   - Modal closes
   - **State Mutation**: Refreshes contacts list

4. **Delete Client**
   - User clicks delete icon
   - **No Confirmation**: Immediately deletes
   - **Persistence Point**: Calls `removeContact(contactId)`
     - Filters out contact
     - Writes to localStorage
   - **State Mutation**: Refreshes contacts list

5. **URL Import (Mock)**
   - User clicks "Import from URL"
   - Modal opens
   - User enters URL
   - **Async Boundary**: `setTimeout` simulates API call
   - **No Real Network Call**: Just pattern matching
   - Returns mock data
   - User can save to contacts

### Failure Points
- localStorage quota exceeded → Silent failure
- Duplicate IDs → Data corruption possible
- No validation → Invalid data can be saved
- Delete has no confirmation → Accidental deletion
- No undo functionality

### Exit Conditions
- User navigates away
- Data persisted in localStorage

---

## FLOW 4: Document Upload

### Entry Point
- User navigates to `/documents` (app/documents/page.tsx)

### Flow Steps
1. **Load Documents**
   - **Persistence Point**: Reads `localStorage['ceo-ai-documents']`
   - **State Mutation**: Sets `documents` state

2. **Upload Document**
   - User selects file(s) via file input
   - **Async Boundary**: `FileReader.readAsDataURL()`
   - Converts file to base64 data URL
   - **State Mutation**: `isUploading` set to true
   - For each file:
     - Creates DocumentItem with base64 data
     - **Persistence Point**: Calls `saveDocument()`
       - Writes to localStorage
   - **State Mutation**: `isUploading` set to false
   - Refreshes document list

3. **Download Document**
   - User clicks download icon
   - Creates temporary `<a>` element
   - Sets href to base64 data URL
   - Triggers download
   - Removes element
   - **No Async**: Synchronous operation

4. **Delete Document**
   - User clicks delete icon
   - **No Confirmation**: Immediately deletes
   - **Persistence Point**: Calls `removeDocument(documentId)`
   - Refreshes document list

### Failure Points
- Large files → localStorage quota exceeded
- Base64 encoding → 33% size increase
- No file size limit → Can crash browser
- No file type validation → Any file accepted
- Delete has no confirmation → Accidental deletion

### Exit Conditions
- User navigates away
- Documents stored in localStorage (with base64 data)

---

## FLOW 5: AI Chat Interaction (Fake)

### Entry Point
- User clicks floating chat button (AIChatAssistant.tsx)

### Flow Steps
1. **Open Chat**
   - **State Mutation**: `isOpen` set to true
   - Modal appears

2. **Voice Recognition**
   - User clicks microphone button
   - **Async Boundary**: Requests microphone permission
   - **Browser API**: `navigator.mediaDevices.getUserMedia()`
   - If granted, starts Web Speech API
   - **Async Boundary**: Speech recognition events
   - Transcribes speech to text
   - **State Mutation**: Adds user message
   - Calls `handleVoiceCommand(transcript)`

3. **Generate Response**
   - **No Real AI**: Pattern matching only
   - Checks message for keywords
   - Determines navigation target
   - Generates canned response
   - **State Mutation**: Adds AI message
   - If navigation target, redirects after delay

4. **Text Input**
   - User types message
   - User presses Enter or clicks send
   - **State Mutation**: Adds user message
   - Calls `generateAIResponse()`
   - Same pattern matching as voice
   - **State Mutation**: Adds AI response

### Failure Points
- Microphone permission denied → Alert shown
- Speech recognition not supported → Silent failure
- No real AI → Limited functionality
- Pattern matching fragile → Many queries fail

### Exit Conditions
- User closes chat
- User navigates away
- Messages not persisted

---

## COMMON PATTERNS

### Persistence Pattern
```
Component → lib/storage.ts → localStorage
```
- No validation layer
- No error handling
- No retry logic
- No data migration

### Error Handling Pattern
```
try {
  // operation
} catch (error) {
  console.error(error)
  // Continue anyway
}
```
- Errors logged but not shown to user
- No recovery mechanisms
- Silent failures common

### State Management Pattern
```
useState → useEffect → localStorage
```
- No global state
- Each component manages own state
- No state synchronization
- Duplicate reads from localStorage

---

**END OF USER FLOWS**

