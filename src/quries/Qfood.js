const CreateFood_Q = `Insert into 
public.food_items (foodId, foodName, foodCost,foodType) 
values ($1,$2,$3,$4) 
returning *`;

const FindFoodById_Q = `select * from 
public.food_items where foodId= $1`;

const FindFoodById_FID_Q = `select * from 
public.food_items where id=$1 and foodId= $2 `;

const UpdateFoodById_Q = `update public.food_items 
set foodName= $3,
    foodCost=$4,
    foodType=$5
where id=$1 and foodId=$2 
returning *
`;

const GetALLFoodItems_Q = `select * from public.food_items`;

const DeleteFoodById_Q = `delete  from 
 public.food_items 
    where foodId=$1
    returning *`;

module.exports = {
  CreateFood_Q,
  FindFoodById_Q,
  UpdateFoodById_Q,
  FindFoodById_FID_Q,
  DeleteFoodById_Q,
  GetALLFoodItems_Q,
};
