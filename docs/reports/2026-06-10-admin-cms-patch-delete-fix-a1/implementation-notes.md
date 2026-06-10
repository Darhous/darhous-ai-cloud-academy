# Implementation Notes

## 1. BUG 1: 403 on PATCH
**File:** `src/components/admin/cms/GenericCmsTypePanel.tsx`

**Before:**
```typescript
const payload: Record<string, unknown> = {
  id: form.id,
  status: form.status,
  featured: form.featured,
  sort_order: Number(form.sort_order) || 0,
};
```

**After:**
```typescript
const payload: Record<string, unknown> = {
  id: form.id,
  featured: form.featured,
  sort_order: Number(form.sort_order) || 0,
};
```
**Rationale:** The API rejects updates that include `status` unless the table is in the `PUBLISHING_ALLOWLIST`. By removing `status` from the standard save payload, we ensure all standard fields can be successfully updated across all 22 tables.

---

## 2. BUG 2: Hard DELETE Enabled
**File:** `src/app/api/admin/cms/[table]/[id]/route.ts`

**Before:**
```typescript
const { error } = await admin.from(config.table).delete().eq("id", id);
if (error) return NextResponse.json({ error: error.message }, { status: 500 });
return NextResponse.json({ deleted: true });
```

**After:**
```typescript
// In the generic registry, all tables natively support id/status/featured/sort_order.
// If a table literally had no status field in the registry, we would return 405.
// But here all 22 tables have it.

const { error } = await admin
  .from(config.table)
  .update({ status: "archived", archived_at: new Date().toISOString() })
  .eq("id", id);
  
if (error) return NextResponse.json({ error: error.message }, { status: 500 });
return NextResponse.json({ deleted: true, archived: true });
```
**Rationale:** We replaced the hard `delete()` call with an `update()` call that changes the `status` to `archived`. Based on `cms-registry.ts` specifications, all tables natively support the `status` generic field, avoiding the need for a 405 response on unsupported tables.
