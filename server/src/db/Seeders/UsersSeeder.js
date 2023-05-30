import { User } from "../../models/index.js";

class UsersSeeder {
    static async seed() {
        const users = [
            {
            email: "user@example.com",
            userName: "user 1",
            cryptedPassword:"$2b$10$rElT9igTP76q1gr.ADYgxeB4SjwlugeIo/D3GrtaD4M6WoQJqVVMW"
            },

            {
            email: "rudh@example.com",
            userName: "rudy",
            cryptedPassword: "$2b$10$h7UodJUUBwhgMWmMpi4oIuKzR2qz6gThaYP2URayapHF/.OuHti9S"
            },

            {
            email: "issa@example.com",
            userName: "issa",
            cryptedPassword: "$2b$10$wUwN1Dv0B8eEnwuc5oor4eO1gGAdx2NTccQZj/fZae.ruLSD7dJGq"
            },

            {
                email: "Scrith@example.com",
                userName: "Scrith",
                cryptedPassword: "$2b$10$SmLFclvCQE2fhE.dZYnK4eTGMh/AhYgo156ZbMl0AFPNzsg02fF5W",
                isAdmin: true
            }
    
        ]
        for (const user of users) {
            const inDB = await User.query().findOne({ userName: user.userName })
            if (!inDB) {
                await User.query().insert(user)
            }
        }
    }
}

export default UsersSeeder