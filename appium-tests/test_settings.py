import pytest

# ── Settings Module — 15 tests (146–160) ─────────────────────────────────────

def test_146_settings_screen_visible(appium_driver):
    """Verify the settings screen container is displayed."""
    screen = appium_driver.find_element("accessibility id", "settings-screen")
    assert screen.is_displayed()

def test_147_settings_theme_toggle(appium_driver):
    """Verify dark/light mode theme toggle is rendered in settings."""
    toggle = appium_driver.find_element("accessibility id", "settings-theme-toggle")
    assert toggle.is_displayed()

def test_148_settings_language_selector(appium_driver):
    """Verify language selection option is present in settings."""
    lang = appium_driver.find_element("accessibility id", "settings-language-selector")
    assert lang.is_displayed()

def test_149_settings_notification_pref(appium_driver):
    """Verify notification preferences section is rendered."""
    notif = appium_driver.find_element("accessibility id", "settings-notification-pref")
    assert notif.is_displayed()

def test_150_settings_push_notif_toggle(appium_driver):
    """Verify push notifications enable/disable toggle is accessible."""
    toggle = appium_driver.find_element("accessibility id", "settings-push-toggle")
    assert toggle.is_displayed()

def test_151_settings_email_notif_toggle(appium_driver):
    """Verify email notifications toggle is rendered."""
    toggle = appium_driver.find_element("accessibility id", "settings-email-toggle")
    assert toggle.is_displayed()

def test_152_settings_privacy_section(appium_driver):
    """Verify privacy settings section is present."""
    privacy = appium_driver.find_element("accessibility id", "settings-privacy-section")
    assert privacy.is_displayed()

def test_153_settings_location_permission_toggle(appium_driver):
    """Verify location permission toggle is accessible in privacy settings."""
    location = appium_driver.find_element("accessibility id", "settings-location-toggle")
    assert location.is_displayed()

def test_154_settings_biometric_toggle(appium_driver):
    """Verify biometric authentication toggle is present."""
    bio = appium_driver.find_element("accessibility id", "settings-biometric-toggle")
    assert bio.is_displayed()

def test_155_settings_change_password_option(appium_driver):
    """Verify change password option is accessible from settings."""
    cp = appium_driver.find_element("accessibility id", "settings-change-password")
    assert cp.is_displayed()

def test_156_settings_delete_account_option(appium_driver):
    """Verify account deletion option is present with warning indicator."""
    delete_btn = appium_driver.find_element("accessibility id", "settings-delete-account")
    assert delete_btn.is_displayed()

def test_157_settings_delete_account_confirmation(appium_driver):
    """Verify tapping delete account shows a confirmation dialog."""
    delete_btn = appium_driver.find_element("accessibility id", "settings-delete-account")
    delete_btn.click()
    confirm = appium_driver.find_element("accessibility id", "delete-account-confirm-modal")
    assert confirm.is_displayed()

def test_158_settings_logout_button(appium_driver):
    """Verify logout button is present in settings screen."""
    logout = appium_driver.find_element("accessibility id", "settings-logout-btn")
    assert logout.is_displayed()

def test_159_settings_app_version_label(appium_driver):
    """Verify app version info label is displayed in settings footer."""
    version = appium_driver.find_element("accessibility id", "settings-app-version")
    assert version.is_displayed()

def test_160_settings_terms_of_service_link(appium_driver):
    """Verify Terms of Service link is accessible from settings."""
    tos = appium_driver.find_element("accessibility id", "settings-tos-link")
    assert tos.is_displayed()
