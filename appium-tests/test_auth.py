import pytest

def test_01_splash_screen_logo_visible(appium_driver):
    logo = appium_driver.find_element("accessibility id", "splash-logo")
    assert logo.is_displayed()

def test_02_splash_screen_app_title(appium_driver):
    title = appium_driver.find_element("accessibility id", "splash-title")
    assert "LifeLink" in title.get_attribute("text")

def test_03_onboarding_slide_1_displayed(appium_driver):
    slide = appium_driver.find_element("accessibility id", "onboarding-slide-1")
    assert slide.is_displayed()

def test_04_onboarding_slide_1_heading(appium_driver):
    heading = appium_driver.find_element("accessibility id", "onboarding-heading-1")
    assert "Save Lives" in heading.get_attribute("text")

def test_05_onboarding_slide_2_heading(appium_driver):
    heading = appium_driver.find_element("accessibility id", "onboarding-heading-2")
    assert "Find Donors" in heading.get_attribute("text")

def test_06_onboarding_slide_3_heading(appium_driver):
    heading = appium_driver.find_element("accessibility id", "onboarding-heading-3")
    assert "Instant Support" in heading.get_attribute("text")

def test_07_onboarding_next_button(appium_driver):
    btn = appium_driver.find_element("accessibility id", "onboarding-next-btn")
    assert btn.is_enabled()

def test_08_onboarding_skip_button(appium_driver):
    btn = appium_driver.find_element("accessibility id", "onboarding-skip-btn")
    assert btn.is_displayed()

def test_09_role_selection_loaded(appium_driver):
    header = appium_driver.find_element("accessibility id", "role-selection-header")
    assert "Choose Your Role" in header.get_attribute("text")

def test_10_role_selection_donor_option(appium_driver):
    opt = appium_driver.find_element("accessibility id", "role-donor-card")
    assert opt.is_displayed()

def test_11_role_selection_patient_option(appium_driver):
    opt = appium_driver.find_element("accessibility id", "role-patient-card")
    assert opt.is_displayed()

def test_12_role_selection_hospital_option(appium_driver):
    opt = appium_driver.find_element("accessibility id", "role-hospital-card")
    assert opt.is_displayed()

def test_13_role_selection_ngo_option(appium_driver):
    opt = appium_driver.find_element("accessibility id", "role-ngo-card")
    assert opt.is_displayed()

def test_14_login_screen_fields_visible(appium_driver):
    email = appium_driver.find_element("accessibility id", "login-email-input")
    password = appium_driver.find_element("accessibility id", "login-password-input")
    assert email.is_displayed() and password.is_displayed()

def test_15_login_validation_empty_email(appium_driver):
    email = appium_driver.find_element("accessibility id", "login-email-input")
    btn = appium_driver.find_element("accessibility id", "login-submit-btn")
    email.clear()
    btn.click()
    error = appium_driver.find_element("accessibility id", "login-email-error")
    assert error.is_displayed()

def test_16_login_validation_invalid_email(appium_driver):
    email = appium_driver.find_element("accessibility id", "login-email-input")
    btn = appium_driver.find_element("accessibility id", "login-submit-btn")
    email.send_keys("invalidemail")
    btn.click()
    error = appium_driver.find_element("accessibility id", "login-email-error")
    assert "valid email" in error.get_attribute("text").lower()

def test_17_login_validation_short_password(appium_driver):
    email = appium_driver.find_element("accessibility id", "login-email-input")
    password = appium_driver.find_element("accessibility id", "login-password-input")
    btn = appium_driver.find_element("accessibility id", "login-submit-btn")
    email.send_keys("demo@lifelink.org")
    password.send_keys("123")
    btn.click()
    error = appium_driver.find_element("accessibility id", "login-password-error")
    assert "character" in error.get_attribute("text").lower()

def test_18_signup_fields_visible(appium_driver):
    name = appium_driver.find_element("accessibility id", "signup-name-input")
    email = appium_driver.find_element("accessibility id", "signup-email-input")
    phone = appium_driver.find_element("accessibility id", "signup-phone-input")
    assert name.is_displayed() and email.is_displayed() and phone.is_displayed()

def test_19_forgot_password_button(appium_driver):
    btn = appium_driver.find_element("accessibility id", "forgot-password-link")
    assert btn.is_displayed()

def test_20_forgot_password_submit(appium_driver):
    email = appium_driver.find_element("accessibility id", "forgot-email-input")
    btn = appium_driver.find_element("accessibility id", "forgot-submit-btn")
    email.send_keys("test@lifelink.org")
    btn.click()
    success = appium_driver.find_element("accessibility id", "forgot-success-banner")
    assert success.is_displayed()
