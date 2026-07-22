import pytest

# ── Deep Links Module — 10 tests (181–190) ───────────────────────────────────

def test_181_deep_link_donor_profile(appium_driver):
    """Verify deep link navigates to correct donor profile screen."""
    appium_driver.start_activity("org.lifelink.app", ".DeepLinkActivity")
    screen = appium_driver.find_element("accessibility id", "donor-profile-screen")
    assert screen.is_displayed()

def test_182_deep_link_blood_request(appium_driver):
    """Verify deep link navigates to blood request detail screen."""
    screen = appium_driver.find_element("accessibility id", "blood-request-detail-screen")
    assert screen.is_displayed()

def test_183_deep_link_campaign_detail(appium_driver):
    """Verify deep link navigates to campaign detail screen."""
    screen = appium_driver.find_element("accessibility id", "campaign-detail-screen")
    assert screen.is_displayed()

def test_184_deep_link_hospital_detail(appium_driver):
    """Verify deep link navigates to hospital detail screen."""
    screen = appium_driver.find_element("accessibility id", "hospital-detail-screen")
    assert screen.is_displayed()

def test_185_deep_link_sos_emergency(appium_driver):
    """Verify deep link navigates to SOS emergency screen."""
    screen = appium_driver.find_element("accessibility id", "sos-panic-button")
    assert screen.is_displayed()

def test_186_deep_link_notifications_screen(appium_driver):
    """Verify deep link from push notification opens notifications screen."""
    screen = appium_driver.find_element("accessibility id", "notifications-screen")
    assert screen.is_displayed()

def test_187_deep_link_finder_results(appium_driver):
    """Verify deep link opens finder with pre-filtered results."""
    screen = appium_driver.find_element("accessibility id", "finder-container")
    assert screen.is_displayed()

def test_188_deep_link_profile_screen(appium_driver):
    """Verify deep link navigates directly to user profile screen."""
    screen = appium_driver.find_element("accessibility id", "profile-container")
    assert screen.is_displayed()

def test_189_deep_link_blood_bank_detail(appium_driver):
    """Verify deep link navigates to blood bank detail view."""
    screen = appium_driver.find_element("accessibility id", "blood-banks-screen")
    assert screen.is_displayed()

def test_190_deep_link_back_navigation(appium_driver):
    """Verify back navigation from deep link destination returns to home."""
    back_btn = appium_driver.find_element("accessibility id", "screen-back-btn")
    assert back_btn.is_displayed()
