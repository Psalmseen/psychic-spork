import axios from 'axios';
import { User } from '../assets/interfaces';
export class UserServices {
  static async fetchUsers() {
    try {
      const { data } = await axios.get('https:northwind.now.sh/api/categories');
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  static async fetchUser(id: number) {
    try {
      const { data } = await axios.get(
        `https:northwind.now.sh/api/categories/${id}`
      );
      return data;
    } catch (error) {}
  }
  static async editUser({ id, email, firstName, lastName, avatar }: User) {
    await axios.put(`https:northwind.now.sh/api/categories/${id}`, {
      email,
      firstName,
      lastName,
      avatar,
    });
  }

  static async createUser({
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
    try {
      await axios.post('https://northwind.now.sh/api/categories', {
        email,
        firstName,
        lastName,
        avatar,
      });
    } catch (error) {
      console.log(error);
    }
  }
  static async deleteUser(id: number) {
    try {
      await axios.delete(`https://northwind.now.sh/api/categories/${id}`);
    } catch (error) {
      console.log(error);
    }
  }
  static async addUserDescription(id: number, value: string) {
    try {
      await axios.patch(`https://northwind.now.sh/api/categories/${id}`, {
        description: value,
      });
    } catch (error) {}
  }
}
