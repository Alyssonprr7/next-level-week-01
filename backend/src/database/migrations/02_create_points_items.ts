import Knex from 'knex' // Estou importando o tipo knex

export async function up(knex: Knex){
	//CRIAR A TABELA
	return knex.schema.createTable("point_items", table=>{
		table.increments('id').primary();
		
		table.integer("point_id")
		.notNullable()
		.references("id")
		.inTable("points"); //criando chave estrangeira do id na tabela points


		table.integer("item_id")
		.notNullable()
		.references("id")
		.inTable("items");
	});

}

export async function down(knex: Knex){
	//VOLTAR ATRAS (DELETAR TABELA)
	return knex.schema.dropTable("point_items")
}