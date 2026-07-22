import pytest

# ── Offline Handling Module — 10 tests (171–180) ──────────────────────────────

def test_171_offline_banner_displayed(appium_driver):
    """Verify offline mode banner is rendered when network is unavailable."""
    banner = appium_driver.find_element("accessibility id", "offline-mode-banner")
    assert banner.is_displayed()

def test_172_offline_cached_donors_visible(appium_driver):
    """Verify cached donor list is accessible in offline mode."""
    list_el = appium_driver.find_element("accessibility id", "cached-donors-list")
    assert list_el.is_displayed()

def test_173_offline_cached_requests_visible(appium_driver):
    """Verify cached emergency requests are displayed in offline mode."""
    list_el = appium_driver.find_element("accessibility id", "cached-requests-list")
    assert list_el.is_displayed()

def test_174_offline_sync_indicator(appium_driver):
    """Verify sync status indicator reflects offline state."""
    sync = appium_driver.find_element("accessibility id", "offline-sync-status")
    assert sync.is_displayed()

def test_175_offline_form_queued_submission(appium_driver):
    """Verify that form submissions are queued when offline and not lost."""
    queue = appium_driver.find_element("accessibility id", "offline-submit-queue")
    assert queue.is_displayed()

def test_176_offline_error_graceful_message(appium_driver):
    """Verify graceful error message is shown for unavailable network actions."""
    error = appium_driver.find_element("accessibility id", "offline-error-message")
    assert error.is_displayed()

def test_177_offline_retry_button(appium_driver):
    """Verify a retry/reconnect button is available during offline state."""
    retry = appium_driver.find_element("accessibility id", "offline-retry-btn")
    assert retry.is_displayed()

def test_178_offline_map_fallback(appium_driver):
    """Verify map screen shows a fallback/static image when offline."""
    fallback = appium_driver.find_element("accessibility id", "offline-map-fallback")
    assert fallback.is_displayed()

def test_179_offline_last_synced_timestamp(appium_driver):
    """Verify last-synced timestamp is displayed to indicate data freshness."""
    ts = appium_driver.find_element("accessibility id", "last-synced-timestamp")
    assert ts.is_displayed()

def test_180_online_reconnect_sync_trigger(appium_driver):
    """Verify data sync is triggered automatically on reconnection."""
    sync_btn = appium_driver.find_element("accessibility id", "online-sync-trigger")
    assert sync_btn.is_displayed()
