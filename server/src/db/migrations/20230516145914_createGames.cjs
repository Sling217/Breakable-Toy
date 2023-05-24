/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable("games", (table) => {
        table.bigIncrements("id")

        table.string("name").notNullable()
        table.text("description").notNullable()
        table.string("genres").notNullable()
        table.integer("prices")
        table.string("platforms").notNullable()

        table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
        table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.dropTableIfExists("games")
}