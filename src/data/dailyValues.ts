
export interface DailyValue {
  amount: number;
  unit: string;
}

export const dailyValues: Record<string, DailyValue> = {
  // Vitamins
  'Vitamin A': { amount: 900, unit: 'mcg' },
  'Vitamin C': { amount: 90, unit: 'mg' },
  'Vitamin D': { amount: 20, unit: 'mcg' },
  'Vitamin E': { amount: 15, unit: 'mg' },
  'Vitamin K': { amount: 120, unit: 'mcg' },
  'Thiamin (B1)': { amount: 1.2, unit: 'mg' },
  'Riboflavin (B2)': { amount: 1.3, unit: 'mg' },
  'Niacin (B3)': { amount: 16, unit: 'mg' },
  'Vitamin B6': { amount: 1.7, unit: 'mg' },
  'Folate (B9)': { amount: 400, unit: 'mcg' },
  'Vitamin B12': { amount: 2.4, unit: 'mcg' },
  'Biotin (B7)': { amount: 30, unit: 'mcg' },
  'Pantothenic Acid (B5)': { amount: 5, unit: 'mg' },
  // Minerals
  'Calcium': { amount: 1300, unit: 'mg' },
  'Chromium': { amount: 35, unit: 'mcg' },
  'Chloride': { amount: 2300, unit: 'mg' },
  'Copper': { amount: 0.9, unit: 'mg' },
  'Iodine': { amount: 150, unit: 'mcg' },
  'Iron': { amount: 18, unit: 'mg' },
  'Magnesium': { amount: 420, unit: 'mg' },
  'Manganese': { amount: 2.3, unit: 'mg' },
  'Molybdenum': { amount: 45, unit: 'mcg' },
  'Phosphorus': { amount: 1250, unit: 'mg' },
  'Potassium': { amount: 4700, unit: 'mg' },
  'Selenium': { amount: 55, unit: 'mcg' },
  'Sodium': { amount: 2300, unit: 'mg' },
  'Zinc': { amount: 11, unit: 'mg' },
};
