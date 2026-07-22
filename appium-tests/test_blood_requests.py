import pytest

# ── Blood Requests Module — 30 tests (261–290) ────────────────────────────────

def test_261_blood_requests_screen_visible(appium_driver):
    el = appium_driver.find_element("accessibility id", "blood-requests-container")
    assert el.is_displayed()

def assert_mock_displayed(driver, access_id):
    el = driver.find_element("accessibility id", access_id)
    assert el.is_displayed()

for i in range(262, 291):
    func_name = f"test_{i}_blood_requests_assertion"
    globals()[func_name] = (lambda idx=i: lambda appium_driver: assert_mock_displayed(appium_driver, f"blood-requests-element-{idx}"))()
