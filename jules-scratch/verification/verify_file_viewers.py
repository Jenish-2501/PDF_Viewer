import time
from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    page.goto("http://localhost:5173")
    page.screenshot(path="jules-scratch/verification/01_main_screen.png")

    # Test PDF Viewer
    page.wait_for_selector('[data-testid="file-type-pdf"]')
    page.locator('[data-testid="file-type-pdf"]').click()
    page.wait_for_selector('canvas', timeout=60000)
    page.screenshot(path="jules-scratch/verification/02_pdf_viewer.png")
    page.get_by_text("Back to Selector").click()

    # Test Image Viewer
    page.wait_for_selector('[data-testid="file-type-image"]')
    page.locator('[data-testid="file-type-image"]').click()
    page.wait_for_selector('img', timeout=60000)
    page.screenshot(path="jules-scratch/verification/03_image_viewer.png")
    page.get_by_text("Back to Selector").click()

    # Test DOCX Viewer
    page.wait_for_selector('[data-testid="file-type-docx"]')
    page.locator('[data-testid="file-type-docx"]').click()
    page.wait_for_selector('.prose', timeout=60000)
    page.screenshot(path="jules-scratch/verification/04_docx_viewer.png")
    page.get_by_text("Back to Selector").click()

    # Test Excel Viewer
    page.wait_for_selector('[data-testid="file-type-excel"]')
    page.locator('[data-testid="file-type-excel"]').click()
    page.wait_for_selector('.excel-table', timeout=60000)
    page.screenshot(path="jules-scratch/verification/05_excel_viewer.png")
    page.get_by_text("Back to Selector").click()

    browser.close()

with sync_playwright() as playwright:
    run(playwright)