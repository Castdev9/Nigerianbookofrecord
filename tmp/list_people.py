import re
import json

files = ['src/data/people.ts', 'src/data/morePeople.ts', 'src/data/presidents.ts', 'src/data/regionalHistory.ts']

all_people = {}

for fn in files:
    try:
        with open(fn, 'r') as f:
            content = f.read()
            # Find id, name, and image url
            # e.g. id: '...', name: '...', portraitUrl: '...' or photoUrl: '...'
            records = re.findall(r"\{\s*id:\s*['\"]([^'\"]+)['\"],\s*name:\s*['\"]([^'\"]+)['\"].*?(?:portraitUrl|photoUrl):\s*['\"]([^'\"]+)['\"]", content, re.DOTALL)
            print(f"=== {fn}: found {len(records)} records ===")
            for rid, name, img in records:
                all_people[name] = {"file": fn, "id": rid, "img": img}
                print(f"  {rid} | {name} | {img[:50]}...")
    except Exception as e:
        print(f"Error reading {fn}: {e}")

print(f"\nTotal unique people found: {len(all_people)}")
