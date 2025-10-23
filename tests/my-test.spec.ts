import { test, expect, type Page } from '@playwright/test'

test('has title', async ({ page }) => {
    await page.goto('https://codegeassmasterzeronebreakoutr1r2.codes/')

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/NantipatSoftEn/)
})

test('search for createToolTesting', async ({ page }) => {
    await page.goto('https://codegeassmasterzeronebreakoutr1r2.codes/search/')

    // Type in the search input field
    await page
        .getByPlaceholder('Search for anything...')
        .fill('createToolTesting')

    // Verify the input value
    await expect(page.getByPlaceholder('Search for anything...')).toHaveValue(
        'createToolTesting'
    )

    // Wait for and verify search results
    await expect(
        page.getByText("Found 1 result for 'createToolTesting'")
    ).toBeVisible()

    // Verify the search result title appears
    await expect(
        page.getByRole('link', { name: 'DiaryCoding:CreateToolTesting' })
    ).toBeVisible()

    // Verify the date appears in the result
    // await expect(page.getByText('Dec 24, 2024 | 08:15 PM')).toBeVisible();
})

test('search for behindMyCode', async ({ page }) => {
    await page.goto('https://codegeassmasterzeronebreakoutr1r2.codes/search/')

    // Type in the search input field
    await page.getByPlaceholder('Search for anything...').fill('behindMyCode')

    // Verify the input value
    await expect(page.getByPlaceholder('Search for anything...')).toHaveValue(
        'behindMyCode'
    )

    // Wait for and verify search results
    await expect(
        page.getByText("Found 1 result for 'behindMyCode'")
    ).toBeVisible()

    // Verify the search result title appears
    await expect(
        page.getByRole('link', { name: 'DiaryCoding:behindMyCode' })
    ).toBeVisible()

    // Click on the search result to navigate to the post
    await page.getByRole('link', { name: 'DiaryCoding:behindMyCode' }).click()

    // Verify navigation to the specific post page
    await expect(page).toHaveURL(
        'https://codegeassmasterzeronebreakoutr1r2.codes/posts/behindMyCode1/'
    )

    // Verify the date appears in the result
})
