const CreateUser_Q = `Insert into 
public.users (id,u_name,u_email, u_password) 
values ($1,$2,$3,$4)
returning *`;

const FindUserById_Q = `Select id from 
public.users where id =$1`;

module.exports = { CreateUser_Q, FindUserById_Q };
