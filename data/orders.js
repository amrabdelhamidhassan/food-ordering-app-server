const ordersSeeder=(products,users)=>
{
    let orderstatus=['delivered','prepared','accepted'];
    let order;
    let orders=[]
    for(let i=0;i<100;i++)
    {
        order={
            status:orderstatus[parseInt(Math.random()*2)],
            totalPrice:Math.random()*1000,
            totalNumberOfItems:parseInt(Math.random()*100)+1,
            user:users[0].id
        }
        let productsarray=[]
        for(let i=0;i<=5 ;i++)
        {
            productsarray.push(
                {
                    numberofProductItems:parseInt(Math.random()*5),
                    product:products[parseInt(Math.random()*198)].id
                }
            )
        }
        orders.push(
            {
                ...order,
                products:productsarray
            }
        )
    }
    return orders;
}
module.exports=ordersSeeder;