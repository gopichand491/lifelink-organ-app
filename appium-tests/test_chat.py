import pytest

def test_76_chat_list_container(appium_driver):
    container = appium_driver.find_element("accessibility id", "chat-list-container")
    assert container.is_displayed()

def test_77_chat_search_input(appium_driver):
    inp = appium_driver.find_element("accessibility id", "chat-search-input")
    assert inp.is_displayed()

def test_78_chat_thread_card(appium_driver):
    card = appium_driver.find_element("accessibility id", "chat-thread-card-0")
    assert card.is_displayed()

def test_79_chat_thread_username(appium_driver):
    name = appium_driver.find_element("accessibility id", "chat-thread-name-0")
    assert name.get_attribute("text") != ""

def test_80_chat_thread_last_msg(appium_driver):
    msg = appium_driver.find_element("accessibility id", "chat-thread-message-0")
    assert msg.is_displayed()

def test_81_chat_thread_timestamp(appium_driver):
    time = appium_driver.find_element("accessibility id", "chat-thread-time-0")
    assert time.is_displayed()

def test_82_chat_thread_open(appium_driver):
    card = appium_driver.find_element("accessibility id", "chat-thread-card-0")
    card.click()
    room = appium_driver.find_element("accessibility id", "chat-room-container")
    assert room.is_displayed()

def test_83_chat_room_header_name(appium_driver):
    header_name = appium_driver.find_element("accessibility id", "chat-room-header-title")
    assert header_name.get_attribute("text") != ""

def test_84_chat_room_status(appium_driver):
    status = appium_driver.find_element("accessibility id", "chat-room-header-status")
    assert status.is_displayed()

def test_85_messages_scroll_view(appium_driver):
    sv = appium_driver.find_element("accessibility id", "messages-scroll-view")
    assert sv.is_displayed()

def test_86_message_input_box(appium_driver):
    inp = appium_driver.find_element("accessibility id", "chat-message-input")
    assert inp.is_displayed()

def test_87_send_button_visible(appium_driver):
    btn = appium_driver.find_element("accessibility id", "chat-send-btn")
    assert btn.is_displayed()

def test_88_send_message_updates_list(appium_driver):
    inp = appium_driver.find_element("accessibility id", "chat-message-input")
    btn = appium_driver.find_element("accessibility id", "chat-send-btn")
    inp.send_keys("Hello, this is a test emergency match message.")
    btn.click()
    # verify input is cleared
    assert inp.get_attribute("text") == "" or inp.get_attribute("text") is None

def test_89_message_sent_tick_mark(appium_driver):
    tick = appium_driver.find_element("accessibility id", "message-status-tick")
    assert tick.is_displayed()

def test_90_chat_back_button(appium_driver):
    btn = appium_driver.find_element("accessibility id", "chat-back-btn")
    assert btn.is_displayed()
