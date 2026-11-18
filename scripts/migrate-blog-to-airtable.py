#!/usr/bin/env python3
"""Migrate the .EXE blog's launch articles from posts.ts into Airtable.

One-off setup for the Airtable-backed blog (see src/app/src/blog/README.md).

What it does:
  1. Checks whether the Posts table exists in the ".EXE" base.
  2. If not, tries to create it via the Airtable Metadata API. That needs a
     token with the `schema.bases:write` scope; if the token lacks it, the
     script prints the manual steps and stops — create the table by hand in
     the Airtable UI, then re-run.
  3. Creates the four launch articles from airtable-posts.json (exact copies
     of src/app/src/blog/posts.ts, generated mechanically) with Status
     Published.

Usage:
  AIRTABLE_API_KEY=... AIRTABLE_BASE_ID=appE2GISppe10HTic \
      python3 scripts/migrate-blog-to-airtable.py [--dry-run]

The key is read from the environment only and never printed or stored.
`--dry-run` prints what would be created without calling Airtable.
"""

import json
import os
import sys
import time
import urllib.error
import urllib.request

BASE_ID = os.environ.get("AIRTABLE_BASE_ID", "appE2GISppe10HTic")
TABLE = os.environ.get("AIRTABLE_POSTS_TABLE", "Posts")
API_KEY = os.environ.get("AIRTABLE_API_KEY", "")
DATA_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "airtable-posts.json")

FIELDS = [
    {"name": "Title", "type": "singleLineText"},
    {"name": "Slug", "type": "singleLineText"},
    {"name": "Date", "type": "date", "options": {"dateFormat": {"name": "ISO"}}},
    {"name": "Excerpt", "type": "multilineText"},
    {"name": "Body", "type": "multilineText"},
    {"name": "Image", "type": "singleLineText"},
    {"name": "Sources", "type": "multilineText"},
    {
        "name": "Status",
        "type": "singleSelect",
        "options": {"choices": [{"name": "Draft"}, {"name": "Published"}]},
    },
]

MANUAL_STEPS = """\
The Posts table does not exist yet and this token cannot create it.
Create it by hand in the Airtable UI, in the ".EXE" base:
  1. Add a table named "Posts".
  2. Add these fields (delete the default "Notes" field if one appears):
       Title    — Single line text
       Slug     — Single line text
       Date     — Date (ISO format, YYYY-MM-DD)
       Excerpt  — Long text
       Body     — Long text
       Image    — Single line text
       Sources  — Long text
       Status   — Single select, options: Draft, Published
  3. Re-run this script to import the four launch articles.
"""


def call(method, url, payload=None):
    """One Airtable call. Returns the parsed JSON body. Raises on HTTP error."""
    body = json.dumps(payload).encode() if payload is not None else None
    req = urllib.request.Request(url, data=body, method=method)
    req.add_header("Authorization", f"Bearer {API_KEY}")
    if body is not None:
        req.add_header("Content-Type", "application/json")
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            return json.loads(resp.read().decode())
    except urllib.error.HTTPError as e:
        detail = e.read().decode(errors="replace")
        if e.code == 429:
            time.sleep(30)
            with urllib.request.urlopen(req, timeout=30) as resp:
                return json.loads(resp.read().decode())
        raise RuntimeError(f"Airtable {method} {url} -> HTTP {e.code}: {detail}") from e


def table_exists():
    try:
        call("GET", f"https://api.airtable.com/v0/{BASE_ID}/{TABLE}?pageSize=1")
        return True
    except RuntimeError as e:
        if "HTTP 404" in str(e):
            return False
        raise


def create_table():
    print("Posts table not found — trying the Airtable Metadata API...")
    try:
        result = call(
            "POST",
            f"https://api.airtable.com/v0/meta/bases/{BASE_ID}/tables",
            {"name": TABLE, "fields": FIELDS},
        )
        print(f"Created table {TABLE!r} (id {result.get('id')}).")
        return True
    except RuntimeError as e:
        print(f"Metadata API could not create the table: {e}")
        return False


def main():
    dry_run = "--dry-run" in sys.argv
    records = json.load(open(DATA_FILE))
    print(f"Loaded {len(records)} articles from {os.path.basename(DATA_FILE)}.")
    for r in records:
        print(f"  - {r['fields']['Slug']} ({r['fields']['Date']}) -> {r['fields']['Status']}")
    if dry_run:
        print("Dry run — nothing was sent to Airtable.")
        return 0
    if not API_KEY:
        print("Set AIRTABLE_API_KEY in the environment (and AIRTABLE_BASE_ID if not the .EXE base).")
        return 1
    if not table_exists():
        if not create_table():
            print()
            print(MANUAL_STEPS)
            return 1
    else:
        print(f"Table {TABLE!r} exists.")
    for i in range(0, len(records), 10):
        batch = records[i : i + 10]
        result = call(
            "POST",
            f"https://api.airtable.com/v0/{BASE_ID}/{TABLE}",
            {"records": batch},
        )
        for created in result.get("records", []):
            fields = created.get("fields", {})
            print(f"Created {fields.get('Slug')} (record {created.get('id')}).")
    print("Done — all four launch articles are Published.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
