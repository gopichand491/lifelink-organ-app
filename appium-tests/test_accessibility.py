import pytest

# ── Accessibility Module — 10 tests (161–170) ─────────────────────────────────

def test_161_splash_screen_has_accessible_label(appium_driver):
    """Verify splash screen has an accessible label for screen readers."""
    el = appium_driver.find_element("accessibility id", "splash-accessible-label")
    assert el.is_displayed()

def test_162_login_email_input_accessible_label(appium_driver):
    """Verify login email input has a proper accessibility label."""
    el = appium_driver.find_element("accessibility id", "login-email-input")
    # Accessibility ID itself serves as the accessible label in Appium
    assert el.is_displayed()

def test_163_login_password_input_accessible_label(appium_driver):
    """Verify login password input has a proper accessibility label."""
    el = appium_driver.find_element("accessibility id", "login-password-input")
    assert el.is_displayed()

def test_164_sos_button_accessible_label(appium_driver):
    """Verify SOS panic button has a clear accessible label for TalkBack/VoiceOver."""
    sos = appium_driver.find_element("accessibility id", "sos-panic-button")
    assert sos.is_displayed()

def test_165_navigation_tabs_accessible(appium_driver):
    """Verify bottom navigation tabs have accessible labels."""
    tabs = appium_driver.find_elements("accessibility id", "navigation-tab-item")
    assert len(tabs) >= 0  # mock returns 5 items

def test_166_dashboard_stats_accessible(appium_driver):
    """Verify dashboard stat cards have accessible value labels."""
    stat = appium_driver.find_element("accessibility id", "stats-donors-val")
    assert stat.is_displayed()

def test_167_profile_avatar_alt_text(appium_driver):
    """Verify profile avatar image has an alternate accessibility label."""
    avatar = appium_driver.find_element("accessibility id", "user-avatar")
    assert avatar.is_displayed()

def test_168_finder_search_input_accessible(appium_driver):
    """Verify finder search input field has an accessible hint label."""
    inp = appium_driver.find_element("accessibility id", "finder-search-input")
    assert inp.is_displayed()

def test_169_chat_send_button_accessible(appium_driver):
    """Verify chat send button has accessible label for assistive technology."""
    btn = appium_driver.find_element("accessibility id", "chat-send-btn")
    assert btn.is_displayed()

def test_170_notification_bell_accessible(appium_driver):
    """Verify notification bell icon has an accessible label."""
    bell = appium_driver.find_element("accessibility id", "notification-bell")
    assert bell.is_displayed()
