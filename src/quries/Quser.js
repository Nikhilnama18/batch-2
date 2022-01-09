const CreateUser_Q = `Insert into 
public.users (id,u_name,u_email, u_password, houseno, street, city, state, zip) 
values ($1,$2,$3,$4,$5,$6,$7,$8,$9)
returning *`;

const FindUserById_Q = `Select * from 
public.users where id =$1`;

const GetAllUsers_Q = `select * from public.users`;

const UpdateUserById_Q = `update public.users 
set id =$1,
    u_name=$2,
    u_email=$3,
    u_password=$4,
    houseno=$5,
    street=$6,
    city=$7,
    state=$8,
    zip=$9
where id=$1
returning *`;

const DeleteUserById_Q = `delete  from 
 public.users 
    where id=$1
    returning *`;

module.exports = {
  CreateUser_Q,
  FindUserById_Q,
  GetAllUsers_Q,
  UpdateUserById_Q,
  DeleteUserById_Q,
};
