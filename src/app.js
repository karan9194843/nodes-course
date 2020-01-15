const express=require('express')
const path=require('path')
const hbs=require('hbs')
const request=require('request')

const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

console.log(__dirname)
//console.log(__filename)
console.log(path.join(__dirname,'../public'))
const app=express()

const publicdirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,"../templates/views")
const partialsPath=path.join(__dirname,"../templates/partials")
hbs.registerPartials(partialsPath)

app.set('view engine','hbs')
app.set('views',viewsPath)
app.use(express.static(publicdirectoryPath))
//                                                              
app.get('',(req,res)=>{

    res.render('index',{
        title:'weather app',
        name:'karan gupta'
    })
})

app.get('/about',(req,res)=>{
res.render('about',{
    title:'about me',
    name:'karann'




})
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help page',
        example:'here you can find the help page',
        name:'karan gupta'

    })
})



app.get('/help',(req,res)=>{

    res.send([{
        name:'karan',
        age:27
    },
{
name1:'sommya',
age:56

}])
})

app.get('/about',(req,res)=>{
res.send('<h1>about</h1>')

})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        res.send({
            error:'please provide a valid address'
        })

    }
    else{
const serverAddress=req.query.address
        geocode(serverAddress,(error,data)=>{
            if(error){
                console.log(error)
            }
            
        
            forecast(data.latitude, data.longitude, (error, forecastData) => {
                if(error){
                    console.log(error)
                }
                console.log('location', data.location)
                console.log('data',forecastData)
                res.send({
                    forecast:forecastData,
                    location:data.location,
                    address:serverAddress
                    
                        })
              })
            
        
        }
        )

    
   
}
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
      return  res.send({
            error:'please provide a search term'

        })
    }

    console.log(req.query.search)
res.send({
    products:[]
})


})

app.get('/help/*',(req,res)=>{
//res.send('help article not found')
res.render('404',{
    name:'karan',
    title:'error pagre',
    errorMessage:'404 page in help '
})
})

//----->this should come last....bcos express starts looking for a match in order
app.get('*',(req,res)=>{
    res.render('404',{
        name:'karan',
        title:'error page',
        errorMessage:'404 pageee'

    })
    //res.send('my 404 page')
    //console.log('my 404 page')


})


//app.com
//app.com/help
//app.com/about




//this is mainly for starting/initiating the server
app.listen(3000,()=>{
    console.log('server is running')
})

