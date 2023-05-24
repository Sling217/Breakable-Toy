/* eslint-disable no-console */
import { connection } from "../boot.js"
import UsersSeeder from "./Seeders/UsersSeeder.js"
import GamesSeeder from "./Seeders/GamesSeeder.js"
import RawgApiGamesSeeder from "./Seeders/RawgApiGamesSeeder.js"

class Seeder {
  static async seed() {
    console.log("Seeding Users...")
    await UsersSeeder.seed()

    console.log("Seeding Games...")
    await RawgApiGamesSeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder