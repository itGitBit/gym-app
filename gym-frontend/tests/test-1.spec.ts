import { test, expect } from '@playwright/test';

test.beforeAll('login', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await page.getByRole('button', { name: 'Trainer', exact: true }).click();
  await page.getByRole('combobox').selectOption('{"id":2,"name":"Steve Vaknin","email":"steve@posit.co.il","phone":"052528452","created_at":"2024-06-30T13:00:43.190+03:00","updated_at":"2024-06-30T13:00:43.190+03:00"}');
  await page.getByRole('button', { name: 'Select' }).click();
});

test('createWorkout', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await page.getByRole('button', { name: 'Add Workout' }).click();
  await page.getByLabel('Workout Duration in Minutes:').fill('60');
  const date = '2024-07-20'
  await page.getByLabel('Workout Date').fill(date);
  await page.getByLabel('Workout Date').click();
  await page.getByLabel('Workout Start Time').click();
  await page.getByRole('combobox').first().selectOption('{"id":1,"name":"Itai Bar","email":"itai@posit.co.il","phone":"0545479666","created_at":"2024-06-30T12:59:59.397+03:00","updated_at":"2024-07-01T16:47:51.673+03:00"}');
  await page.getByLabel('Workout Start Time').fill('17:00');
  await page.getByLabel('Trainees:').selectOption('{"id":3,"name":"Orit Mazuz","email":"orit@posit.co.il","phone":"0525747552","created_at":"2024-06-30T13:09:10.125+03:00","updated_at":"2024-07-04T16:43:52.520+03:00","last_workout_date":"2024-07-15"}');
  await page.getByLabel('Trainees:').selectOption('{"id":4,"name":"Dana Yatzkan","email":"yatzkan123@gmail.co.il","phone":"0542717700","created_at":"2024-06-30T13:09:10.132+03:00","updated_at":"2024-07-04T16:43:52.535+03:00","last_workout_date":"2024-07-15"}');
  await page.getByLabel('Trainees:').selectOption('{"id":5,"name":"Tatiana Noijovich","email":"tatiana@posit.co.il","phone":"0549509826","created_at":"2024-06-30T13:09:10.139+03:00","updated_at":"2024-07-04T16:43:52.552+03:00","last_workout_date":"2024-07-15"}');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: 'View Trainees' }).click();
  expect(await page.isVisible('text=Orit Mazuz')).toBeTruthy();
  expect(await page.isVisible('text=2024-07-20')).toBeTruthy();
});

test('editWorkout', async ({ page }) => {


});