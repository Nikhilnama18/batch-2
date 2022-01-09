const CreateFood_Q = `Insert into 
public.food_items (foodId, foodName, foodCost,foodType) 
values ($1,$2,$3,$4) 
returning *`;

const FindFoodById_Q = `select * from 
public.food_items where foodId= $1`;

module.exports = { CreateFood_Q, FindFoodById_Q };
