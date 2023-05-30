/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.alterTable("games", (table) => {
        table.string("imageUrl")
        table.string("stores")
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.table("games", (table) => {
        table.dropColumn("imageUrl")
        table.dropColumn("stores")
    })
}
