const Product = require('../models/product')

const getAllProductStatic= async(req,res)=>{
  // throw new Error('this is testing error')
  const products = await Product.find({});
  res.status(200).json({products,dbHint : products.length})
}

const getAllProduct= async(req,res)=>{
  const {featured,company,name,sort,fields,numericFilters} = req.query;
  const QueryObject = {}
  if(featured){
    QueryObject.featured = featured ==='true'? true:false
  }
  if(name){
    QueryObject.name = {$regex:name,$options:'i'}
  }
  if(company){
    QueryObject.company = company;
  }
  // console.log(QueryObject);

  if(numericFilters){
    // could be like a dic in python.
    const operatorMap = {
      '>':'$gt',
      '>=':'$gte',
      '=' :'$eq',
      '<':'$lt',
      '>=':'$lte'
    }
    const regex = /\b(>|>=|=|<=|<)\b/g;
    
    let filters = numericFilters.replace(regex,(match)=>`-${operatorMap[match]}-`);
    
    const options = ['price','rating'];
    
    filters = filters.split(',').forEach(item=>{
      const [field, operator,value] = item.split('-');
      if(options.includes(field)){
        QueryObject[field] ={[operator]:+value}
      }
    })
    // console.log(filters)
  }
  let result = Product.find(QueryObject)
  if(sort){
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  }
  if(fields){
    const fieldsList = fields.split(',').join(' ');
    result = result.select(fieldsList)
  } 
  console.log(QueryObject);

  const limit = +req.query.limit  || 10
  const page = +req.query.page || 1
  const skip = (page-1) * limit;

  result = result.skip(skip).limit(limit);

  const products = await result
  res.status(200).json({products,nbHint:products.length});
}



module.exports = {
  getAllProduct,
  getAllProductStatic
}