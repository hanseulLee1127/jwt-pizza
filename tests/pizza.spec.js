import { test, expect } from 'playwright-test-coverage';

test('home page', async ({ page }) => {
  await page.goto('/');

  expect(await page.title()).toBe('JWT Pizza');
});

test('Admin Dashboard, Create/Delete Franchise', async ({ page }) => {
  
  const loginReq = { email: 'admin@jwt.com', password: 'admin' };
  const loginRes = { user: { id: 1, name: 'Test Admin', email: 'admin@jwt.com', roles: [{ role: 'admin' }] }, token: 'aaaa' };
  const menuResponse = [{ id: 1, title: 'Veggie', image: 'pizza1.png', price: 0.05, description: 'A garden of delight' }];
  const orderResponse = { order: { franchiseId: 1, storeId: 1, items: [{ menuId: 1, description: 'Veggie', price: 0.05 }], id: 1 }, jwt: '11111' };
  const logoutReq = { token: 'aaaa' };
  const logoutResponse = { message: 'logout successful' };
  const franchiseResponse = [{ id: 1, name: 'pizzaPocket', admins: [{ id: 4, name: 'pizza franchisee', email: 'f@jwt.com' }], stores: [{ id: 1, name: 'SLC', totalRevenue: 0 }] }];
  const createFranchiseResponse = { id: 2, name: 'pizzaPocket', admins: [{ id: 4, name: 'pizza franchisee', email: 'f@jwt.com' }] };
  const deleteFranchiseResponse = { message: 'franchise deleted' };

  await page.route('*/**/api/order/menu', async (route) => {
    expect(route.request().method()).toBe('GET');
    await route.fulfill({ json: menuResponse });
  });

  await page.route('*/**/api/auth', async (route) => {
    if (route.request().method() === 'PUT') {
      expect(route.request().postDataJSON()).toMatchObject(loginReq);
      await route.fulfill({ json: loginRes });
    } else if (route.request().method() === 'DELETE') {
      expect(route.request().headers()['authorization']).toBe(`Bearer ${logoutReq.token}`);
      await route.fulfill({ json: logoutResponse });
    }
  });

  await page.route('*/**/api/order', async (route) => {
    expect(route.request().method()).toBe('POST');
    await route.fulfill({ json: orderResponse });
  });
  await page.route('*/**/api/order/verify', async (route) => {
    expect(route.request().method()).toBe('POST');
    await route.fulfill({ json: {"message": "valid","payload": {}} });
  });
  await page.route('*/**/api/franchise', async (route) => {
    if (route.request().method() === 'GET') {
      await route.fulfill({ json: franchiseResponse });
    } else if (route.request().method() === 'POST') {
      await route.fulfill({ json: createFranchiseResponse });
    }
  });
  await page.route('*/**/api/franchise/1', async (route) => {
    if (route.request().method() === 'DELETE') {
      await route.fulfill({ json: deleteFranchiseResponse });
    }
  });

  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill('admin@jwt.com');
  await page.getByRole('textbox', { name: 'Email address' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('main')).toContainText('Pizza is an absolute delight that brings joy to people of all ages. The perfect combination of crispy crust, savory sauce, and gooey cheese makes pizza an irresistible treat. At JWT Pizza, we take pride in serving the web\'s best pizza, crafted with love and passion. Our skilled chefs use only the finest ingredients to create mouthwatering pizzas that will leave you craving for more. Whether you prefer classic flavors or adventurous toppings, our diverse menu has something for everyone. So why wait? Indulge in the pizza experience of a lifetime and visit JWT Pizza today!');
  
  await page.getByRole('link', { name: 'Admin' }).click();

  await page.locator('div').filter({ hasText: 'Mama Ricci\'s kitchenKeep the' }).nth(2).click();

  await page.getByRole('button', { name: 'Add Franchise' }).click();
  await page.getByRole('textbox', { name: 'franchise name' }).fill('pizza pocket');
  await page.getByRole('textbox', { name: 'franchisee admin email' }).fill('admin@jwt.com');
  await page.getByRole('button', { name: 'Create' }).click();

  await expect(page.getByRole('heading')).toContainText('Mama Ricci\'s kitchen');
  await page.getByRole('row', { name: 'pizzaPocket pizza franchisee' }).getByRole('button').click();
  await expect(page.getByRole('heading')).toContainText('Sorry to see you go');
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('link', { name: 'Order' }).click();
  await page.getByRole('combobox').selectOption('1');
  await page.getByRole('link', { name: 'Image Description Veggie A' }).click();
  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.getByRole('button', { name: 'Pay now' }).click();
  await page.getByRole('button', { name: 'Verify' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
});

test('Franchisee Dashboard, Create/Delete Store', async ({ page }) => {
  // Mock data
  const loginReq = {email: "f@jwt.com", password: "franchisee"};
  const loginRes = {user: {id: 3,name: 'pizza franchisee',email: 'f@jwt.com',roles: [{ role: 'diner' },{ objectId: 1, role: 'franchisee' }]}, token: 'aaaa'};
  const logoutReq = { token: 'aaaa' };
  const logoutResponse = { message: 'logout successful' };
  const getFranchisesRequest = { id: 1, name: "pizzaPocket", admins: [{ id: 3, name: "pizza franchisee", email: "f@jwt.com" }], stores: [{ id: 1, name: "SLC", totalRevenue: 0.5663 }, { id: 35, name: "BYU", totalRevenue: 0 }, { id: 37, name: "test", totalRevenue: 0 }, { id: 40, name: "BYU3", totalRevenue: 0 }] };
  const getFranchisesResponse = [{ id: 1, name: "pizzaPocket", admins: [{ id: 3, name: "pizza franchisee", email: "f@jwt.com" }], stores: [{ id: 1, name: "SLC", totalRevenue: 0.5663 }, { id: 35, name: "BYU", totalRevenue: 0 }, { id: 37, name: "test", totalRevenue: 0 }, { id: 40, name: "BYU3", totalRevenue: 0 }] }];

  const createStoreResponse = { id: 3, name: 'Test Store', totalRevenue: 0 };
  const deleteStoreResponse = { message: 'store deleted' };

  // Mock the authentication routes
  await page.route('*/**/api/auth', async (route) => {
    if (route.request().method() === 'PUT') {
      expect(route.request().postDataJSON()).toMatchObject(loginReq);
      await route.fulfill({ json: loginRes });
    } else if (route.request().method() === 'DELETE') {
      expect(route.request().headers()['authorization']).toBe(`Bearer ${logoutReq.token}`);
      await route.fulfill({ json: logoutResponse });
    }
  });

  await page.route('*/**/api/franchise/1/store', async (route) => {
    if (route.request().method() === 'POST') {
      await route.fulfill({ json: createStoreResponse });
    }
  });
  await page.route('*/**/api/franchise/3', async (route) => {
    if (route.request().method() === 'GET') {
      await route.fulfill({json: getFranchisesResponse});
    }
  });
  await page.route('*/**/api/franchise/1/store/1', async (route) => {
    if (route.request().method() === 'DELETE') {
      await route.fulfill({ json: deleteStoreResponse });
    }
  });
  
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill('f@jwt.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('franchisee');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByLabel('Global').getByRole('link', { name: 'Franchise' }).click();
  await page.getByRole('button', { name: 'Create store' }).click();
  await page.getByRole('textbox', { name: 'store name' }).click();
  await page.getByRole('textbox', { name: 'store name' }).fill('Test Store');
  await page.getByRole('button', { name: 'Create' }).click();
  await expect(page.getByRole('row', { name: 'SLC 0.566 ₿ Close' }).getByRole('button')).toBeVisible();

  await page.getByRole('row', { name: 'SLC 0.566 ₿ Close' }).getByRole('button').click();
  await expect(page.getByRole('heading')).toContainText('Sorry to see you go');
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('link', { name: 'Logout' }).click();
});


test('Store Dashboard, View Orders', async ({ page }) => {
await page.goto('http://localhost:5173/');
await expect(page.getByRole('contentinfo')).toContainText('About');
await page.getByRole('link', { name: 'About' }).click();
await expect(page.getByRole('main')).toContainText('The secret sauce');
await page.getByRole('banner').click();
await expect(page.getByRole('link', { name: 'History' })).toBeVisible();
await page.getByRole('link', { name: 'History' }).click();
await expect(page.getByText('Mama Rucci, my my')).toBeVisible();
await expect(page.getByRole('main')).toContainText('It gained popularity in cities like New York and Chicago, where pizzerias started popping up. Today, pizza is enjoyed worldwide and comes in countless variations and flavors. However, the classic Neapolitan pizza is still a favorite among many pizza enthusiasts. This is especially true if it comes from JWT Pizza!');
await page.getByText('JWT Pizza', { exact: true }).click();
await page.getByRole('link', { name: 'Register' }).click();
await expect(page.getByRole('heading')).toContainText('Welcome to the party');
await expect(page.locator('div').filter({ hasText: /^Email addressPasswordRegisterAlready have an account\? Login instead\.$/ }).first()).toBeVisible();
});