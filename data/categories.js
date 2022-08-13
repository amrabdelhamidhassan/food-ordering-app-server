const categoriesSeeder=()=>
{
    categories=[]
    for(let i=0;i<12;i++)
    {
        categories.push({name:"Category "+i})
    }
    return categories;
}
module.exports=categoriesSeeder;