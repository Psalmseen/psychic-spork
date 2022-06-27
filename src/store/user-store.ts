import { makeAutoObservable, values } from 'mobx';
import { UserServices } from '../services/user-services';
import { User } from '../assets/interfaces';
class UserStore {
  constructor() {
    makeAutoObservable(this);
  }
  users: User[] | [] = [];

  setUsers(users: User[]) {
    this.users = users;
  }

  fetchUser(id: number) {
    return UserServices.fetchUser(id);
  }

  editUser({ id, email, lastName, firstName, avatar }: User) {
    UserServices.editUser({ id, email, lastName, firstName, avatar });
  }

  addUserDescription(id: number, value: string) {
    UserServices.addUserDescription(id, value);
  }

  async fetchUsers() {
    const fetchedUser = await UserServices.fetchUsers();
    this.setUsers(fetchedUser);
  }
  getUser(uid: number) {
    return this.users.find(({ id }) => uid === id);
  }

  deleteUser(id: number) {
    UserServices.deleteUser(id);
    this.setUsers(this.users.filter((user) => id !== user.id));
  }

  createUser({
    email,
    firstName,
    lastName,
    avatar,
  }: {
    email: string;
    firstName: string;
    lastName: string;
    avatar: string;
  }) {
    UserServices.createUser({ email, firstName, lastName, avatar });
  }
}

export const userStore = new UserStore();
