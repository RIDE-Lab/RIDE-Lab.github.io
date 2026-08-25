from __future__ import annotations

import json
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
PORTFOLIO = json.loads(
    (ROOT / "data" / "control-plane-projects.json").read_text(encoding="utf-8")
)


class PublicSiteTests(unittest.TestCase):
    def test_control_plane_portfolio_is_complete(self) -> None:
        names = {project["name"] for project in PORTFOLIO["projects"]}
        self.assertGreaterEqual(len(names), 10)
        self.assertTrue(
            {
                "SLO-Aware Agent Serving",
                "FreshKV",
                "Quality-Bounded Inference",
                "Workflow-Aware Serving",
                "MottoServe",
            }
            <= names
        )

    def test_non_public_repositories_do_not_emit_urls(self) -> None:
        for project in PORTFOLIO["projects"]:
            url = project["url"]
            self.assertTrue(
                url is None or url.startswith("https://github.com/RIDE-Lab/"),
                project["name"],
            )

    def test_public_summaries_do_not_contain_internal_gate_language(self) -> None:
        text = json.dumps(PORTFOLIO, ensure_ascii=False).lower()
        for phrase in (
            "stopped mechanism",
            "机制已停止",
            "stopping condition",
            "停止条件",
            "reframe",
            "重构故事线",
        ):
            self.assertNotIn(phrase, text)


if __name__ == "__main__":
    unittest.main()
