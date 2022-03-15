// 
import request from '@/utils/request'; 
// 获取Spu数据列表的接口
// /admin/product/{page}/{limit} method：get data：page、limit、category3Id
export const reqSpuList = (page,limit,category3Id) => request({url:`/admin/product/${page}/${limit}`,method:'get',params:{category3Id}}); 

// 获取spu信息 
// /admin/product/getSpuById/{spuId} method：get data：spuId
export const reqSpu = (spuId) => request({url: `/admin/product/getSpuById/${spuId}`,method: 'get'});

// 获取品牌信息
// /admin/product/baseTrademark/getTrademarkList method：get
export const reqTradeMarkList = () => request({url: '/admin/product/baseTrademark/getTrademarkList',method:'get'});


// 获取Spu图片的接口
// /admin/product/spuImageList/{spuId} method：get
export const reqSpuImageList = (spuId) => request({url: `/admin/product/spuImageList/${spuId}`,method: 'get'})

// 获取平台全部销售属性---整个平台销售属性一共三个
// /admin/product/baseSaleAttrList method：get
export const reqBaseSaleAttrList = () => request({url: '/admin/product/baseSaleAttrList',method: 'get'})

// 修改spu||添加spu：对于修改或者添加，携带给服务器参数大致一样，唯一的区别是携带的参数是否携带id
export const reqAddOrUpdateSpu = (spuInfo) => {
    // 携带的参数带有id----修改spu
    if(spuInfo.id){
        return request({url:'/admin/product/updateSpuInfo',method: 'post',data:spuInfo  })
    }else{
        // 携带的参数不带id---添加spu
        return request({url:'/admin/product/saveSpuInfo',method: 'post',data:spuInfo})
    }

}


// 删除spu
// /admin/product/deleteSku/{skuId}
export const reqDeleteSpu = (skuId) => request({url:`/admin/product/deleteSku/${skuId}`,method:'delete'})

// 添加sku
// /admin/product/saveSkuInfo method:post
export const reqAddSku = (skuInfo) => request({url: '/admin/product/saveSkuInfo',method: 'post',data:skuInfo})

// 获取Spu图片的接口
// /admin/product/spuImageList/{spuId} method：get
export const reqSpuImageList1 = (spuId) => request({url: `/admin/product/spuImageList/${spuId}`,method: 'get'})

// 获取销售属性的数据
// /admin/product/spuSaleAttrList/{spuId} method:get
export const reqSpuSaleAttrList = (spuId) => request({url:`/admin/product/spuSaleAttrList/${spuId}`,method:'get'})

// 获取平台属性的数据
// /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}  method:get
export const reqAttrInfoList = (category1Id,category2Id,category3Id) => request({url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,method:'get'})

// 获取sku列表数据接口
// /admin/product/findBySpuId/{spuId} method：get
export const reqSkuList = (spuId) => request({url:`/admin/product/findBySpuId/${spuId}`,method: 'get'})









