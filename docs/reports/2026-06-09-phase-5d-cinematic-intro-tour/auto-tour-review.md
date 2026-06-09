# Auto Tour Review

## Status
The SmartPlatformTour component was safely **disabled** from auto-starting.

## Why
The prompt specified that intrusive automatic tour behavior should be disabled. The component previously had a setTimeout inside a useEffect to force setOpen(true) after 2400ms. Removing this logic ensures that users are no longer randomly interrupted when loading the page. The component is preserved safely in the DOM (hidden) and can easily be wired to a manual "Start Tour" button in future updates.