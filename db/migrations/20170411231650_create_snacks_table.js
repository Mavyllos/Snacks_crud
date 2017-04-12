exports.up = (knex) => {
 return knex.schema.createTable('snacks', table => {
   table.increments()
   table.string('name').notNullable()
   table.string('review_description').notNullable()
   table.integer('rating').notNullable()
   table.text('image_url').notNullable()
   table.timestamps(true, true)
 })
}

exports.down = (knex) => {
 return knex.schema.dropTable('snacks')
}
