const subCategoriesSeeder=()=>
{
    subCategories=[]
    for(let i=0;i<50;i++)
    {
        subCategories.push({name:"Sub Category "+i})
    }
    return subCategories;
}
module.exports=subCategoriesSeeder;