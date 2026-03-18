# Property Stories — Implementation Guide

## Overview

The **Property Stories** block (`src/components/blocks/listing/PropertyStories.tsx`) implements an Instagram-style story carousel for property discovery. It is used in the listing page `/properties3` (`LuxuryPropertyListingV3`) above the property results.

## Current Behavior

- **Story Groups**: 5 curated categories: Trending, Best €/m², 1ª Línea (Beachfront), New Listing, Most Saved.
- **Each group** contains 3 sample properties shown as full-screen stories.
- **Auto-advance**: 10 seconds per property slide, 8 seconds for the end card.
- **Progress bars**: Segmented progress indicators at the top (one per property + end card).
- **End card**: Summary screen showing total count in category + CTA button to view all.
- **Viewed state**: Story circles dim (grey border) after the user has viewed them. An "Al día" (all caught up) indicator appears when all groups are viewed.
- **Navigation**: Tap left 1/3 = previous, tap right 2/3 = next. Stories auto-advance across groups.

## Component Architecture

```
PropertyStories (main strip — horizontal scroll of circles)
└── StoryViewer (fullscreen overlay — triggered on circle click)
    ├── Progress bars (segmented, animated via requestAnimationFrame)
    ├── Property slide (image + info card + "View Property" CTA)
    └── End card (gradient bg + total count + "View all" CTA)
```

## Data Structure

```typescript
interface StoryGroup {
  id: string;           // Unique identifier (e.g., "trending")
  label: string;        // Display name (e.g., "Trending")
  icon: ReactNode;      // Lucide icon component
  coverImage: string;   // Thumbnail for the circle
  gradient: string;     // Tailwind gradient classes for ring & end card
  properties: StoryProperty[];  // Array of featured properties
  totalCount: number;   // Total properties in this category
  ctaLabel: string;     // End card CTA text
  ctaHref: string;      // End card CTA link
}

interface StoryProperty {
  id: number;
  image: string;
  location: string;
  title: string;
  price: string;
  beds: number;
  sqm: number;
  reason: string;       // Context badge (e.g., "324 views this week")
}
```

## Admin Panel Requirements

### 1. Stories Settings (Global)

The admin panel should have a **"Stories"** section under Content or Marketing with:

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `enabled` | boolean | `true` | Show/hide the stories strip on the listing page |
| `autoAdvanceDuration` | number (seconds) | `10` | Time per property slide before auto-advancing |
| `endCardDuration` | number (seconds) | `8` | Time on the end card before moving to next group |
| `maxPropertiesPerGroup` | number | `5` | Maximum properties shown per story group |

### 2. Story Groups Management

Admin should be able to **create, edit, reorder, and toggle** story groups:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Unique slug (auto-generated from label) |
| `label` | string | Yes | Display name shown below the circle |
| `icon` | select | Yes | Choose from predefined icon set |
| `gradient` | select | Yes | Choose gradient theme (predefined palette) |
| `coverImage` | image upload | Yes | Thumbnail for the story circle |
| `enabled` | boolean | Yes | Toggle visibility |
| `sortOrder` | number | Yes | Drag-and-drop ordering |
| `filterType` | enum | Yes | How properties are selected: `manual`, `auto-filter`, `smart` |
| `filterCriteria` | object | Conditional | If auto-filter: define rules (e.g., "views > 200 this week") |
| `ctaLabel` | string | Yes | Text for the end card button |
| `ctaHref` | string | Yes | Link for the end card button |

**Available filter types:**
- **Manual**: Admin hand-picks specific properties
- **Auto-filter**: System selects based on criteria (most viewed, best price/m², newest, most saved, beachfront tag, etc.)
- **Smart**: AI/algorithm-based selection combining multiple signals

### 3. Per-Property Story Toggle

In each property's admin edit page, add a **"Stories"** section:

| Field | Type | Description |
|-------|------|-------------|
| `showInStories` | boolean | Allow this property to appear in story groups |
| `storyGroups` | multi-select | Which story groups this property can appear in (only relevant for manual selection) |
| `storyReason` | string | Custom "reason" badge text (e.g., "324 views this week"). If empty, auto-generated. |
| `storyImage` | image (optional) | Override image for story display. Falls back to main property image. |

### 4. Filter Selection in Admin

The stories system should respect the **active listing filters** configured in the admin. For each story group, the admin can choose which filters to expose:

| Filter | Configurable | Description |
|--------|-------------|-------------|
| Location | Yes | Limit stories to specific zones/cities |
| Property Type | Yes | Only show specific types (Villa, Penthouse, etc.) |
| Price Range | Yes | Min/max price for the group |
| Tags | Yes | Required tags (e.g., "Beachfront", "Sea Views") |
| Listing Age | Yes | Only properties listed within X days |
| Metrics | Yes | Sort by views, saves, or price efficiency |

## Database Schema (Suggested)

```sql
-- Story groups configuration
CREATE TABLE story_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(50) UNIQUE NOT NULL,
  label VARCHAR(100) NOT NULL,
  icon_name VARCHAR(50) NOT NULL,
  gradient VARCHAR(200) NOT NULL,
  cover_image_url TEXT,
  enabled BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  filter_type VARCHAR(20) DEFAULT 'auto-filter',
  filter_criteria JSONB DEFAULT '{}',
  cta_label VARCHAR(200),
  cta_href VARCHAR(500),
  max_properties INTEGER DEFAULT 5,
  auto_advance_seconds INTEGER DEFAULT 10,
  end_card_seconds INTEGER DEFAULT 8,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Per-property story configuration
CREATE TABLE property_story_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  show_in_stories BOOLEAN DEFAULT true,
  story_reason TEXT,
  story_image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(property_id)
);

-- Manual property-to-group assignments
CREATE TABLE story_group_properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID REFERENCES story_groups(id) ON DELETE CASCADE,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  sort_order INTEGER DEFAULT 0,
  custom_reason TEXT,
  UNIQUE(group_id, property_id)
);
```

## API Endpoints (Suggested)

```
GET    /api/stories/groups          → List all enabled groups with properties
GET    /api/stories/groups/:id      → Single group with full property list
POST   /api/admin/stories/groups    → Create group
PUT    /api/admin/stories/groups/:id → Update group
DELETE /api/admin/stories/groups/:id → Delete group
PUT    /api/admin/stories/groups/reorder → Bulk reorder groups
PUT    /api/admin/properties/:id/story-settings → Update property story config
```

## Integration Points

1. **Listing Page** (`LuxuryPropertyListingV3`): Stories strip rendered above results, inside `<div>` with proper z-index (stories at z-10, search bar at z-40).
2. **Property Detail**: "View Property" button in story links to `/property/:id`.
3. **End Card CTA**: Links to filtered listing page (e.g., `/properties?filter=trending`).
4. **Analytics**: Track story views, taps, and CTA clicks for engagement metrics.

## Mobile vs Desktop

- **Mobile**: Full-width horizontal scroll, stories fill viewport when opened.
- **Desktop**: Constrained to `max-w-[1400px]` container, same fullscreen viewer.
- Both share the same `StoryViewer` component.

## Performance Notes

- Uses `requestAnimationFrame` for smooth progress animation (no CSS transitions for progress).
- Images are statically imported (should be replaced with dynamic URLs from API).
- Story viewer is lazily rendered (only mounts when `activeStory !== null`).
