# Quasar shared

Any commonly used APIs that are not part of the core Quasar framework.

Main features:

- Composition APIs
  - Extendable persistence Registry (introducing Collection, Doc, and Schema interfaces)
    - In-memory (reference implementation)
    - Firestore
    - TODO: Postgres
    - TODO: Algolia
  - Promises
  - Firebase
    - Auth
    - Cloud Functions
    - RTDB
    - Storage
- Vue components
  - Admin scaffolds using persistence Registry model schemas
    - Add / edit form
    - Table
    - TODO: Detail view
    - TODO: Navigation menu
  - Inputs
    - Date picker
    - Markdown editor
    - Value select
    - Doc select
    - Number
    - Single-line text
    - (Firebase Storage) file upload
  - Renderers
    - Date
    - Markdown
    - (Linked) Doc
    - Currency
    - TODO: (Firebase Storage) download link
  - TODO: Current user profile menu

## Usage

TODO: Getting started and 1-pager of usage sample code

### Canonical project

- https://github.com/gcto/ArtBlock
- 
