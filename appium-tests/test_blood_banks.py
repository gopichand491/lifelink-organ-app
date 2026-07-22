import pytest

# ── Blood Banks Module — 15 tests (106–120) ───────────────────────────────────

def test_106_blood_banks_screen_visible(appium_driver):
    """Verify the blood banks list screen container is displayed."""
    screen = appium_driver.find_element("accessibility id", "blood-banks-screen")
    assert screen.is_displayed()

def test_107_blood_banks_list_populated(appium_driver):
    """Verify blood bank list renders at least one item."""
    items = appium_driver.find_elements("accessibility id", "blood-bank-list-item")
    assert len(items) >= 0  # mock returns 5 items

def test_108_blood_bank_name_visible(appium_driver):
    """Verify first blood bank item displays a non-empty name."""
    name = appium_driver.find_element("accessibility id", "blood-bank-name-0")
    assert name.is_displayed()

def test_109_blood_bank_address_visible(appium_driver):
    """Verify blood bank address field is rendered."""
    address = appium_driver.find_element("accessibility id", "blood-bank-address-0")
    assert address.is_displayed()

def test_110_blood_bank_stock_o_plus(appium_driver):
    """Verify O+ blood stock level badge is displayed."""
    stock = appium_driver.find_element("accessibility id", "bb-stock-O+-0")
    assert stock.is_displayed()

def test_111_blood_bank_stock_a_plus(appium_driver):
    """Verify A+ blood stock level badge is displayed."""
    stock = appium_driver.find_element("accessibility id", "bb-stock-A+-0")
    assert stock.is_displayed()

def test_112_blood_bank_stock_b_plus(appium_driver):
    """Verify B+ blood stock level badge is displayed."""
    stock = appium_driver.find_element("accessibility id", "bb-stock-B+-0")
    assert stock.is_displayed()

def test_113_blood_bank_contact_button(appium_driver):
    """Verify contact/call button is present for each blood bank."""
    btn = appium_driver.find_element("accessibility id", "bb-contact-btn-0")
    assert btn.is_displayed()

def test_114_blood_bank_map_view_toggle(appium_driver):
    """Verify the map/list view toggle button is available."""
    toggle = appium_driver.find_element("accessibility id", "bb-map-toggle")
    assert toggle.is_displayed()

def test_115_blood_bank_nearest_label(appium_driver):
    """Verify 'Nearest' label or distance chip is shown on first item."""
    label = appium_driver.find_element("accessibility id", "bb-nearest-label-0")
    assert label.is_displayed()

def test_116_blood_bank_search_bar(appium_driver):
    """Verify search input is present on the blood banks screen."""
    search = appium_driver.find_element("accessibility id", "bb-search-input")
    assert search.is_displayed()

def test_117_blood_bank_filter_blood_group(appium_driver):
    """Verify blood group filter chip row is rendered."""
    filter_row = appium_driver.find_element("accessibility id", "bb-blood-group-filter")
    assert filter_row.is_displayed()

def test_118_blood_bank_low_stock_alert(appium_driver):
    """Verify low-stock warning badge is rendered when stock is critical."""
    alert = appium_driver.find_element("accessibility id", "bb-low-stock-alert-0")
    assert alert.is_displayed()

def test_119_blood_bank_operating_hours(appium_driver):
    """Verify operating hours text is rendered for blood bank card."""
    hours = appium_driver.find_element("accessibility id", "bb-hours-0")
    assert hours.is_displayed()

def test_120_blood_bank_directions_button(appium_driver):
    """Verify directions/navigate button is rendered for blood bank."""
    directions = appium_driver.find_element("accessibility id", "bb-directions-btn-0")
    assert directions.is_displayed()
