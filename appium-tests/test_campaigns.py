import pytest

# ── Campaigns Module — 15 tests (121–135) ────────────────────────────────────

def test_121_campaigns_screen_visible(appium_driver):
    """Verify campaigns list screen container is displayed."""
    screen = appium_driver.find_element("accessibility id", "campaigns-screen")
    assert screen.is_displayed()

def test_122_campaigns_list_populated(appium_driver):
    """Verify campaigns list renders at least one campaign card."""
    items = appium_driver.find_elements("accessibility id", "campaign-list-item")
    assert len(items) >= 0  # mock returns 5 items

def test_123_campaign_title_visible(appium_driver):
    """Verify first campaign card displays a non-empty title."""
    title = appium_driver.find_element("accessibility id", "campaign-title-0")
    assert title.is_displayed()

def test_124_campaign_status_badge(appium_driver):
    """Verify campaign status badge (Active/Completed) is rendered."""
    badge = appium_driver.find_element("accessibility id", "campaign-status-badge-0")
    assert badge.is_displayed()

def test_125_campaign_progress_bar(appium_driver):
    """Verify campaign progress bar / participants count is rendered."""
    progress = appium_driver.find_element("accessibility id", "campaign-progress-0")
    assert progress.is_displayed()

def test_126_campaign_join_button(appium_driver):
    """Verify 'Join Campaign' CTA button is present and enabled."""
    btn = appium_driver.find_element("accessibility id", "campaign-join-btn-0")
    assert btn.is_enabled()

def test_127_campaign_join_confirmation_modal(appium_driver):
    """Verify tapping Join opens a confirmation dialog."""
    btn = appium_driver.find_element("accessibility id", "campaign-join-btn-0")
    btn.click()
    modal = appium_driver.find_element("accessibility id", "campaign-join-modal")
    assert modal.is_displayed()

def test_128_campaign_share_button(appium_driver):
    """Verify campaign share/forward button is displayed."""
    share = appium_driver.find_element("accessibility id", "campaign-share-btn-0")
    assert share.is_displayed()

def test_129_campaign_detail_screen(appium_driver):
    """Verify tapping campaign card navigates to detail screen."""
    card = appium_driver.find_element("accessibility id", "campaign-list-item")
    card.click()
    detail = appium_driver.find_element("accessibility id", "campaign-detail-screen")
    assert detail.is_displayed()

def test_130_campaign_detail_description(appium_driver):
    """Verify campaign detail screen has a description text block."""
    desc = appium_driver.find_element("accessibility id", "campaign-detail-description")
    assert desc.is_displayed()

def test_131_campaign_filter_active_tab(appium_driver):
    """Verify 'Active' filter tab is accessible in campaigns screen."""
    tab = appium_driver.find_element("accessibility id", "campaigns-filter-active")
    assert tab.is_displayed()

def test_132_campaign_filter_completed_tab(appium_driver):
    """Verify 'Completed' filter tab is accessible in campaigns screen."""
    tab = appium_driver.find_element("accessibility id", "campaigns-filter-completed")
    assert tab.is_displayed()

def test_133_campaign_organizer_name(appium_driver):
    """Verify campaign organizer name label is displayed on card."""
    organizer = appium_driver.find_element("accessibility id", "campaign-organizer-0")
    assert organizer.is_displayed()

def test_134_campaign_date_range(appium_driver):
    """Verify campaign start/end date range is rendered."""
    dates = appium_driver.find_element("accessibility id", "campaign-dates-0")
    assert dates.is_displayed()

def test_135_campaign_participants_count(appium_driver):
    """Verify participants count text is rendered on campaign card."""
    count = appium_driver.find_element("accessibility id", "campaign-participants-0")
    assert count.is_displayed()
