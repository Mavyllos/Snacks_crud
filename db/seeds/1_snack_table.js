exports.seed = (knex) => {
   return knex('snacks').del()
     .then(() => {
       return knex('snacks').insert([
         {
           id: 1,
           name: 'Popcorn',
           review_description: 'Popcorn is crunchy',
           rating: 3,
           image_url: 'http://assets.simplyrecipes.com/wp-content/uploads/2007/08/perfect-popcorn-new-640-b.jpg'
         },
         {
           id: 2,
           name: 'Tortilla Chips',
           review_description: 'Tortilla chips are also crunchy',
           rating: 3,
           image_url: 'http://assets.simplyrecipes.com/wp-content/uploads/2013/05/homemade-tortilla-chips-horiz-a-800.jpg'
         },
         {
           id: 3,
           name: 'Gummy Bears',
           review_description: 'Gummy bears are not crunchy',
           rating: 3,
           image_url: 'http://cdn.arn.com.au/media/7281956/gummybears_728.jpg'
         }
       ])
     }).then(() => {
       return knex.raw(
         "SELECT setval('snacks_id_seq', (SELECT MAX(id) FROM snacks));"
       )
     })
 }
