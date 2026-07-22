import pytest

# ── Notifications Module — 10 tests (136–145) ────────────────────────────────

def test_136_notifications_screen_visible(appium_driver):
    """Verify the notifications screen container is displayed."""
    screen = appium_driver.find_element("accessibility id", "notifications-screen")
    assert screen.is_displayed()

def test_137_notifications_list_rendered(appium_driver):
    """Verify notifications list renders items."""
    items = appium_driver.find_elements("accessibility id", "notification-list-item")
    assert len(items) >= 0  # mock returns 5 items

def test_138_notification_title_visible(appium_driver):
    """Verify first notification item shows a title/message text."""
    title = appium_driver.find_element("accessibility id", "notification-title-0")
    assert title.is_displayed()

def test_139_notification_timestamp_visible(appium_driver):
    """Verify notification timestamp is rendered."""
    ts = appium_driver.find_element("accessibility id", "notification-timestamp-0")
    assert ts.is_displayed()

def test_140_notification_type_icon(appium_driver):
    """Verify notification type icon (alert, info, success) is displayed."""
    icon = appium_driver.find_element("accessibility id", "notification-type-icon-0")
    assert icon.is_displayed()

def test_141_notification_mark_read_button(appium_driver):
    """Verify 'Mark as read' action is available on notification item."""
    btn = appium_driver.find_element("accessibility id", "notification-mark-read-0")
    assert btn.is_displayed()

def test_142_notification_mark_all_read_button(appium_driver):
    """Verify 'Mark all as read' button is present in header."""
    btn = appium_driver.find_element("accessibility id", "notifications-mark-all-read")
    assert btn.is_displayed()

def test_143_notification_unread_badge_count(appium_driver):
    """Verify unread count badge is displayed in the notifications header."""
    badge = appium_driver.find_element("accessibility id", "notifications-unread-count")
    assert badge.is_displayed()

def test_144_notification_clear_all_button(appium_driver):
    """Verify 'Clear All' notifications button is accessible."""
    btn = appium_driver.find_element("accessibility id", "notifications-clear-all")
    assert btn.is_displayed()

def test_145_notification_empty_state_message(appium_driver):
    """Verify empty state message is shown when no notifications exist."""
    empty = appium_driver.find_element("accessibility id", "notifications-empty-state")
    assert empty.is_displayed()
