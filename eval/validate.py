"""Validate evaluation-set format and counts; this is not a model-quality test."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent


def load(name):
    rows = [json.loads(line) for line in (ROOT / name).read_text(encoding="utf-8").splitlines() if line.strip()]
    return rows


def main():
    q = load("questions.jsonl")
    b = load("bilingual_items.jsonl")
    a = load("red_team.jsonl")
    assert len(q) == 30, f"Expected 30 questions, found {len(q)}"
    assert len(b) == 20, f"Expected 20 bilingual items, found {len(b)}"
    assert len(a) == 25, f"Expected 25 red-team cases, found {len(a)}"
    assert len({x["id"] for x in q}) == len(q)
    assert len({x["id"] for x in b}) == len(b)
    assert len({x["id"] for x in a}) == len(a)
    assert all(x.get("source_page") is None and x.get("status") for x in q), "Items must disclose that manual pages are unverified"
    print("Format OK: 30 sample questions, 20 bilingual items, 25 red-team prompts. No quality/performance results were measured.")


if __name__ == "__main__":
    main()
