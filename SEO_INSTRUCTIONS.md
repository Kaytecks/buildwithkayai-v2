# How to add SEO metadata to each public page

Add this ONE line at the top of each page file (after imports):

## app/(public)/page.tsx (Home)
```tsx
export { homeMetadata as metadata } from '@/lib/metadata'
```

## app/(public)/about/page.tsx
```tsx
export { aboutMetadata as metadata } from '@/lib/metadata'
```

## app/(public)/projects/page.tsx
```tsx
export { projectsMetadata as metadata } from '@/lib/metadata'
```

## app/(public)/cybersec/page.tsx
```tsx
export { cybersecMetadata as metadata } from '@/lib/metadata'
```

## app/(public)/experience/page.tsx
```tsx
export { experienceMetadata as metadata } from '@/lib/metadata'
```

## app/(public)/certifications/page.tsx
```tsx
export { certificationsMetadata as metadata } from '@/lib/metadata'
```

## app/(public)/logs/page.tsx
```tsx
export { logsMetadata as metadata } from '@/lib/metadata'
```

## app/(public)/contact/page.tsx
```tsx
export { contactMetadata as metadata } from '@/lib/metadata'
```

NOTE: Pages marked 'use client' cannot export metadata directly.
For those, move the metadata export to a separate layout.tsx in that folder.
