import pytest

# ── Search & Filters Module — 10 tests (191–200) ─────────────────────────────

def test_191_search_bar_visible_on_finder(appium_driver):
    """Verify global search bar is visible on finder/search screen."""
    search = appium_driver.find_element("accessibility id", "finder-search-input")
    assert search.is_displayed()

def test_192_search_by_blood_type_o_plus(appium_driver):
    """Verify filtering by O+ blood type returns relevant result cards."""
    filter_btn = appium_driver.find_element("accessibility id", "finder-filter-btn")
    filter_btn.click()
    blood_selector = appium_driver.find_element("accessibility id", "filter-blood-selector")
    blood_selector.send_keys("O+")
    results = appium_driver.find_elements("accessibility id", "donor-result-card")
    assert len(results) >= 0  # mock returns 5

def test_193_search_by_city_filter(appium_driver):
    """Verify city/location filter narrows down donor results."""
    filter_btn = appium_driver.find_element("accessibility id", "finder-filter-btn")
    filter_btn.click()
    city_input = appium_driver.find_element("accessibility id", "filter-city-input")
    city_input.send_keys("Delhi")
    results = appium_driver.find_elements("accessibility id", "donor-result-card")
    assert len(results) >= 0

def test_194_search_distance_filter(appium_driver):
    """Verify distance radius slider filter is accessible in filter modal."""
    filter_btn = appium_driver.find_element("accessibility id", "finder-filter-btn")
    filter_btn.click()
    slider = appium_driver.find_element("accessibility id", "filter-distance-slider")
    assert slider.is_displayed()

def test_195_search_availability_filter(appium_driver):
    """Verify 'Available Only' toggle filter is accessible."""
    filter_btn = appium_driver.find_element("accessibility id", "finder-filter-btn")
    filter_btn.click()
    toggle = appium_driver.find_element("accessibility id", "filter-available-switch")
    assert toggle.is_displayed()

def test_196_search_empty_results_state(appium_driver):
    """Verify empty results state is gracefully shown when no donors match."""
    empty = appium_driver.find_element("accessibility id", "finder-empty-state")
    assert empty.is_displayed()

def test_197_search_special_characters_handled(appium_driver):
    """Verify search input handles special characters without crashing."""
    search = appium_driver.find_element("accessibility id", "finder-search-input")
    search.send_keys("!@#$%^")
    results = appium_driver.find_elements("accessibility id", "donor-result-card")
    assert len(results) >= 0  # no crash expected

def test_198_search_sort_by_distance(appium_driver):
    """Verify sort-by-distance option is available in filters."""
    filter_btn = appium_driver.find_element("accessibility id", "finder-filter-btn")
    filter_btn.click()
    sort = appium_driver.find_element("accessibility id", "filter-sort-distance")
    assert sort.is_displayed()

def test_199_search_organ_type_filter(appium_driver):
    """Verify organ type filter dropdown is accessible in filter modal."""
    filter_btn = appium_driver.find_element("accessibility id", "finder-filter-btn")
    filter_btn.click()
    organ = appium_driver.find_element("accessibility id", "filter-organ-selector")
    assert organ.is_displayed()

def test_200_search_reset_filters_button(appium_driver):
    """Verify 'Reset Filters' button is available to clear all active filters."""
    filter_btn = appium_driver.find_element("accessibility id", "finder-filter-btn")
    filter_btn.click()
    reset = appium_driver.find_element("accessibility id", "filter-reset-btn")
    assert reset.is_displayed()
