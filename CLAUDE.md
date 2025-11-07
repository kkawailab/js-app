# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a client-side JavaScript application for visualizing statistical data from the e-Stat API (Japan's Official Statistics Bureau). It runs entirely in the browser with no build process or backend server required.

**Key characteristics:**
- Pure HTML/CSS/JavaScript (no build tools, no npm)
- All dependencies loaded via CDN
- Single-page application with ~2,600 lines of code
- Data persistence via localStorage with cookie fallback

## Running the Application

**Development:**
```bash
# Simply open index.html in a browser
open index.html  # macOS
xdg-open index.html  # Linux
start index.html  # Windows
```

**Requirements:**
- Modern web browser (Chrome, Safari, Firefox, Edge)
- Internet connection for CDN libraries and e-Stat API access
- e-Stat API AppId (obtain from http://www.e-stat.go.jp/api/)

**Local testing:**
- Works directly from file system in most browsers
- IE11 requires a web server for full functionality (file upload/localStorage)
- For local server: `python -m http.server 8000` or any static file server

**Loading data:**
1. Click "データの追加等" (Add Data)
2. Enter statistical IDs in the text boxes
3. Click "ロード" (Load)
4. Or use URL parameters: `?statIds=ID1,ID2`

## Architecture

### Core Components (main.js)

The application uses prototypal inheritance with a component-based architecture:

**1. estatAPI (lines 42-128)**
- Promise-based wrapper for e-Stat API calls
- Three API methods: GET_STATS_LIST, GET_META_INFO, GET_STATS_DATA
- Supports both API data and user-uploaded JSON data

**2. Event System (lines 135-168)**
- Custom `eventer` class implementing pub/sub pattern
- Methods: `on()`, `off()`, `emit()`, `trigger()`
- Decouples data flow between components

**3. View Hierarchy (lines 175-737)**
```
viewer (base prototype)
├── loading_view
├── side_bar
├── selector_view
├── list_view
├── list_dialog_view
├── modal_view
│   └── config_dialog_view
└── data_panel_view
```

All views inherit from `viewer` base using `Object.create()` and communicate via events.

**4. Data Class (lines 739-930)**
- Central state management for statistical datasets
- Manages two concurrent datasets (X and Y axes for scatter plots)
- Handles metadata/data fetching from API
- Implements filter management for statistical dimensions
- Emits events: "start", "stop", "draw", "ready", "fetched"

**5. Visualization Components (lines 1034-1517)**
```
visualization_view (orchestrator)
├── chart_view (D3.js)
│   ├── Bar chart
│   ├── Line chart
│   └── Scatter plot
├── map_view (Leaflet.js)
└── table_view
```

**6. App Class (lines 1579-1787)**
- Main application controller
- Manages AppId persistence (localStorage/cookies)
- Initializes all components and wires events
- Parses URI parameters for stat ID loading

### Data Flow

```
User Action → App/UI Components
    ↓
Data.fetch_meta_data() → estatAPI()
    ↓
Data emits "fetched" event
    ↓
UI updates (selectors, filters)
    ↓
User selects axis/filters
    ↓
Data.fetch_data() → estatAPI()
    ↓
Data emits "draw" event
    ↓
visualization_view renders chart/map/table
```

### Important Patterns

**Prototypal Inheritance:**
```javascript
function MyView() {
    viewer.call(this);  // Call parent constructor
}
MyView.prototype = Object.create(viewer.prototype, {
    constructor: { value: MyView, enumerable: false }
    // Define properties with descriptors
});
```

**Event-driven updates:**
- Data class emits events when state changes
- Views listen via `.on("event", handler)`
- Enables loose coupling between model and views

**Dual dataset support:**
- `Data.data[0]` and `Data.data[1]` hold two independent datasets
- Scatter plots compare X axis (dataset 0) vs Y axis (dataset 1)
- Other charts use only dataset 0

**Metadata-driven UI:**
- Filters and selectors dynamically generated from API metadata
- Supports any e-Stat dataset without code changes
- Metadata structure drives dimension/category filtering

## File Structure

```
js-app/
├── index.html              - Complete HTML structure with embedded prefecture coordinates
├── style.css               - Styling and base64-encoded SVG icons
├── main.js                 - Main application components (views, Data class, App class)
├── js/
│   ├── core/
│   │   ├── constants.js    - Application constants (chart types, margins, animation settings)
│   │   ├── utils.js        - Utility functions (tooltip, error handling, query building)
│   │   └── eventer.js      - Event system (Pub/Sub pattern)
│   └── api/
│       └── estatAPI.js     - e-Stat API wrapper with Promise-based interface
├── README.md               - Japanese documentation
└── CLAUDE.md               - This file

## Common Modifications

**Adding a new chart type:**
1. Define constant in `Data` class (e.g., `Data.CHART_TYPE_NEW = 4`)
2. Add case in `chart_view.draw()` method
3. Implement D3.js rendering logic
4. Add icon to style.css and selector

**Modifying API calls:**
- Edit `estatAPI.config` object for API URLs
- Modify `estatAPI.buildUrl()` for query parameters
- Update Promise handlers in `Data.fetch_meta_data()` and `Data.fetch_data()`

**Adding new filters:**
- Filters are auto-generated from metadata
- Modify `data_panel_view` constructor to customize filter UI
- Update `Data.data[index].filters` structure

**Custom data format:**
JSON must match e-Stat API structure:
```json
{
  "METADATA": { /* Same as GET_META_INFO response */ },
  "STATDATA": { /* Same as GET_STATS_DATA response */ }
}
```

## Dependencies (CDN)

- jQuery 2.1.4 - DOM manipulation and AJAX
- jQuery UI 1.11.4 - Resizable/dialog widgets
- D3.js v3 - Data visualization
- Leaflet.js 0.7.7 - Map rendering
- ES6 Promise Polyfill 3.0.2 - Browser compatibility

Note: Libraries are from 2016 and use HTTP (not HTTPS) for some resources.

## Japanese Prefecture Data

Hard-coded in `index.html` as `pref_points` object with lat/long coordinates for all 47 prefectures. Used by `map_view` for geographic visualization.

## localStorage Usage

**Keys:**
- `estat-appid` - Stored e-Stat API AppId
- `userData` - Custom uploaded JSON data

**Fallback:**
- Cookies used if localStorage unavailable
- IE11 requires web server for file operations

## Recent Improvements (Refactoring)

The codebase has been refactored with the following improvements:

1. **Security fixes**: All HTTP URLs changed to HTTPS
2. **Bug fixes**: Removed `throw false;` from chart rendering
3. **Error handling**: Added user-facing error messages with visual feedback
4. **Modularization**: Split main.js into logical modules:
   - `js/core/constants.js` - Centralized configuration
   - `js/core/utils.js` - Utility functions
   - `js/core/eventer.js` - Event system
   - `js/api/estatAPI.js` - API wrapper
5. **Constants extraction**: Magic numbers replaced with named constants
6. **Cookie handling**: Improved cookie parsing to handle multiple cookies correctly

## Known Limitations

- Old library versions from 2016 (jQuery 2.1.4, D3 v3)
- No unit tests
- Minimal inline documentation
- Japanese-only UI (no internationalization)
