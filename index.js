const axios =require('axios');
const { JSDOM } = require('jsdom');

const getproductUrl=(productID)=>`https://www.amazon.in/gp/product/ajax/?asin=${productID}&m=&smid=&sourcecustomerorglistid=&sourcecustomerorglistitemid=&sr=8-8&pc=dp&experienceId=aodAjaxMain`


async function getPrices(productID){
    const productUrl=getproductUrl(productID);
    const {data : html}=await axios.get(productUrl,{
        headers:{
            Accept: 'text/html,*/*',
            Host: 'www.amazon.in',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
        },
    });
    const dom = new JSDOM(html); 
    const getElement=(selector)=>(dom.window.document.querySelector(selector));
    // console.log(dom.window.document.querySelector('.a-price .a-offscreen').textContent); 
    const pinnedElement=getElement('#pinned-de-id');
    const pinnedPrice=pinnedElement.querySelector('.a-price .a-offscreen').textContent;
    const title=getElement('#aod-asin-title-text').textContent.trim();
    const imagesrc=getElement('#aod-asin-image-id').getAttribute('src');
    const shippedFrom=pinnedElement.querySelector('#aod-offer-shipsFrom .a-col-right .a-size-small').textContent.trim();
    const soldBy=pinnedElement.querySelector('#aod-offer-soldBy .a-col-right .a-size-small').textContent.trim();
    // const pinned = {
    //     price:pinnedPrice,
    //     shipped_from:shippedFrom,
    //     sold_by:soldBy,
    // };
    const result={
        title:title,
        image:imagesrc,
        price:pinnedPrice,
        shipped_from:shippedFrom,
        sold_by:soldBy,
    };

    // document.getElementById("tit").textContent=result.title;
    // document.getElementById("soldby").textContent=result.sold_by;
    // document.getElementById("price").textContent=result.price;
    // document.getElementById("shipped").textContent=result.shipped_from;
    console.log(result);
}
getPrices('B08SB7KG83');