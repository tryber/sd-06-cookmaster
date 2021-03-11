import { create } from './api/models/users';

const adminUser = {
  name: 'admin',
  email: 'root@email.com',
  password: 'admin',
  role: 'admin',
};

export const generateAdmin = () => {
  create(adminUser)
    .then((r) => console.log({ user: r }))
    .catch((error) => console.log({ error }));
}
