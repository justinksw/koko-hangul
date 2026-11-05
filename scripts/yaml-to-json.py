#!/usr/bin/env python3
"""Regenerate data/hangul.json from briefs/substance-hangul-v3.yaml."""
import json
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[1]
yaml_path = ROOT / "briefs" / "substance-hangul-v3.yaml"
out_path = ROOT / "data" / "hangul.json"

data = yaml.safe_load(yaml_path.read_text(encoding="utf-8"))
out = {
    "meta": data["meta"],
    "letters_table": data["letters_table"],
    "random_pool": data["random_pool"],
}
out_path.write_text(json.dumps(out, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"Wrote {out_path} ({len(out['letters_table'])} letters, {len(out['random_pool'])} pool items)")
