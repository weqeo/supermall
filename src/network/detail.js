import{request} from "./request"

export function getDetailData(iid){
    return request({
        url: '/detail',
        params:{
            iid
        }
    })
}
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.oldPrice = itemInfo.oldPrice;
    this.lowNowPrice = itemInfo.lowNowPrice;
    this.price = itemInfo.price;
    this.discountBgColor = itemInfo.discountBgColor;
    this.discountDesc = itemInfo.discountDesc;

    this.columns = columns;

    this.services = services;
  }
}
