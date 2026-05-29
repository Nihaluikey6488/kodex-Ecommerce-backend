import express from 'express'

let router =express.Router()
router.get('/',(req,res)=>{
    res.send("Connected get route")
}
)

export default router