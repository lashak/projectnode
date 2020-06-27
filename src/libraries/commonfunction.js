'use strict'
const { raw } = require('objection');

module.exports.commonSelectQuery = (Model, ModelAlias, allData) => {
  let query;
  return new Promise((resolve, reject) => {
    try {
      //model
      query = Model.query();
      //alias
      if (ModelAlias) query = query.alias(ModelAlias);
      //select list
      query = query.select(raw(allData.selectList));
      //joins
      if (allData.joins) {
        for (const row of allData.joins) {
          switch (row.type) {
            case 'left': query = query.leftJoin(`${row.tableName} as ${row.alias}`, raw(row.onConditions));
              break;
            case 'right': query = query.rightJoin(`${row.tableName} as ${row.alias}`, raw(row.onConditions));
              break;
            case 'inner': query = query.innerJoin(`${row.tableName} as ${row.alias}`, raw(row.onConditions));
              break;
            case 'full': query = query.fullOuterJoin(`${row.tableName} as ${row.alias}`, raw(row.onConditions));
              break;
            case 'relation': query = query.joinRelation(`${row.tableName} as ${row.alias}`);
              break;
            case 'inner-relation': query = query.innerJoinRelation(`${row.tableName}`);
              break;
            case 'left-relation': query = query.leftJoinRelation(`${row.tableName}`);
              break;
            case 'right-relation': query = query.rightJoinRelation(`${row.tableName}`);
              break;
            default: break;
          }
        }
      }
      //where
      if (allData.where) query = query.whereRaw(allData.where);
      //having
      if (allData.having) query = query.havingRaw(allData.having);
      //group by
      if (allData.groupBy) query = query.groupByRaw(allData.groupBy);
      //order by
      if (allData.orderBy) query = query.orderByRaw(allData.orderBy);
      //limit
      if (allData.limit) query = query.limit(allData.limit);
      resolve(query)
    } catch (error) {
      reject(error)
    }
  })
  
}
module.exports.insert = (Model, allData) => {
  let query;
  return new Promise((resolve, reject) => {
    try {
      //model
      query = Model.query();
      //insert
       query = query.insert(allData);
      resolve(query)
    } catch (error) {
      reject(error)
    }
  })
  
}
