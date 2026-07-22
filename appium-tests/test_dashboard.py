import pytest

def test_21_dashboard_welcome_heading(appium_driver):
    welcome = appium_driver.find_element("accessibility id", "dashboard-welcome")
    assert welcome.is_displayed()

def test_22_dashboard_user_avatar(appium_driver):
    avatar = appium_driver.find_element("accessibility id", "user-avatar")
    assert avatar.is_displayed()

def test_23_stats_active_donors_count(appium_driver):
    stat = appium_driver.find_element("accessibility id", "stats-donors-val")
    assert int(stat.get_attribute("text").replace(",", "")) >= 0

def test_24_stats_hospitals_registered_count(appium_driver):
    stat = appium_driver.find_element("accessibility id", "stats-hospitals-val")
    assert int(stat.get_attribute("text")) >= 0

def test_25_stats_active_requests_count(appium_driver):
    stat = appium_driver.find_element("accessibility id", "stats-requests-val")
    assert int(stat.get_attribute("text")) >= 0

def test_26_recent_request_card(appium_driver):
    card = appium_driver.find_element("accessibility id", "recent-request-card-0")
    assert card.is_displayed()

def test_27_recent_request_patient_name(appium_driver):
    name = appium_driver.find_element("accessibility id", "recent-request-patient-0")
    assert name.get_attribute("text") != ""

def test_28_recent_request_urgency_badge(appium_driver):
    badge = appium_driver.find_element("accessibility id", "recent-request-urgency-0")
    assert badge.is_displayed()

def test_29_campaign_banner_presence(appium_driver):
    banner = appium_driver.find_element("accessibility id", "campaign-banner-c1")
    assert banner.is_displayed()

def test_30_notification_bell_icon(appium_driver):
    bell = appium_driver.find_element("accessibility id", "notification-bell")
    assert bell.is_displayed()

def test_31_notification_badge_indicator(appium_driver):
    badge = appium_driver.find_element("accessibility id", "notification-badge")
    assert badge.is_displayed()

def test_32_sidebar_toggle_menu(appium_driver):
    menu = appium_driver.find_element("accessibility id", "sidebar-menu-btn")
    assert menu.is_enabled()

def test_33_blood_stock_o_plus(appium_driver):
    stock = appium_driver.find_element("accessibility id", "blood-stock-O+")
    assert stock.is_displayed()

def test_34_blood_stock_a_plus(appium_driver):
    stock = appium_driver.find_element("accessibility id", "blood-stock-A+")
    assert stock.is_displayed()

def test_35_blood_stock_b_plus(appium_driver):
    stock = appium_driver.find_element("accessibility id", "blood-stock-B+")
    assert stock.is_displayed()

def test_36_quick_map_view_toggle(appium_driver):
    toggle = appium_driver.find_element("accessibility id", "quick-map-toggle")
    assert toggle.is_displayed()

def test_37_emergency_contact_widget(appium_driver):
    widget = appium_driver.find_element("accessibility id", "emergency-contact-widget")
    assert widget.is_displayed()

def test_38_tips_article_carousel(appium_driver):
    carousel = appium_driver.find_element("accessibility id", "tips-carousel")
    assert carousel.is_displayed()

def test_39_sync_status_indicator(appium_driver):
    sync = appium_driver.find_element("accessibility id", "offline-sync-status")
    assert sync.is_displayed()

def test_40_tab_navigation_bar(appium_driver):
    tabs = appium_driver.find_elements("accessibility id", "navigation-tab-item")
    assert len(tabs) >= 4
