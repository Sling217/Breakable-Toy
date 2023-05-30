/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.alterTable("reviews", (table) => {
        table.dropForeign("gameId")
        table.foreign("gameId").references("games.id").onDelete("CASCADE")
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.alterTable("reviews", (table) => {
        table.dropForeign("gameId")
        table.foreign("gameId").references("games.id").onDelete("NO ACTION")
    })
}
