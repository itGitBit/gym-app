import { test, expect } from '@playwright/test';

test.beforeAll('login', async ({ page }) => {
await page.goto('http://localhost:5173/');
await page.getByRole('button', { name: 'Trainer', exact: true }).click();
await page.getByRole('combobox').selectOption('{"id":5,"name":"Shai Rubinstein","email":"shai@posit.co.il","phone":"0528572942","created_at":"2024-06-30T21:49:05.649+03:00","updated_at":"2024-06-30T21:49:05.649+03:00"}');
await page.getByRole('button', { name: 'Select' }).click();

});

test('createWorkout', async ({ page }) => {
await page.goto('http://localhost:5173/');
await page.getByRole('button', { name: 'Trainer', exact: true }).click();
await page.getByRole('combobox').selectOption('{"id":5,"name":"Shai Rubinstein","email":"shai@posit.co.il","phone":"0528572942","created_at":"2024-06-30T21:49:05.649+03:00","updated_at":"2024-06-30T21:49:05.649+03:00"}');
await page.getByRole('button', { name: 'Select' }).click();
await page.getByRole('link', { name: 'Add Workout' }).click();
await page.getByLabel('Workout Duration in Minutes:').click();
await page.getByLabel('Workout Duration in Minutes:').fill('60');
await page.getByLabel('Workout Duration in Minutes:').press('Tab');
await page.getByLabel('Workout Date').fill('2024-07-07');
await page.getByLabel('Workout Start Time').click();
await page.getByRole('combobox').first().selectOption('{"id":5,"name":"Shai Rubinstein","email":"shai@posit.co.il","phone":"0528572942","created_at":"2024-06-30T21:49:05.649+03:00","updated_at":"2024-06-30T21:49:05.649+03:00"}');
await page.getByLabel('Trainees:').selectOption('{"id":17,"name":"Dana Yatzkan","email":"yatzkan123@gmail.com","phone":"0542717700","created_at":"2024-07-03T21:10:23.130+03:00","updated_at":"2024-07-03T21:33:28.219+03:00","last_workout_date":"2024-07-10"}');
await page.getByRole('button', { name: 'Submit' }).click();
await page.getByLabel('Workout Start Time').click();
await page.getByLabel('Workout Start Time').click();
await page.getByLabel('Workout Start Time').fill('15:00');
await page.getByRole('button', { name: 'Submit' }).click();
await page.getByRole('button', { name: 'View Workouts' }).click();

});

test('editWorkout', async ({ page }) => {
  await page.goto('http://localhost:5173');
  

});