const productsSeeder=()=>
{
    products=[]
    for(let i=0;i<200;i++)
    {
        products.push(
            {
                name:"Product "+i,
                description:"Product "+i+" description",
                stock:parseInt(Math.random()*200),
                price:parseFloat(Math.random()*1000),
                image:null
            })
    }
    return products;
}
module.exports=productsSeeder;