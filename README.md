# AI App Generator

A metadata-driven application runtime that dynamically generates applications from JSON configurations.

## Overview

This project was built as part of the AI Software Engineer Internship assignment (Track A - AI App Generator).

The application dynamically renders different UI components based on user-provided JSON configurations while handling invalid configurations gracefully.

## Features

### Dynamic Form Renderer

Generate forms directly from JSON schemas.

Supported field types:

* Text
* Email
* Number
* Password
* Textarea
* Select

### Dynamic Table Renderer

Generate responsive data tables from JSON configurations.

### Dynamic Dashboard Renderer

Generate dashboard cards and analytics views dynamically.

### Multi-Component App Generation

Render complete application pages containing:

* Dashboards
* Tables
* Forms

from a single JSON configuration.

### Validation & Error Handling

* Invalid JSON detection
* Missing field validation
* Unsupported component handling
* Graceful failure without crashing the application

## Example Configuration

```json
{
  "title": "Admin Portal",
  "components": [
    {
      "type": "dashboard",
      "cards": [
        {
          "title": "Users",
          "value": 120
        }
      ]
    },
    {
      "type": "table",
      "columns": ["Name", "Role"],
      "data": [
        ["Aastha", "Frontend"]
      ]
    }
  ]
}
```

## Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* TailwindCSS

### Backend

* Next.js API Routes

### Database

* PostgreSQL (Neon)
* Prisma ORM

### Deployment

* Vercel

## Project Structure

```text
app/
├── page.tsx
├── api/

components/
├── DynamicForm.tsx
├── DynamicTable.tsx
├── DynamicDashboard.tsx
├── ComponentRenderer.tsx

prisma/
├── schema.prisma
```

## Architecture Decisions

* Component-based rendering architecture
* Configuration-driven UI generation
* Reusable renderer components
* Graceful handling of invalid configurations
* Extensible design for future component types

## Deployment

The application is deployed on Vercel and connected to a Neon PostgreSQL database.

## Future Improvements

* Chart rendering
* Workflow automation
* Authentication
* CSV import/export
* Theme customization
* Drag-and-drop app builder

```
```

