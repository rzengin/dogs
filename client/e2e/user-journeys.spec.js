import { test, expect } from '@playwright/test';

const generateUser = () => {
    const timestamp = Date.now();
    return {
        firstName: `Test${timestamp}`,
        lastName: 'User',
        email: `test${timestamp}@example.com`,
        password: 'password123',
        name: `Test${timestamp} User`
    };
};

test.describe('User Journeys', () => {

    test('Health Check', async ({ request }) => {
        const response = await request.get('http://localhost:3000/api/health');
        expect(response.ok()).toBeTruthy();
        const data = await response.json();
        expect(data.status).toBe('ok');
    });

    test('User Signup and Login', async ({ page }) => {
        const user = generateUser();

        // Signup
        await page.goto('/signup');
        await page.fill('input[name="firstName"]', user.firstName);
        await page.fill('input[name="lastName"]', user.lastName);
        await page.fill('input[name="email"]', user.email);
        await page.fill('input[name="password"]', user.password);
        await page.fill('input[name="confirmPassword"]', user.password);
        await page.fill('input[name="phone"]', '099123456');
        await page.selectOption('select[name="city"]', 'Montevideo');
        await page.click('button[type="submit"]');

        // Should redirect to search (based on Signup.jsx: navigate('/search'))
        await expect(page).toHaveURL(/\/search/);

        // Verify logged in state
        const token = await page.evaluate(() => localStorage.getItem('authToken'));
        expect(token).toBeTruthy();
    });

    test('Sitter Signup and Profile Creation', async ({ page }) => {
        const user = generateUser();
        user.email = `sitter${Date.now()}@example.com`;

        // Signup
        await page.goto('/signup');
        // Select Sitter type
        await page.click('button:has-text("Cuidador")');
        await expect(page.locator('button:has-text("Cuidador")')).toHaveClass(/active/);

        await page.fill('input[name="firstName"]', user.firstName);
        await page.fill('input[name="lastName"]', user.lastName);
        await page.fill('input[name="email"]', user.email);
        await page.fill('input[name="password"]', user.password);
        await page.fill('input[name="confirmPassword"]', user.password);
        await page.fill('input[name="phone"]', '099123456');
        await page.selectOption('select[name="city"]', 'Montevideo');

        await page.click('button[type="submit"]');

        // Should redirect to /become-sitter
        await expect(page).toHaveURL(/\/become-sitter/);

        // Fill Sitter Profile - Personal Information
        await page.fill('input[name="firstName"]', user.firstName);
        await page.fill('input[name="lastName"]', user.lastName);
        await page.fill('input[name="email"]', user.email);
        await page.fill('input[name="phone"]', '099123456');
        await page.selectOption('select[name="city"]', 'Montevideo');

        // Fill Experience & Services
        await page.selectOption('select[name="experience"]', '1-3');
        // Check a service
        await page.check('input[type="checkbox"] >> nth=0');
        // Check a pet type
        await page.check('input[type="checkbox"] >> nth=4'); // Assuming pet types are after services

        // Home Details
        await page.selectOption('select[name="propertyType"]', 'Casa');

        // About
        await page.fill('textarea[name="bio"]', 'I love dogs and have a big house.');

        await page.click('button[type="submit"]');

        // Wait for form submission and success page to load
        await page.waitForLoadState('networkidle');

        // Should show success message
        await expect(page.locator('text=¡Solicitud Enviada!')).toBeVisible({ timeout: 10000 });
    });

    test('User Books a Sitter', async ({ page, request }) => {
        // 1. Create Sitter via API to save time
        const sitterUser = generateUser();
        sitterUser.email = `sitter_book${Date.now()}@example.com`;

        // Signup Sitter via API
        const signupRes = await request.post('http://localhost:3000/api/auth/signup', {
            data: { ...sitterUser, phone: '099111222', city: 'Montevideo', userType: 'sitter' }
        });
        if (!signupRes.ok()) {
            console.log(await signupRes.text());
        }
        expect(signupRes.ok()).toBeTruthy();

        // 2. User books
        const user = generateUser();
        user.email = `booker${Date.now()}@example.com`;

        await page.goto('/signup');
        await page.fill('input[name="firstName"]', user.firstName);
        await page.fill('input[name="lastName"]', user.lastName);
        await page.fill('input[name="email"]', user.email);
        await page.fill('input[name="password"]', user.password);
        await page.fill('input[name="confirmPassword"]', user.password);
        await page.fill('input[name="phone"]', '098765432');
        await page.selectOption('select[name="city"]', 'Montevideo');
        await page.click('button[type="submit"]');

        await expect(page).toHaveURL(/\/search/);

        // Go directly to a profile (mock data shows profile/1)
        await page.goto('/profile/1');

        // Profile Page
        await expect(page).toHaveURL(/\/profile\/\d+/);

        // Click 'Solicitar Reserva'
        await page.click('button:has-text("Solicitar Reserva")');

        // Booking Page
        await expect(page).toHaveURL(/\/booking\/\d+/);

        // Fill Booking Form
        // Dates
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const dayAfter = new Date(today);
        dayAfter.setDate(dayAfter.getDate() + 2);

        const formatDate = (date) => date.toISOString().split('T')[0];

        await page.fill('input[name="startDate"]', formatDate(tomorrow));
        await page.fill('input[name="endDate"]', formatDate(dayAfter));

        // Pet Info
        await page.fill('input[name="petName"]', 'Rex');
        await page.fill('input[name="petBreed"]', 'Golden Retriever');
        await page.fill('input[name="petAge"]', '3 años');

        await page.click('button[type="submit"]');

        // Verify confirmation
        await expect(page).toHaveURL(/\/booking-confirmation/);
    });

});
