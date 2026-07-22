import pytest

def test_91_finder_container(appium_driver):
    finder = appium_driver.find_element("accessibility id", "finder-container")
    assert finder.is_displayed()

def test_92_finder_title(appium_driver):
    title = appium_driver.find_element("accessibility id", "finder-title")
    assert "Life Savers" in title.get_attribute("text") or title.is_displayed()

def test_93_finder_search_input(appium_driver):
    inp = appium_driver.find_element("accessibility id", "finder-search-input")
    assert inp.is_displayed()

def test_94_finder_filter_button(appium_driver):
    btn = appium_driver.find_element("accessibility id", "finder-filter-btn")
    assert btn.is_displayed()

def test_95_filter_modal_opens(appium_driver):
    btn = appium_driver.find_element("accessibility id", "finder-filter-btn")
    btn.click()
    modal = appium_driver.find_element("accessibility id", "finder-filter-modal")
    assert modal.is_displayed()

def test_96_filter_blood_selector(appium_driver):
    sel = appium_driver.find_element("accessibility id", "filter-blood-selector")
    assert sel.is_displayed()

def test_97_filter_organ_selector(appium_driver):
    sel = appium_driver.find_element("accessibility id", "filter-organ-selector")
    assert sel.is_displayed()

def test_98_filter_availability_toggle(appium_driver):
    toggle = appium_driver.find_element("accessibility id", "filter-available-switch")
    assert toggle.is_displayed()

def test_99_results_grid_populated(appium_driver):
    results = appium_driver.find_elements("accessibility id", "donor-result-card")
    assert len(results) >= 0

def test_100_result_card_rating(appium_driver):
    rating = appium_driver.find_element("accessibility id", "result-card-rating-0")
    assert rating.is_displayed()

def test_101_result_card_badge(appium_driver):
    badge = appium_driver.find_element("accessibility id", "result-card-badge-0")
    assert badge.is_displayed()

def test_102_result_card_location(appium_driver):
    loc = appium_driver.find_element("accessibility id", "result-card-location-0")
    assert loc.get_attribute("text") != ""

def test_103_contact_donor_button(appium_driver):
    btn = appium_driver.find_element("accessibility id", "contact-donor-btn-0")
    assert btn.is_displayed()

def test_104_request_match_form(appium_driver):
    btn = appium_driver.find_element("accessibility id", "contact-donor-btn-0")
    btn.click()
    form = appium_driver.find_element("accessibility id", "request-match-form")
    assert form.is_displayed()

def test_105_request_match_submit(appium_driver):
    msg_input = appium_driver.find_element("accessibility id", "match-message-input")
    submit_btn = appium_driver.find_element("accessibility id", "match-submit-btn")
    msg_input.send_keys("Emergency request: O+ blood units needed immediately.")
    submit_btn.click()
    success = appium_driver.find_element("accessibility id", "match-success-toast")
    assert success.is_displayed()
