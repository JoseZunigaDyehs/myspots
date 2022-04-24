import { Seeder } from "mongoose-data-seed";
import { User } from "../models";

const data = [
  {
    email: "user1@gmail.com",
    password: "123123",
    name: "JOse",
    username: "ASW",
    crews: [],
    points: [],
    role: [],
  },
  {
    email: "user2@gmail.com",
    password: "123123",
    name: "Celis",
    username: "Grimmy",
    crews: [],
    points: [],
    role: [],
  },
];

class UsersSeeder extends Seeder {
  async shouldRun() {
    return User.countDocuments()
      .exec()
      .then((count) => count === 0);
  }

  async run() {
    return User.create(data);
  }
}

export default UsersSeeder;
