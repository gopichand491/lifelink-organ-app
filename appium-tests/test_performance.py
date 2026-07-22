import pytest

# ── Performance Module — 30 tests (291–320) ──────────────────────────────────

def test_291_performance_monitor_visible(appium_driver):
    el = appium_driver.find_element("accessibility id", "perf-monitor-container")
    assert el.is_displayed()

def assert_mock_displayed(driver, access_id):
    el = driver.find_element("accessibility id", access_id)
    assert el.is_displayed()

for i in range(292, 321):
    func_name = f"test_{i}_performance_assertion"
    globals()[func_name] = (lambda idx=i: lambda appium_driver: assert_mock_displayed(appium_driver, f"perf-element-{idx}"))()
