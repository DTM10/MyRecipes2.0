import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { RecipeItem } from '../Models/RecipeModel';

const initialState: RecipeItem = {
  id: 3008,
  title: 'Homemade Chocolate Croissants (Pain Au Chocolat)',
  imgURL:
    'https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/113581.jpg',
  description:
    "Few things express affection like croissants, especially homemade chocolate croissants (pain au chocolat)! Start your loved one's day on a decadent note with these easy homemade chocolate croissants. The key to making amazing croissants lies in the meticulous process of folding butter into the dough and multiple turns; in other words, patience and focus. The preparation may seem long, but we've broken it into short, easy-to-follow steps to ensure your success. This heavenly pastry boasts a buttery, flaky texture and a gooey filling of rich chocolate, evoking the ambiance of a quaint French bakery right in your kitchen. Seriously, what could be better than that?",
  instructions: [
    'In a large bowl, mix the flour, water, milk, sugar, salt, yeast, and butter.',
    'Once the dough starts to clump, turn it out onto a clean counter.',
    'Lightly knead the dough and form it into a ball, making sure not to over-knead it.',
    'Cover the dough with plastic wrap and refrigerate for one hour.',
    'Slice the cold butter in thirds and place it onto a sheet of parchment paper..',
    'Place another piece of parchment on top of the butter, and beat it with a rolling pin.',
    'Keeping the parchment paper on the butter, use a rolling pin to roll the butter into a 7-inch (18 cm) square, ½-inch (1 cm) thick. If necessary, use a knife to trim the edges and place the trimmings back on top of the butter and continue to roll into a square.',
    'Transfer the butter layer to the refrigerator.',
    'To roll out the dough, lightly flour the counter. Place the dough on the counter, and push the rolling pin once vertically into the dough and once horizontally to form four quadrants.',
    'Roll out each corner and form a 10-inch (25 cm) square.',
    'Place the butter layer on top of the dough and fold the sides of the dough over the butter, enclosing it completely.',
    'Roll the dough with a rolling pin to seal the seams, making sure to lengthen the dough, rather than widening it.',
    'Transfer the dough to a baking sheet and cover with plastic wrap. Refrigerate for 1 hour.',
    'Roll out the dough on a floured surface until it’s 8x24 inches (20x61 cm).',
    'Fold the top half down to the middle, and brush off any excess flour.',
    'Fold the bottom half over the top and turn the dough clockwise to the left. This completes the first turn.',
    'Cover and refrigerate for one hour.',
    'Roll out the dough again two more times, completing three turns in total and refrigerating for 1 hour in between each turn. If at anytime the dough or butter begins to soften, stop and transfer back to the fridge.',
    'After the final turn, cover the dough with plastic wrap and refrigerate overnight.',
    'To form the croissants, cut the dough in half. Place one half in the refrigerator.',
    'Flour the surface and roll out the dough into a long narrow strip, about 8x40 inches (20x101 cm).',
    'With a knife, trim the edges of the dough.',
    'Cut the dough into 4 rectangles.',
    'Place the chocolate on the edge of the dough and roll tightly enclosing it in the dough.',
    'Place the croissants on a baking sheet, seam side down.',
    'Repeat with the other half of the dough.',
    'Brush the croissants with the beaten egg. Save the rest of the egg wash in the fridge for later.',
    'Place the croissants in a warm place to rise for 1-2 hours.',
    'Preheat oven to 400°F (200°C).',
    'Once the croissants have proofed, brush them with one more layer of egg wash.',
    'Bake for 15 minutes or until golden brown and cooked through. Serve warm.',
    'Enjoy!',
  ],
  credits: ['Alix Traeger'],
  ingredients: [
    '4 cups flour',
    '½ cup water',
    '½ cup milk',
    '¼ cup sugar',
    '2 teaspoons salt',
    '1 packet instant yeast',
    '3 tablespoons unsalted butter, softened',
    '1¼ cup cold unsalted butter, cut into ½-inch thick slices',
    '1 egg, beaten',
    '2 bars chocolate',
  ],
  videoURL: 'https://vid.tasty.co/output/61062/low_1510265818.m3u8',
};
// const initialState: RecipeItem = {
//   id: 0,
//   title: '',
//   imgURL: '',
//   description: '',
//   instructions: [''],
//   credits: [''],
//   ingredients: [''],
//   videoURL: '',
// };

export const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    setShownRecipe: (_, action: PayloadAction<RecipeItem>) => action.payload,
    resetShownRecipe: () => initialState,
  },
});

export const { setShownRecipe, resetShownRecipe } = recipeSlice.actions;

export const selectRecipe = (state: RootState) => state.recipe;

export default recipeSlice.reducer;
