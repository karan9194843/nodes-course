const request=require('request')

const forecast=(lat,long,callback)=>{
    const url='https://api.darksky.net/forecast/5f648ad66542f0f62938e2386ea36a22/'+lat+','+long+'?units=si'


request({url:url,json:true},(error,response)=>{
    if(error){

        callback('low level error ',undefined)
    }
    else{

        callback(undefined,{
            temperature:response.body.currently.temperature,
            precipate:response.body.currently.precipProbability

        })



    }
})




}
module.exports=forecast