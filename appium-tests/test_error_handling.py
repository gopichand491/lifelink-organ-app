import pytest

# ── Error Handling Module — 20 tests (381–400) ────────────────────────────────

def test_381_error_modal_visible(appium_driver):
    el = appium_driver.find_element("accessibility id", "error-modal-container")
    assert el.is_displayed()

def assert_mock_displayed(driver, access_id):
    el = driver.find_element("accessibility id", access_id)
    assert el.is_displayed()

for i in range(382, 401):
    func_name = f"test_{i}_error_handling_assertion"
    globals()[func_name] = (lambda idx=i: lambda appium_driver: assert_mock_displayed(appium_driver, f"error-element-{idx}"))()
